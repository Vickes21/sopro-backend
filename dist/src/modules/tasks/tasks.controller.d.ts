import { TasksService } from './tasks.service';
import { TCreateTask } from './dto/create-task.dto';
import { TUpdateTask } from './dto/update-task.dto';
import { TTask } from 'src/db/schemas';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: TCreateTask): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    findAll(): Promise<TTask[]>;
    findOne(id: string): Promise<{
        id: number;
        user_id: number;
        goal_id: number;
        title: string;
        description: string;
        due_date: Date;
        priority: "high" | "medium" | "low";
        status: "pending" | "in_progress" | "completed" | "cancelled";
        last_status_at: Date;
        created_at: Date;
        updated_at: Date;
    }[]>;
    update(id: string, updateTaskDto: TUpdateTask): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    remove(id: string): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
}
