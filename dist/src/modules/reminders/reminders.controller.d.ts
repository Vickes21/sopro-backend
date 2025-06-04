import { RemindersService } from './reminders.service';
import { TCreateReminder } from 'src/modules/reminders/dto/create-reminder.dto';
import { TUpdateReminder } from 'src/modules/reminders/dto/update-reminder.dto';
export declare class RemindersController {
    private readonly remindersService;
    private readonly logger;
    constructor(remindersService: RemindersService);
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
    findOne(id: string): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: string;
        task_id: number;
        goal_id: number;
    }[]>;
    update(id: string, updateReminderDto: TUpdateReminder): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(id: string): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    handleReminders(): Promise<{
        sent: number;
    }>;
}
