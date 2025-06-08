import { z } from "zod/v4";
export declare const updateReminderSchema: z.ZodObject<{
    content: z.ZodOptional<z.ZodString>;
    schedule_time: z.ZodOptional<z.ZodDate>;
    frequency: z.ZodOptional<z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        once: "once";
    }>>;
    task_id: z.ZodOptional<z.ZodNumber>;
    goal_id: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type TUpdateReminder = z.infer<typeof updateReminderSchema>;
