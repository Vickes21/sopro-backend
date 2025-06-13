import { TCreateTask } from './dto/create-task.dto';
import { TUpdateTask } from './dto/update-task.dto';
import * as schema from 'src/db/schemas';
import { MySql2Database } from 'drizzle-orm/mysql2';
export declare class TasksService {
    private db;
    constructor(db: MySql2Database<typeof schema>);
    create(userId: number, createTaskDto: TCreateTask): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    findAll(userId: number): Promise<{
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
    findOne(userId: number, id: number): Promise<{
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
    update(userId: number, id: number, updateTaskDto: TUpdateTask): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(userId: number, id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
