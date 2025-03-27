"use client"

import { WorkFlow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import React from 'react'

function FlowEditor({workFlow}:{workFlow:WorkFlow}) {
    const[nodes,setNodes,onNodesChange] = useNodesState([])
    const[edges,setEdges,onEdgesChange] = useEdgesState([])
    
    return (
        <div className='w-full h-[calc(100vh-60px)]'> {/* Adjusted height to account for footer */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Controls position='top-left'/>
                <Background variant={BackgroundVariant.Dots} gap={15} size={3}/>
            </ReactFlow>
        </div>
    )
}

export default FlowEditor