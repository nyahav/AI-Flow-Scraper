"use client"

import { UpdateWorkflow } from '@/actions/workflows/updateWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function SaveBtn({workflowId}:{workflowId:string}) {
    const {toObject} = useReactFlow()
    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () => {
            toast.success("Workflow has been saved successfully", {id:"save-workflow"})
        },
        onError: (error) => {
            toast.error(`Error saving workflow: ${error.message || "Something went wrong"}`, {id:"save-workflow"})
        }
    })
    
    const handleSave = () => {
        if (!workflowId) {
            toast.error("Missing workflow ID", { id: "save-workflow" });
            return;
        }
    
        const workflowDefinition = JSON.stringify(toObject());
        console.log("Serialized Workflow:", workflowDefinition); // Debugging log
        toast.loading("Saving workflow...", { id: "save-workflow" });
    
        saveMutation.mutate({
            id: workflowId,
            definition: workflowDefinition,
        });
    };
    return (
        <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleSave}
            disabled={saveMutation.isPending}
        >
            <CheckIcon size={16} className="stroke-green-400" />
            {saveMutation.isPending ? "Saving..." : "Save"}
        </Button>
    )
}

export default SaveBtn