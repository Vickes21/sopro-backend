import z from "zod";
export declare const deleteGoal: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: number;
}, {
    id?: number;
}>, {
    id?: number;
}, {
    id?: number;
}, {
    message: string;
    goal_id: number;
}>;
