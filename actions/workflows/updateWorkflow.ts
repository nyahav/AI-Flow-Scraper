"use server"

import prisma from "@/lib/prisma"
import { WorkFlowStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";


export async function UpdateWorkflow({ id, definition }: { id: string; definition: string;  }) {
    const { userId } = auth()
    if (!userId) {
        throw new Error("unathenticated")
    }
    if (!id) {
        throw new Error("workflow id is required")
    }
    const workflow = await prisma.workFlow.findUnique({
        where: {
            id: id, 
            userId: userId 
        }
    })

    if (!workflow) throw new Error("workflow not found")

    if (workflow.status !== WorkFlowStatus.DRAFT) { 
        throw new Error("workflow is not a draft")
    }

    await prisma.workFlow.update({
        
        data:{
            definition,
            
        },
        where :{
            id: id,
            userId: userId
        },
    })
    revalidatePath("/workflows")
}