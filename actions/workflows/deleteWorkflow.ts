"use server"

import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function DeleteWorkflow(workflowId:string) {
    
    const{userId} = auth()
    if(!userId){
        throw new Error("unauthenticated")
    }

    const workflow = await prisma.workFlow.findUnique({
        where: {
            id: workflowId,
            userId
        }
    })

    if (!workflow) {
        throw new Error("Workflow not found")
    }

    await prisma.workFlow.delete({
        where: {
            id: workflowId,
            userId
        }
    })
    revalidatePath("/workflows");
    return { success: true, message: "Workflow deleted successfully" };
}