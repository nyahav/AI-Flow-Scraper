"use client"
import { TaskParams, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/appNode'

function NodeParamField({ param, nodeId }: { param: TaskParams, nodeId: string }) {

    const { updateNodeData, getNode } = useReactFlow()

    const node = getNode(nodeId) as AppNode
    console.log("@nodeId", nodeId); // Log the nodeId
    console.log("@node", node); // Log the node object
    const value = node?.data.inputs?.[param.name];
    console.log("@value", value); // Log the value

    const updateNodeParamValue = useCallback((newValue: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [param.name]: newValue,
            }
        });
    }, [nodeId, updateNodeData, node?.data.inputs, param.name]);

    switch (param.type) {
        case TaskParamType.STRING:
            return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} />
        default:
            return <div className='w-full'>
                <p className="text-xs text-muted-foreground ">
                    Not implemented
                </p>
            </div>
    }
}

export default NodeParamField