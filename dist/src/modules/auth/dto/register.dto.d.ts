import { z } from "zod/v4";
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    phone: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type TRegisterDto = z.infer<typeof registerSchema>;
