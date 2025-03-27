"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { WorkFlowStatus } from '@/types/workflow'
import { WorkFlow } from '@prisma/client'
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TooltipArrow } from '@radix-ui/react-tooltip'
import TooltipWrapper from './TooltipWrapper'

const statusColors: Partial<Record<WorkFlowStatus, string>> = {
    [WorkFlowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
    [WorkFlowStatus.PUBLISHED]: "bg-primary",
}

function WorkFlowCard({ workflow }: { workflow: WorkFlow }) {
    const isDraft = workflow.status === WorkFlowStatus.DRAFT
    return (
        <Card className='border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30'>
            <CardContent className='p-4 flex items-center justify-center'>
                <div className='flex items-center justify-end space-x-3'>
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        statusColors[workflow.status as WorkFlowStatus] ?? "bg-gray-400 text-gray-600"
                    )}>
                        {isDraft ? <FileTextIcon className='h-5 w-5' /> : <PlayIcon className='h-5 w-5 text-white' />}
                    </div>
                    <div>
                        <h3 className='text-base font-bold text-muted-foreground flex items-center'>
                            <Link href={`/workflows/editor/${workflow.id}`} className='flex items-center hover:underline' >
                                {workflow.name}
                            </Link>
                            {isDraft && (
                                <span className="ml-2 px-2 py-0 text-xs font-medium bg-yellow-100 rounded-full">
                                    Draft
                                </span>
                            )}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href={`/workflows/editor/${workflow.id}`} className={cn(buttonVariants({
                        variant: "outline",
                        size: "sm"
                    }),
                        "flex items-center gap-2"
                    )}
                    >
                        <ShuffleIcon size={16} />
                        Edit
                    </Link>
                    <WorkflowActions />
                </div>
            </CardContent>
        </Card>
    )
}

function WorkflowActions(){
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"sm"}>
                <TooltipWrapper content={"More actions"}>
                <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18}/>
                </div>
                </TooltipWrapper>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
        
        <DropdownMenuSeparator/>
        <DropdownMenuItem className='text-destructive flex items-center gap-2'>
            <TrashIcon size={16} />
            Delete
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default WorkFlowCard