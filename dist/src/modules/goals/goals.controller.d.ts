import { GoalsService } from './goals.service';
import { TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TGoal } from 'src/db/schemas';
import { TUpdateGoal } from 'src/modules/goals/dto/update-goal.dto';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(userId: string, createGoalDto: TCreateGoal): Promise<{
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
    findAll(userId: string): Promise<TGoal[]>;
    findOne(userId: string, id: string): Promise<TGoal>;
    update(userId: string, id: string, updateGoalDto: TUpdateGoal): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(userId: string, id: string): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
