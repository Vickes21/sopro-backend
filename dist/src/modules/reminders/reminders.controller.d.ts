import { RemindersService } from './reminders.service';
import { TCreateReminder } from 'src/modules/reminders/dto/create-reminder.dto';
import { TUpdateReminder } from 'src/modules/reminders/dto/update-reminder.dto';
export declare class RemindersController {
    private readonly remindersService;
    private readonly logger;
    constructor(remindersService: RemindersService);
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
    findOne(id: string): Promise<{
        id: number;
        user_id: number;
        content: string;
        schedule_time: Date;
        frequency: "daily" | "weekly" | "monthly" | "once";
        task_id: number;
        goal_id: number;
    }[]>;
    update(id: string, updateReminderDto: TUpdateReminder): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    remove(id: string): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    handleReminders(): Promise<{
        sent: number;
    }>;
}
