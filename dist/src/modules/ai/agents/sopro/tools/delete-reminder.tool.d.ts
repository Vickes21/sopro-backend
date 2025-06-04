import z from "zod";
export declare const deleteReminder: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
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
    reminder_id: number;
}>;
