import { z } from "zod/v4";
export declare const metaWebhookBaseSchema: z.ZodObject<{
    object: z.ZodString;
    entry: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        time: z.ZodOptional<z.ZodNumber>;
        changes: z.ZodArray<z.ZodObject<{
            field: z.ZodString;
            value: z.ZodAny;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type TMetaWebhookBase = z.infer<typeof metaWebhookBaseSchema>;
export declare const metaWebhookVerificationSchema: z.ZodObject<{
    "hub.mode": z.ZodString;
    "hub.verify_token": z.ZodString;
    "hub.challenge": z.ZodString;
}, z.core.$strip>;
export type TMetaWebhookVerification = z.infer<typeof metaWebhookVerificationSchema>;
