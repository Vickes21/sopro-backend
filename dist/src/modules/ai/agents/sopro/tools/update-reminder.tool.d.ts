import z from "zod";
export declare const updateReminder: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    id: z.ZodNumber;
    content: z.ZodOptional<z.ZodString>;
    schedule_time: z.ZodOptional<z.ZodString>;
    frequency: z.ZodOptional<z.ZodEnum<["once", "daily", "weekly", "monthly"]>>;
    task_id: z.ZodOptional<z.ZodNumber>;
    goal_id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    goal_id?: number;
    id?: number;
    content?: string;
    schedule_time?: string;
    frequency?: "daily" | "weekly" | "monthly" | "once";
    task_id?: number;
}, {
    goal_id?: number;
    id?: number;
    content?: string;
    schedule_time?: string;
    frequency?: "daily" | "weekly" | "monthly" | "once";
    task_id?: number;
}>, {
    goal_id?: number;
    id?: number;
    content?: string;
    schedule_time?: string;
    frequency?: "daily" | "weekly" | "monthly" | "once";
    task_id?: number;
}, {
    goal_id?: number;
    id?: number;
    content?: string;
    schedule_time?: string;
    frequency?: "daily" | "weekly" | "monthly" | "once";
    task_id?: number;
}, {
    message: string;
    reminder_id: number;
}>;
