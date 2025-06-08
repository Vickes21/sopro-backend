import z from "zod";
export declare const deleteTask: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
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
    task_id: number;
}>;
