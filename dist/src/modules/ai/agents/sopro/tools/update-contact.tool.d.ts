import z from "zod";
export declare const updateContact: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    password?: string;
}, {
    name?: string;
    email?: string;
    password?: string;
}>, {
    name?: string;
    email?: string;
    password?: string;
}, {
    name?: string;
    email?: string;
    password?: string;
}, {
    message: string;
    user_id: any;
}>;
