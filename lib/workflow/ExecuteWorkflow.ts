import "server-only"
import prisma from "@/lib/prisma"
import { init } from "next/dist/compiled/webpack/webpack"
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow"
import { waitFor } from "../helper/waitFor"
import { executionPhase } from "@prisma/client"
import { AppNode } from "@/types/appNode"
import { TaskRegistry } from "./task/registry"
import { ExecutorRegistry } from "./Executor/registry"
import { Environment, ExecutionEnvironment } from "@/types/executor"
import { create } from "domain"

export async function ExecuteWorkflow(executionId: string) {

    const execution = await prisma.workFlowExecution.findUnique({
        where: {
            id: executionId,
        },
        include: {workflow: true, phases: true}
    })
    if (!execution) {
        throw new Error("Execution not found")
    }

    //setup the execution environment
    const environment: Environment = { phases : {}}
    //initialize workflow execution
    await initWorkflowExecution(executionId, execution.workflow.id)
    //initialize phases status
    await initPhasesStatus(execution)

    let creditsConsume = 0
    let executioinFailed = false
    for(const phase of execution.phases) {
        const phaseExecution = await executeWorkflowPhase(phase,environment)
        if(!phaseExecution.success){ {
            executioinFailed = true
            break
        }
    }

    //finalize workflow execution
    await finalizeWorkflowExecution(executionId, execution.workflowId,executioinFailed,creditsConsume)
    //cleanup environment

   // revalidatePath("/workflows/runs")
}
}

async function initWorkflowExecution(executionId: string, workflowId: string) {
    await prisma.workFlowExecution.update({
        where: {
            id: executionId,
        },
        data: {
            status: WorkflowExecutionStatus.RUNNING,
            startedAt: new Date(),
            
        },
    })

    await prisma.workFlow.update({
        where: {
            id: workflowId,
        },
        data: {  
              lastRunAt: new Date(),
              lastRunStatus: WorkflowExecutionStatus.RUNNING, 
              lastRunId: executionId,
        }
    })

}

async function initPhasesStatus(execution: any) {
    await prisma.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase: any) => phase.id),
            },
        },
        data: {
            status: ExecutionPhaseStatus.PENDING,
        },
    })
}

async function finalizeWorkflowExecution(executionId: string, workflowId: string, executioinFailed: boolean, creditsConsume: number) {
  const finalStatus = executioinFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED
  await prisma.workFlowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsume,
    },
  })

  await prisma.workFlow.update({
    where: {
      id: workflowId,
      lastRunId: executionId,// ensure we are updating the correct workflow-prevent race condition
    },
    data: {
      lastRunStatus: finalStatus,
    },
  }).catch((error) => {
    //this means that we have triggered other runs for this workflow while an execution is running

  })
}

async function executeWorkflowPhase(phase: executionPhase,environment:Environment) {
    const startedAt = new Date()
    const node = JSON.parse(phase.node) as AppNode
    setupEnvironmentForPhase(node,environment)
    //update phase status 
    await prisma.executionPhase.update({
        where: {
            id: phase.id,
        },
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt,
        },
    })
    const creditsRequired = TaskRegistry[node.data.type].credits
    console.log("executing phase ${phase.name} with ${creditsRequired} credits")
    //TODO: decrement credits from user account

   
    const success = await executePhase(phase,node,environment)

    await finalizePhase(phase.id, success)
    return {success}
}


async function finalizePhase(phaseId: string, success: boolean) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED
    await prisma.executionPhase.update({
        where: {
            id: phaseId,
        },
        data: {
            status: finalStatus,
            completeAt: new Date(),
        },
    })
}

async function executePhase(phase: executionPhase, node: AppNode, environment:Environment): Promise<boolean> {

    const runFn = ExecutorRegistry[node.data.type]
    if(!runFn){
        return false
    }

    const executionEnvironment :ExecutionEnvironment<any>= createExecutionEnvironment(node,environment)
    return await runFn(executionEnvironment);
}
function setupEnvironmentForPhase(node: AppNode, environment: Environment) {

    environment.phases[node.id] = {
        inputs:{},
        outputs:{}
    }
    const inputs = TaskRegistry[node.data.type].inputs
    for(const input of inputs){
        const inputValue = node.data.inputs[input.name]
        if(inputValue){
            environment.phases[node.id].inputs[input.name] = inputValue
            continue
        }

        //Get input value from outpous in the 

    }
}

function createExecutionEnvironment(node: AppNode, environment: Environment) {
    return {
        getInput:(name: string) => environment.phases[node.id]?.inputs[name]   
    }
}

