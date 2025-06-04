import { GoalsService } from './goals.service';
import { TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TGoal } from 'src/db/schemas';
import { TUpdateGoal } from 'src/modules/goals/dto/update-goal.dto';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(createGoalDto: TCreateGoal): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    findAll(): Promise<TGoal[]>;
    findOne(id: string): Promise<TGoal>;
    update(id: string, updateGoalDto: TUpdateGoal): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(id: string): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
