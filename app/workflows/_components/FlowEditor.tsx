"use client"

import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import { WorkFlow } from '@prisma/client'
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import React, { useCallback, useEffect } from 'react'
import NodeComponent from './nodes/NodeComponent'
import { AppNode } from '@/types/appNode'
import DeletableEdge from './edges/DeletableEdge'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import App from 'next/app'

const nodeTypes = {
    FlowScrapeNode: NodeComponent,
}
const edgeTypes = {
    default: DeletableEdge,
}
const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }

function FlowEditor({ workFlow }: { workFlow: WorkFlow }) {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
    const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()

    useEffect(() => {
        try {
            const flow = JSON.parse(workFlow.definition)
            if (!flow) return;
            setNodes(flow.nodes || [])
            setEdges(flow.edges || [])
            if (!flow.viewport) return
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setViewport({ x, y, zoom })
        } catch (error) {

        }
    }, [workFlow.definition, setNodes, setEdges, setViewport])

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
    }, [])

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        const taskType = event.dataTransfer.getData("application/reactflow")
        if (!taskType || taskType === undefined) return

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        })

        const newNode = CreateFlowNode(taskType as TaskType, position)
        setNodes((nds) => nds.concat(newNode))
    }, [setNodes, screenToFlowPosition])

    const onConnect = useCallback((connection: Connection) => {
        console.log("@on connect", connection)
        setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
        if (!connection.targetHandle) return
        // remove input value if is present on connection
        const node = nodes.find((nd) => nd.id === connection.target)
        if (!node) return
        const nodeInputs = node.data.inputs
        updateNodeData(node.id, {
            inputs: {
                ...nodeInputs,
                [connection.targetHandle]: "",
            }
        })
    }, [setEdges, updateNodeData, nodes])

    const isValidConnection = useCallback((connection: Edge | Connection) => {
        //No self-connection allowed
        if (connection.source === connection.target) return false;
        //Same taskParams type connection
        const source = nodes.find((node) => node.id === connection.source)
        const target = nodes.find((node) => node.id === connection.target)
        if (!source || !target) return false;
        const sourceTask = TaskRegistry[source.data.type]
        const targetTask = TaskRegistry[target.data.type]
        const output = sourceTask.outputs.find((o) => o.name === connection.sourceHandle)
        const input = targetTask.inputs.find((o) => o.name === connection.targetHandle)
        if (input?.type !== output?.type) {
            console.log("invalid connection: type mismatch")
            return false;
        }
        const hasCycle = (node: AppNode, visited = new Set()) => {
            if (visited.has(node.id)) return false
            visited.add(node.id)

            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === connection.source) return true;
                if (hasCycle(outgoer, visited)) return true;
            }
        }
        const detectedCycle = hasCycle(target)
        return !detectedCycle
    }, [nodes,edges])
    return (
        <div className='w-full h-[calc(100vh-60px)]'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={fitViewOptions}
                snapToGrid={true}
                snapGrid={snapGrid}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onConnect={onConnect}
                isValidConnection={isValidConnection}
            >
                <Controls position='top-left' fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} gap={15} size={3} />
            </ReactFlow>
        </div>
    )
}

export default FlowEditor