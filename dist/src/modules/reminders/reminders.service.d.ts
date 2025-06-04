import { TCreateReminder } from './dto/create-reminder.dto';
import { TUpdateReminder } from './dto/update-reminder.dto';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from 'src/db/schemas';
import { AiService } from 'src/modules/ai/ai.service';
export declare class RemindersService {
    private db;
    private aiService;
    constructor(db: MySql2Database<typeof schema>, aiService: AiService);
    create(createReminderDto: TCreateReminder): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    findAll(): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: string;
        task_id: number;
        goal_id: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: string;
        task_id: number;
        goal_id: number;
    }[]>;
    update(id: number, updateReminderDto: TUpdateReminder): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    send(): Promise<{
        sent: number;
    }>;
    private shouldSendReminderToday;
}
