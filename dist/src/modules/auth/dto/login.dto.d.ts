import { z } from "zod/v4";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type TLoginDto = z.infer<typeof loginSchema>;
