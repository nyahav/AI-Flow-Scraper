"use client"

import  {CreateFlowNode}  from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import { WorkFlow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import React from 'react'
import NodeComponent from './nodes/NodeComponent'

const nodeTypes = {
    FlowScrapeNode : NodeComponent,
}
const snapGrid : [number,number] =[50,50]
const fitViewOptions ={padding :1}

function FlowEditor({workFlow}:{workFlow:WorkFlow}) {
    const[nodes,setNodes,onNodesChange] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER),
    ])
    const[edges,setEdges,onEdgesChange] = useEdgesState([])
    
    return (
        <div className='w-full h-[calc(100vh-60px)]'> {/* Adjusted height to account for footer */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={fitViewOptions}
                snapToGrid={true}
                snapGrid={snapGrid}
            >
                <Controls position='top-left' fitViewOptions={fitViewOptions}/>
                <Background variant={BackgroundVariant.Dots} gap={15} size={3}/>
            </ReactFlow>
        </div>
    )
}

export default FlowEditor