import z from "zod";
export declare const createGoal: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
    period: z.ZodString;
    priority: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}>, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}, {
    message: string;
    goal_id: number;
}>;
