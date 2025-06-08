import z from "zod";
export declare const listReminders: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    task_id: z.ZodOptional<z.ZodNumber>;
    goal_id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    goal_id?: number;
    task_id?: number;
}, {
    goal_id?: number;
    task_id?: number;
}>, {
    goal_id?: number;
    task_id?: number;
}, {
    goal_id?: number;
    task_id?: number;
}, {
    message: string;
    reminders: any;
}>;
