import { z } from "zod/v4";
export declare const updateTaskSchema: z.ZodObject<{
    goal_id: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    due_date: z.ZodOptional<z.ZodDate>;
    priority: z.ZodOptional<z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        completed: "completed";
        cancelled: "cancelled";
    }>>;
}, z.core.$strip>;
export type TUpdateTask = z.infer<typeof updateTaskSchema>;
