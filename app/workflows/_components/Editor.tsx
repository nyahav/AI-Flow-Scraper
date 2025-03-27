"use client"

import { WorkFlow } from '@prisma/client'
import React from 'react'
import {ReactFlowProvider} from "@xyflow/react"
import FlowEditor from './FlowEditor'

function Editor({workflow}:{workflow:WorkFlow}) {
  return (
    <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
            <div className="flex h-full overflow-auto">
                <FlowEditor workFlow={workflow}/>
            </div>
        </div>
    </ReactFlowProvider>
  )
}

export default Editor