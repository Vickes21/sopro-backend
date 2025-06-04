import z from "zod";
export declare const sendReminder: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content?: string;
}, {
    content?: string;
}>, {
    content?: string;
}, {
    content?: string;
}, {
    message: string;
}>;
