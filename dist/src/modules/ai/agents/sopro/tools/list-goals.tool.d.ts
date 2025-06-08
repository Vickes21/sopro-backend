import z from "zod";
export declare const listGoals: import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>, {}, {}, {
    message: string;
    goals: {
        id: number;
        title: string;
        description: string;
        category: "personal" | "professional";
        period: "daily" | "weekly" | "monthly" | "yearly";
        priority: "high" | "medium" | "low";
        status: "in_progress" | "completed" | "not_started" | "abandoned";
        start_date: string;
        end_date: string;
        created_at: Date;
        updated_at: Date;
        tasks: {
            id: number;
            title: string;
            description: string;
            due_date: Date;
            priority: "high" | "medium" | "low";
            status: "pending" | "in_progress" | "completed" | "cancelled";
            last_status_at: Date;
            created_at: Date;
            updated_at: Date;
        }[];
    }[];
}>;
