import { z } from "zod/v4";
export declare const createTaskSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    goal_id: z.ZodOptional<z.ZodNumber>;
    title: z.ZodString;
    due_date: z.ZodOptional<z.ZodDate>;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>;
    status: z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        completed: "completed";
        cancelled: "cancelled";
    }>;
}, z.core.$strip>;
export type TCreateTask = z.infer<typeof createTaskSchema>;
