"use client"

import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query";
import { Workflow } from "lucide-react"
import { X } from "lucide-react";
import { useState } from "react"
import { toast } from "sonner";

interface Props {
    open: boolean,
    setOpen: (open: boolean) => void,
    workflowname: string,
    workflowId: string,
}

function DeleteWorkflowDialog({ open, setOpen, workflowname, workflowId }: Props) {
    const [confirmText, setconfirmText] = useState("");
    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("workflow deleted successfully", { id: workflowId })
            setconfirmText("")
        },
        onError: () => {
            toast.error("workflow delete unsuccessfully", { id: workflowId })
        },
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <button
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    onClick={() => setOpen(false)}
                >
                    <X size={18} />
                </button>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this workflow,you will not be able to recover it.
                    </AlertDialogDescription>
                    <div className="flex flex-col py-4 gap-2">
                        <p>If you are sure,enter <b>{workflowname}</b> to confirm: </p>
                        <Input value={confirmText} onChange={(e) => setconfirmText(e.target.value)} />
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={confirmText !== workflowname || deleteMutation.isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => {
                            toast.loading("Deleting workflow...", { id: workflowId })
                            deleteMutation.mutate(workflowId)
                        }}
                    >
                        Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog