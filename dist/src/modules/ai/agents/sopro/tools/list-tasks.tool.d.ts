import z from "zod";
export declare const listTasks: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    goal_id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    goal_id?: number;
}, {
    goal_id?: number;
}>, {
    goal_id?: number;
}, {
    goal_id?: number;
}, {
    message: string;
    tasks: any;
}>;
