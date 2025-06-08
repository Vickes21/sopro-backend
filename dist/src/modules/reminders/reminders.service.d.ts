import { TCreateReminder } from './dto/create-reminder.dto';
import { TUpdateReminder } from './dto/update-reminder.dto';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/db/schemas';
import { AiService } from 'src/modules/ai/ai.service';
export declare class RemindersService {
    private db;
    private aiService;
    constructor(db: NeonHttpDatabase<typeof schema>, aiService: AiService);
    create(createReminderDto: TCreateReminder): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    findAll(): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: "daily" | "weekly" | "monthly" | "once";
        task_id: number;
        goal_id: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: "daily" | "weekly" | "monthly" | "once";
        task_id: number;
        goal_id: number;
    }[]>;
    update(id: number, updateReminderDto: TUpdateReminder): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    remove(id: number): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    send(): Promise<{
        sent: number;
    }>;
    private shouldSendReminderToday;
}
