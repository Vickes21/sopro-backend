import { GoalsService } from './goals.service';
import { TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TGoal } from 'src/db/schemas';
import { TUpdateGoal } from 'src/modules/goals/dto/update-goal.dto';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(createGoalDto: TCreateGoal): Promise<{
        user_id: number;
        title: string;
        description: string;
        priority: "high" | "medium" | "low";
        status: "in_progress" | "completed" | "not_started" | "abandoned";
        id: number;
        created_at: Date;
        updated_at: Date;
        period: "daily" | "weekly" | "monthly" | "yearly";
        category: "personal" | "professional";
        start_date: string;
        end_date: string;
    }>;
    findAll(): Promise<TGoal[]>;
    findOne(id: string): Promise<TGoal>;
    update(id: string, updateGoalDto: TUpdateGoal): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    remove(id: string): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
}
