import { TCreateTask } from './dto/create-task.dto';
import { TUpdateTask } from './dto/update-task.dto';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from 'src/db/schemas';
export declare class TasksService {
    private db;
    constructor(db: MySql2Database<typeof schema>);
    create(createTaskDto: TCreateTask): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
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
    update(id: number, updateTaskDto: TUpdateTask): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    remove(id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
