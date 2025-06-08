import { z } from "zod/v4";
export declare const updateGoalSchema: z.ZodObject<{
    user_id: z.ZodOptional<z.ZodNumber>;
    period: z.ZodOptional<z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        yearly: "yearly";
    }>>;
    category: z.ZodOptional<z.ZodEnum<{
        personal: "personal";
        professional: "professional";
    }>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        in_progress: "in_progress";
        completed: "completed";
        not_started: "not_started";
        abandoned: "abandoned";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>>;
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type TUpdateGoal = z.infer<typeof updateGoalSchema>;
