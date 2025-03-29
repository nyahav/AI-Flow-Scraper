"use client"

import  {CreateFlowNode}  from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import { WorkFlow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import React, { useCallback, useEffect } from 'react'
import NodeComponent from './nodes/NodeComponent'
import { AppNode } from '@/types/appNode'

const nodeTypes = {
    FlowScrapeNode : NodeComponent,
}
const snapGrid : [number,number] =[50,50]
const fitViewOptions ={padding :1}

function FlowEditor({workFlow}:{workFlow:WorkFlow}) {
    const[nodes,setNodes,onNodesChange] = useNodesState<AppNode>([])
    const[edges,setEdges,onEdgesChange] = useEdgesState([])
    const {setViewport, screenToFlowPosition} = useReactFlow()
    
    useEffect(() => {
        try {
            const flow= JSON.parse(workFlow.definition)
            if(!flow) return ;
            setNodes(flow.nodes || [])
            setEdges(flow.edges || [])
            if(!flow.viewport) return
            const {x =0, y=0,zoom= 1}=flow.viewport;
            setViewport({x,y,zoom})
        } catch (error) {
            
        }
    },[workFlow.definition,setNodes,setEdges,setViewport])

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
    },[])

    const onDrop = useCallback((event:React.DragEvent)=>{
        event.preventDefault()
        const taskType= event.dataTransfer.getData("application/reactflow")
        if(!taskType || taskType === undefined) return

        const position = screenToFlowPosition({
            x: event.clientX ,
            y: event.clientY ,
        })

        const newNode =CreateFlowNode(taskType as TaskType,position)
        setNodes((nds ) => nds.concat(newNode))
    },[])
    return (
        <div className='w-full h-[calc(100vh-60px)]'> 
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
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <Controls position='top-left' fitViewOptions={fitViewOptions}/>
                <Background variant={BackgroundVariant.Dots} gap={15} size={3}/>
            </ReactFlow>
        </div>
    )
}

export default FlowEditor