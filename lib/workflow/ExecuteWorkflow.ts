import "server-only"
import prisma from "@/lib/prisma"
import { init } from "next/dist/compiled/webpack/webpack"
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow"
import { waitFor } from "../helper/waitFor"
import { ExecutionPhase } from "@prisma/client"
import { AppNode } from "@/types/appNode"
import { TaskRegistry } from "./task/registry"
import { ExecutorRegistry } from "./Executor/registry"
import { Environment, ExecutionEnvironment } from "@/types/executor"
import { create } from "domain"
import { TaskParamType } from "@/types/task"
import { count, log, time } from "console"
import { get } from "http"
import { Browser, Page } from "puppeteer"
import { Edge } from "@xyflow/react"
import { LogColletor } from "@/types/log"
import { createLogCollector } from "../log"

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
    const edges =JSON.parse(execution.definition).edges as Edge[]
    //setup the execution environment
    const environment: Environment = { phases : {}}
    //initialize workflow execution
    await initWorkflowExecution(executionId, execution.workflow.id)
    //initialize phases status
    await initPhasesStatus(execution)
    

    let creditsConsume = 0
    let executioinFailed = false
    for(const phase of execution.phases) {
        const phaseExecution = await executeWorkflowPhase(phase,environment,edges,execution.userId)
        creditsConsume += phaseExecution.creditsConsumed
        if(!phaseExecution.success) {
            executioinFailed = true
            break
        }
    }

    //finalize workflow execution
    await finalizeWorkflowExecution(executionId, execution.workflowId,executioinFailed,creditsConsume)
    //cleanup environment
    await cleanupEnvironment(environment)
   // revalidatePath("/workflows/runs")
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

async function executeWorkflowPhase(phase: ExecutionPhase,environment:Environment,edges:Edge[],userId:string)  {
    const startedAt = new Date()
    const node = JSON.parse(phase.node) as AppNode
    const logColletor = createLogCollector()
    setupEnvironmentForPhase(node,environment,edges)
    //update phase status 
    await prisma.executionPhase.update({
        where: {
            id: phase.id,
        },
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt,
            inputs: JSON.stringify(environment.phases[node.id].inputs),
        },
    })
    const creditsRequired = TaskRegistry[node.data.type].credits


    let success = await decrementCredits(userId, creditsRequired, logColletor)
    const creditsConsumed = success ? creditsRequired : 0
    if (success) {
        //we can execute the phase if the credits are available
         success = await executePhase(phase, node, environment, logColletor)
    }
    const outputs = environment.phases[node.id].outputs
    await finalizePhase(phase.id, success, outputs, logColletor,creditsConsumed)
    return { success ,creditsConsumed}
}


async function finalizePhase(phaseId: string, success: boolean,outputs:any,logColletor:LogColletor,creditsConsumed:number) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED
    await prisma.executionPhase.update({
        where: {
            id: phaseId,
        },
        data: {
            status: finalStatus,
            completeAt: new Date(),
            outputs: JSON.stringify(outputs),
            creditsConsume: creditsConsumed,
            logs:{
                createMany:{
                    data: logColletor.getAll().map((log) => ({
                        message: log.message,
                        timestamp: log.timestamp,
                        logLevel: log.level,
                    }))
                    
                }
            },
        },
    })
}

async function executePhase(phase: ExecutionPhase, node: AppNode, environment:Environment,logColletor:LogColletor): Promise<boolean> {

    const runFn = ExecutorRegistry[node.data.type]
    if(!runFn){
        return false
    }

    const executionEnvironment :ExecutionEnvironment<any>= createExecutionEnvironment(node,environment,logColletor)
    return await runFn(executionEnvironment);
}
function setupEnvironmentForPhase(node: AppNode, environment: Environment, edges:Edge[]) {

    environment.phases[node.id] = {
        inputs:{},
        outputs:{}
    }
    const inputs = TaskRegistry[node.data.type].inputs
    for(const input of inputs){
        if(input.type === TaskParamType.BROWSER_INSTANCE) continue
        const inputValue = node.data.inputs[input.name]
        if(inputValue){
            environment.phases[node.id].inputs[input.name] = inputValue
            continue
        }

        //Get input value from outpous in the 
        const connectedEdge = edges.find((edge) => edge.target === node.id && edge.targetHandle === input.name)
        if(!connectedEdge){
            console.error('missing edge for input',input.name,"Node id",node.id)
            continue
        }
        let outputValue;
        if (connectedEdge.source && connectedEdge.sourceHandle) {
            outputValue = environment.phases[connectedEdge.source]?.outputs[connectedEdge.sourceHandle];
        } else {
            console.error('Invalid edge source or sourceHandle', connectedEdge);
        }
        environment.phases[node.id].inputs[input.name] = outputValue ?? "";
    }
}

function createExecutionEnvironment(node: AppNode, environment: Environment,LogColletor:LogColletor):ExecutionEnvironment<any> {
    return {
        getInput:(name: string) => environment.phases[node.id]?.inputs[name], 
        setOutput:(name: string, value: string) => environment.phases[node.id].outputs[name] = value,
        getBrowser: () => environment.browser,
        setBrowser: (browser:Browser) => {
            environment.browser = browser
        },
        getPage: () => environment.page,
        setPage: (page:Page) => {environment.page = page },
        log:LogColletor,
    }
}

async function cleanupEnvironment(environment: Environment) {
    if(environment.browser){
        await environment.browser.close().catch((error) => console.error("Error closing browser",error))
    }
    environment.browser = undefined
    environment.page = undefined
}

async function decrementCredits(userId: string, amount: number,logCollector:LogColletor) {
    
    try {
         await prisma.userBalance.update({
          where: {
            userId,
            credit: { gte: amount },
          },
          data: {
            credit: {
              decrement: amount,
            },
          },
        });
        return true
      } catch (error) {
        console.error("Error decrementing credits", error)
        logCollector.error("insufficient balance")
        return false
      }
}