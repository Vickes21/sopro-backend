import { RemindersService } from './reminders.service';
import { TCreateReminder } from 'src/modules/reminders/dto/create-reminder.dto';
import { TUpdateReminder } from 'src/modules/reminders/dto/update-reminder.dto';
export declare class RemindersController {
    private readonly remindersService;
    private readonly logger;
    constructor(remindersService: RemindersService);
    create(userId: string, createReminderDto: TCreateReminder): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    findAll(userId: string): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: "daily" | "weekly" | "monthly" | "once";
        task_id: number;
        goal_id: number;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        goal_id: number;
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: "daily" | "weekly" | "monthly" | "once";
        task_id: number;
    }>;
    update(userId: string, id: string, updateReminderDto: TUpdateReminder): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(userId: string, id: string): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    handleReminders(): Promise<{
        sent: number;
        skipped: number;
        errors: number;
    }>;
}
