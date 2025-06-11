import { GoalsService } from './goals.service';
import { TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TGoal } from 'src/db/schemas';
import { TUpdateGoal } from 'src/modules/goals/dto/update-goal.dto';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(userId: string, createGoalDto: TCreateGoal): Promise<{
        period: "daily" | "weekly" | "monthly" | "yearly";
        category: "personal" | "professional";
        title: string;
        description: string;
        status: "not_started" | "in_progress" | "completed" | "abandoned";
        priority: "high" | "medium" | "low";
        start_date: Date;
        end_date: Date;
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        tasks: {
            title: string;
            description: string;
            status: "in_progress" | "completed" | "pending" | "cancelled";
            priority: "high" | "medium" | "low";
            id: number;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            goal_id: number;
            due_date: Date;
            last_status_at: Date;
        }[];
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
            password: string;
            onboarding_completed: boolean;
            onboarding_step: number;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    findAll(userId: string): Promise<TGoal[]>;
    findOne(userId: string, id: string): Promise<TGoal>;
    update(userId: string, id: string, updateGoalDto: TUpdateGoal): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(userId: string, id: string): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
