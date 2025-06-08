import z from "zod";
export declare const updateTask: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    due_date: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
    status: z.ZodOptional<z.ZodEnum<["pending", "in_progress", "completed", "cancelled"]>>;
    goal_id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "pending" | "in_progress" | "completed" | "cancelled";
    id?: number;
}, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "pending" | "in_progress" | "completed" | "cancelled";
    id?: number;
}>, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "pending" | "in_progress" | "completed" | "cancelled";
    id?: number;
}, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "pending" | "in_progress" | "completed" | "cancelled";
    id?: number;
}, {
    message: string;
    task_id: number;
}>;
