import { z } from "zod";

export const createWorkflowSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be at most 50 characters long"),
    description: z.string().max(80, "Description must be at most 80 characters long").optional(),
});

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;
