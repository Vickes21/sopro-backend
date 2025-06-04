export declare const TOOLS: (import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    email: import("zod").ZodOptional<import("zod").ZodString>;
    password: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    name?: string;
    email?: string;
    password?: string;
}, {
    name?: string;
    email?: string;
    password?: string;
}>, {
    name?: string;
    email?: string;
    password?: string;
}, {
    name?: string;
    email?: string;
    password?: string;
}, {
    message: string;
    user_id: any;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    title: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    due_date: import("zod").ZodOptional<import("zod").ZodString>;
    priority: import("zod").ZodString;
    status: import("zod").ZodString;
    goal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    status?: string;
    title?: string;
    description?: string;
    due_date?: string;
    priority?: string;
    goal_id?: number;
}, {
    status?: string;
    title?: string;
    description?: string;
    due_date?: string;
    priority?: string;
    goal_id?: number;
}>, {
    status?: string;
    title?: string;
    description?: string;
    due_date?: string;
    priority?: string;
    goal_id?: number;
}, {
    status?: string;
    title?: string;
    description?: string;
    due_date?: string;
    priority?: string;
    goal_id?: number;
}, {
    message: string;
    task_id: number;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny, {
    id?: number;
}, {
    id?: number;
}>, {
    id?: number;
}, {
    id?: number;
}, {
    message: string;
    task_id: number;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    goal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    goal_id?: number;
}, {
    goal_id?: number;
}>, {
    goal_id?: number;
}, {
    goal_id?: number;
}, {
    message: string;
    tasks: any;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    title: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    category: import("zod").ZodString;
    period: import("zod").ZodString;
    priority: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}>, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}, {
    title?: string;
    description?: string;
    priority?: string;
    period?: string;
    category?: string;
}, {
    message: string;
    goal_id: number;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny, {
    id?: number;
}, {
    id?: number;
}>, {
    id?: number;
}, {
    id?: number;
}, {
    message: string;
    goal_id: number;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>, {}, {}, {
    message: string;
    goals: {
        id: number;
        title: string;
        description: string;
        category: "personal" | "professional";
        period: "daily" | "weekly" | "monthly" | "yearly";
        priority: "high" | "medium" | "low";
        status: "not_started" | "in_progress" | "completed" | "abandoned";
        start_date: string;
        end_date: string;
        created_at: string;
        updated_at: string;
        tasks: {
            id: number;
            title: string;
            description: string;
            due_date: string;
            priority: "high" | "medium" | "low";
            status: "in_progress" | "completed" | "pending" | "cancelled";
            last_status_at: string;
            created_at: string;
            updated_at: string;
        }[];
    }[];
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny, {
    id?: number;
}, {
    id?: number;
}>, {
    id?: number;
}, {
    id?: number;
}, {
    message: string;
    reminder_id: number;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    task_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    goal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    goal_id?: number;
    task_id?: number;
}, {
    goal_id?: number;
    task_id?: number;
}>, {
    goal_id?: number;
    task_id?: number;
}, {
    goal_id?: number;
    task_id?: number;
}, {
    message: string;
    reminders: any;
}> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    content: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    content?: string;
}, {
    content?: string;
}>, {
    content?: string;
}, {
    content?: string;
}, {
    message: string;
}>)[];
