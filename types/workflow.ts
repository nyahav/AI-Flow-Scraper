import { LucideProps } from "lucide-react"
import { TaskParams, TaskType } from "./task"
import { AppNode } from "./appNode"

export enum WorkFlowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED"
}

export type WorkFlowTask = {
    label: string
    icon: React.FC<LucideProps>
    type: TaskType
    isEntryPoint?: boolean
    inputs: TaskParams[]
    outputs: TaskParams[]
    credits: number
}

export type WorkflowExecutionPlanPhase = {
    phase: number
    nodes: AppNode[]
}
export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[]

export enum WorkflowExecutionStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export enum WorkflowExecutionTrigger {
    MANUAL = "MANUAL"
}
export enum ExecutionPhaseStatus {
    CREATED = "CREATED",
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

