"use client"

import { WorkFlow } from '@prisma/client'
import React from 'react'
import {ReactFlowProvider} from "@xyflow/react"
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'
import TaskMenu from './TaskMenu'

function Editor({workflow}:{workflow:WorkFlow}) {
  return (
    <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
            <Topbar title={"workflow editor"} subTitle={workflow.name}  workflowId={workflow.id}/>
            <section className="flex h-full overflow-auto">
                <TaskMenu />
                <FlowEditor workFlow={workflow}/>
            </section>
        </div>
    </ReactFlowProvider>
  )
}

export default Editor