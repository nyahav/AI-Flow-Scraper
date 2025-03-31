import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/executionPlan"
import { AppNode } from "@/types/appNode"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"
import useFlowValidation from "./useFlowValidition"
import { toast } from "sonner"


const useExecutionPlan = () => {

    const { toObject } = useReactFlow()
    const { setInvaildInputs: setInvaildInputs, clearErrors } = useFlowValidation()
    const handleError = useCallback((error: any) => {
        switch (error.type) {
            case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
                toast.error("No entry point found")
                break
            case FlowToExecutionPlanValidationError.INVALID_INPUTS:
                toast.error("Not all input values are set")
                setInvaildInputs(error.invalidElements)  
                break
            default:
                toast.error("Something went wrong")
                break
        }
    }, [setInvaildInputs])
    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject()
        const { executionPlan, error } = FlowToExecutionPlan(nodes as AppNode[], edges)

        if (error) {
            handleError(error)
            return null;
        }
        return executionPlan
    }, [toObject])
    return generateExecutionPlan
}

export default useExecutionPlan 