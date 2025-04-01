"use server"

import prisma from "@/lib/prisma"
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan"
import { WorkflowExecutionPlan } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"

export async function RunWorkflow(form: {
        workflowId:string,
        flowDefinition?: string,
    }){
        const{userId} = auth()
        if(!userId){
            throw new Error("unauthenticated")
        }
        const {workflowId,flowDefinition} = form
        if(!workflowId){
            throw new Error("workflowId is required")
        }
        const workflow= await prisma.workFlow.findUnique({
            where:{
                userId,
                id: workflowId,
            }
        })
        if(!workflow){
            throw new Error("workflow is not found")
        }
        let executionPlan: WorkflowExecutionPlan
        if(!flowDefinition){
            throw new Error("flow definition is not define")
        }
        const flow = JSON.parse(flowDefinition)
        const result = FlowToExecutionPlan(flow.nodes,flow.edges)
        if(result.error){
            throw new Error("flow definition is not valid")
        }
        if(result.executionPlan){
            throw new Error("no executioplan generated")
        }
        
        console.log("Execution plan",result.executionPlan)
    }