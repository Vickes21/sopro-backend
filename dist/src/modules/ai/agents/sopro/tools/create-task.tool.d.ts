import z from "zod";
export declare const createTask: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    due_date: z.ZodOptional<z.ZodString>;
    priority: z.ZodString;
    status: z.ZodString;
    goal_id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: string;
    status?: string;
}, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: string;
    status?: string;
}>, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: string;
    status?: string;
}, {
    goal_id?: number;
    title?: string;
    due_date?: string;
    description?: string;
    priority?: string;
    status?: string;
}, {
    message: string;
    task_id: number;
}>;
