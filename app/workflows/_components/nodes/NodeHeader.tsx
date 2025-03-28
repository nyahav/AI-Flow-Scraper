"use client"

import React from 'react'
import { TaskType } from '@/types/task'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { CoinsIcon, GripVerticalIcon, LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
function NodeHeader({taskType}:{taskType: TaskType}) {
    const task = TaskRegistry[taskType]

    const Icon = task.icon as LucideIcon
  return (
    <div className='flex items-center gap-2 p-2'>
        <Icon size={16}  />
        <div className="flex justify-between items-center w-full">
            <p className="text-xs font-bold uppercase text-muted-foreground">
                {task.label}
            </p>
            <div className="flex gap-1 items-center">
                {task.isEntryPoint && <Badge >Entry point</Badge>}
                <Badge className='gap-2 flex items-center text-xs'>
                    <CoinsIcon size={16} />
                    TODO
                </Badge>
                <Button variant={"ghost"} size={"icon"} className='drag-handle cursor-grab'>
                    <GripVerticalIcon size={20}/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default NodeHeader