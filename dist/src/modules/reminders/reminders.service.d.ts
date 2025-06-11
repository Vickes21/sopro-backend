import { TCreateReminder } from './dto/create-reminder.dto';
import { TUpdateReminder } from './dto/update-reminder.dto';
import * as schema from 'src/db/schemas';
import { AiService } from 'src/modules/ai/ai.service';
import { MySql2Database } from 'drizzle-orm/mysql2';
export declare class RemindersService {
    private db;
    private aiService;
    constructor(db: MySql2Database<typeof schema>, aiService: AiService);
    create(userId: number, createReminderDto: TCreateReminder): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    findAll(userId: number): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: "daily" | "weekly" | "monthly" | "once";
        task_id: number;
        goal_id: number;
    }[]>;
    findOne(userId: number, id: number): Promise<{
        goal_id: number;
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: "daily" | "weekly" | "monthly" | "once";
        task_id: number;
    }>;
    update(userId: number, id: number, updateReminderDto: TUpdateReminder): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(userId: number, id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    send(): Promise<{
        sent: number;
        skipped: number;
        errors: number;
    }>;
    private shouldSendReminderToday;
}
