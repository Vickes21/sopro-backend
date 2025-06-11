import { z } from "zod/v4";
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
}, z.core.$strip>;
export type TUpdateUser = z.infer<typeof updateUserSchema>;
