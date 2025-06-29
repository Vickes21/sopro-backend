import * as schema from 'src/db/schemas';
import { TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TUpdateGoal } from 'src/modules/goals/dto/update-goal.dto';
import { MySql2Database } from 'drizzle-orm/mysql2';
export declare class GoalsService {
    private db;
    constructor(db: MySql2Database<typeof schema>);
    create(userId: number, createGoalDto: TCreateGoal): Promise<{
        title: string;
        description: string;
        priority: "high" | "medium" | "low";
        status: "in_progress" | "completed" | "not_started" | "abandoned";
        id: number;
        user_id: number;
        created_at: Date;
        updated_at: Date;
        period: "daily" | "weekly" | "monthly" | "yearly";
        category: "personal" | "professional";
        start_date: Date;
        end_date: Date;
        user: {
            password: string;
            id: number;
            name: string;
            email: string;
            phone: string;
            onboarding_completed: boolean;
            onboarding_step: number;
            created_at: Date;
            updated_at: Date;
        };
        tasks: {
            goal_id: number;
            title: string;
            due_date: Date;
            description: string;
            priority: "high" | "medium" | "low";
            status: "pending" | "in_progress" | "completed" | "cancelled";
            id: number;
            user_id: number;
            created_at: Date;
            updated_at: Date;
            last_status_at: Date;
        }[];
    }>;
    findAll(userId: number): Promise<{
        title: string;
        description: string;
        priority: "high" | "medium" | "low";
        status: "in_progress" | "completed" | "not_started" | "abandoned";
        id: number;
        user_id: number;
        created_at: Date;
        updated_at: Date;
        period: "daily" | "weekly" | "monthly" | "yearly";
        category: "personal" | "professional";
        start_date: Date;
        end_date: Date;
        user: {
            password: string;
            id: number;
            name: string;
            email: string;
            phone: string;
            onboarding_completed: boolean;
            onboarding_step: number;
            created_at: Date;
            updated_at: Date;
        };
        tasks: {
            goal_id: number;
            title: string;
            due_date: Date;
            description: string;
            priority: "high" | "medium" | "low";
            status: "pending" | "in_progress" | "completed" | "cancelled";
            id: number;
            user_id: number;
            created_at: Date;
            updated_at: Date;
            last_status_at: Date;
        }[];
    }[]>;
    findOne(userId: number, id: number): Promise<{
        title: string;
        description: string;
        priority: "high" | "medium" | "low";
        status: "in_progress" | "completed" | "not_started" | "abandoned";
        id: number;
        user_id: number;
        created_at: Date;
        updated_at: Date;
        period: "daily" | "weekly" | "monthly" | "yearly";
        category: "personal" | "professional";
        start_date: Date;
        end_date: Date;
        user: {
            password: string;
            id: number;
            name: string;
            email: string;
            phone: string;
            onboarding_completed: boolean;
            onboarding_step: number;
            created_at: Date;
            updated_at: Date;
        };
        tasks: {
            goal_id: number;
            title: string;
            due_date: Date;
            description: string;
            priority: "high" | "medium" | "low";
            status: "pending" | "in_progress" | "completed" | "cancelled";
            id: number;
            user_id: number;
            created_at: Date;
            updated_at: Date;
            last_status_at: Date;
        }[];
    }>;
    update(userId: number, id: number, updateGoalDto: TUpdateGoal): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(userId: number, id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
