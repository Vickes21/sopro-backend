import { TasksService } from './tasks.service';
import { TCreateTask } from './dto/create-task.dto';
import { TUpdateTask } from './dto/update-task.dto';
import { TTask } from 'src/db/schemas';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(userId: string, createTaskDto: TCreateTask): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    findAll(userId: string): Promise<TTask[]>;
    findOne(userId: string, id: string): Promise<{
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
    }>;
    update(userId: string, id: string, updateTaskDto: TUpdateTask): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(userId: string, id: string): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
