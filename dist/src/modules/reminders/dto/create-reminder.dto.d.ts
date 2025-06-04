import { z } from "zod/v4";
export declare const createReminderSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    content: z.ZodString;
    schedule_time: z.ZodDate;
    frequency: z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        once: "once";
    }>;
    task_id: z.ZodOptional<z.ZodNumber>;
    goal_id: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type TCreateReminder = z.infer<typeof createReminderSchema>;
