import { z } from "zod/v4";
export declare const createGoalSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    period: z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        yearly: "yearly";
    }>;
    category: z.ZodEnum<{
        personal: "personal";
        professional: "professional";
    }>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        in_progress: "in_progress";
        completed: "completed";
        not_started: "not_started";
        abandoned: "abandoned";
    }>;
    priority: z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>;
    start_date: z.ZodDate;
    end_date: z.ZodDate;
}, z.core.$strip>;
export type TCreateGoal = z.infer<typeof createGoalSchema>;
