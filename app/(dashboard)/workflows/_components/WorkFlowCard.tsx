"use client"

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { WorkFlowStatus } from '@/types/workflow'
import { WorkFlow } from '@prisma/client'
import { FileTextIcon, PlayIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const statusColors: Partial<Record<WorkFlowStatus, string>> = {
    [WorkFlowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
    [WorkFlowStatus.PUBLISHED]: "bg-primary",
  }

function WorkFlowCard({workflow}:{workflow:WorkFlow}) {
    const isDraft = workflow.status === WorkFlowStatus.DRAFT
  return (
    <Card className='border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30'>
        <CardContent className='p-4 flex items-center justify-center'>
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                statusColors[workflow.status as WorkFlowStatus] ?? "bg-gray-400 text-gray-600" 
                )}>
                {isDraft ? <FileTextIcon className='h-5 w-5'/> : <PlayIcon className='h-5 w-5 text-white' />}
            </div>
            <div>
                <h3 className='text-base font-bold text-muted-foreground flex items-center'>
                    <Link href={`/workflows/editor/${workflow.id}`} className='flex items-center hover:underline' >
                    {workflow.name}
                    </Link>
                </h3>
            </div>
        </CardContent>
    </Card>
  )
}

export default WorkFlowCard