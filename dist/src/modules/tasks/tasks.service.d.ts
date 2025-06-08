import { TCreateTask } from './dto/create-task.dto';
import { TUpdateTask } from './dto/update-task.dto';
import * as schema from 'src/db/schemas';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
export declare class TasksService {
    private db;
    constructor(db: NeonHttpDatabase<typeof schema>);
    create(createTaskDto: TCreateTask): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    findAll(): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, updateTaskDto: TUpdateTask): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    remove(id: number): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
}
