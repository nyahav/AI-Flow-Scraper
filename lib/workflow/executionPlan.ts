import { AppNode } from "@/types/appNode";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";
import { error } from "console";

type FlowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlan
}

export function FlowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {

    const entryPoint = nodes.find(node => TaskRegistry[node.data.type].isEntryPoint)
    if (!entryPoint) {
        throw new Error("TODO:HANDLE THIS ERROR")
    }
    const planned = new Set<string>()
    const executionPlan: WorkflowExecutionPlan = [{
        phase: 1,
        nodes: [entryPoint],
    },
    ]
    for (let phase = 2; phase <= nodes.length || planned.size < nodes.length; phase++) {
        const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] }
        for (const currentNode of nodes) {
            if (planned.has(currentNode.id)) {
                //node already put in the execution plan
                continue
            }
            const invalidInputs = getInvalidInputs(currentNode, edges, planned);
            if (invalidInputs.length > 0) {
                const incomers = getIncomers(currentNode, nodes, edges)
                if (incomers.every(incomer => planned.has(incomer.id))) {
                    //meaning incomer have invalid input meaning workflow is invalid
                    console.error("Invalid inputs", currentNode.id, invalidInputs);
                    throw new Error("TODOD")
                } else {
                    continue
                }
            }
            nextPhase.nodes.push(currentNode)
            planned.add(currentNode.id)
        }
        executionPlan.push(nextPhase)
    }

    return { executionPlan }
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
    const invalidInputs = []
    const inputs = TaskRegistry[node.data.type].inputs
    for (const input of inputs) {
        const inputValue = node.data.inputs[input.name]
        const inputValueProvided = inputValue?.length > 0
        //this checks if the input is fine,and moves on
        if (inputValueProvided) { continue }
        //if a value is not provided by the user, then we need to check
        //if there is a output linked to the current input
        const incomingEdge = edges.filter((edge) => edge.target === node.id)
        const inputLinkedToOutput = incomingEdge.find(edge => edge.targetHandle === input.name)
        const requiredInputProvidedByVisitedOutput =
        input.required &&
        inputLinkedToOutput &&
        planned.has(inputLinkedToOutput.source)
        if(requiredInputProvidedByVisitedOutput){
            //the input is required and we have valid value for it provided by a task that is already planned
            continue
        }else if(!input.required){
            //if the input is not required but there is an output linked to it then we need to be sure that output  is already planned   
            if(!inputLinkedToOutput) continue;
            if(inputLinkedToOutput && planned.has(inputLinkedToOutput.source)){
                //the output is providing a value to the input,so its fine
                continue
            }
        }

        invalidInputs.push(input.name)
    }
    return invalidInputs
}