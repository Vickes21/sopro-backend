import z from "zod";
export declare const updateGoal: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["personal", "professional"]>>;
    period: z.ZodOptional<z.ZodEnum<["daily", "weekly", "monthly", "yearly"]>>;
    priority: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
    status: z.ZodOptional<z.ZodEnum<["not_started", "in_progress", "completed", "abandoned"]>>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "in_progress" | "completed" | "not_started" | "abandoned";
    id?: number;
    period?: "daily" | "weekly" | "monthly" | "yearly";
    category?: "personal" | "professional";
}, {
    title?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "in_progress" | "completed" | "not_started" | "abandoned";
    id?: number;
    period?: "daily" | "weekly" | "monthly" | "yearly";
    category?: "personal" | "professional";
}>, {
    title?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "in_progress" | "completed" | "not_started" | "abandoned";
    id?: number;
    period?: "daily" | "weekly" | "monthly" | "yearly";
    category?: "personal" | "professional";
}, {
    title?: string;
    description?: string;
    priority?: "high" | "medium" | "low";
    status?: "in_progress" | "completed" | "not_started" | "abandoned";
    id?: number;
    period?: "daily" | "weekly" | "monthly" | "yearly";
    category?: "personal" | "professional";
}, {
    message: string;
    goal_id: number;
}>;
