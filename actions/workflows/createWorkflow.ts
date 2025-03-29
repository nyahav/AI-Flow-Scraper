"use server"

import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflows";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkFlowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";


export async function CreateWorkFlow(form: createWorkflowSchemaType){
    const {success,data} = createWorkflowSchema.safeParse(form)
    if(!success){
        throw new Error("invalid form data")
    }
    const {userId} = auth()
    if(!userId){
        throw new Error("unathenticated")
    }
    const initalFlow : {nodes:AppNode[],edges: Edge[]} ={
        nodes: [],
        edges: [],
    }
    initalFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workFlow.create({
        data:{
            userId,
            status: WorkFlowStatus.DRAFT,
            definition:JSON.stringify(initalFlow),
            ...data
        }
    })
    
    if(!result){
        throw new Error("failed to create workflow")
    }
    redirect(`workflow/editor/${result.id}`)
}