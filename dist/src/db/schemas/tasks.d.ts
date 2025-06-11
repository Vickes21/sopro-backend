import { z } from "zod/v4";
export declare const tasks: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "tasks";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "tasks";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: true;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user_id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "user_id";
            tableName: "tasks";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        goal_id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "goal_id";
            tableName: "tasks";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        title: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "title";
            tableName: "tasks";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "description";
            tableName: "tasks";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        due_date: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "due_date";
            tableName: "tasks";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        priority: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "priority";
            tableName: "tasks";
            dataType: "string";
            columnType: "MySqlText";
            data: "high" | "medium" | "low";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["high", "medium", "low"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "status";
            tableName: "tasks";
            dataType: "string";
            columnType: "MySqlText";
            data: "pending" | "in_progress" | "completed" | "cancelled";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["pending", "in_progress", "completed", "cancelled"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        last_status_at: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "last_status_at";
            tableName: "tasks";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created_at: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "created_at";
            tableName: "tasks";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated_at: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "updated_at";
            tableName: "tasks";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "mysql";
}>;
export declare const tasksRelations: import("drizzle-orm").Relations<"tasks", {
    goal: import("drizzle-orm").One<"goals", false>;
    user: import("drizzle-orm").One<"users", true>;
}>;
export declare const taskSchema: z.ZodObject<{
    id: z.coerce.ZodCoercedNumber<unknown>;
    user_id: z.coerce.ZodCoercedNumber<unknown>;
    goal_id: z.ZodNullable<z.coerce.ZodCoercedNumber<unknown>>;
    title: z.coerce.ZodCoercedString<unknown>;
    description: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
    due_date: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
    priority: z.coerce.ZodCoercedString<unknown>;
    status: z.coerce.ZodCoercedString<unknown>;
    last_status_at: z.coerce.ZodCoercedDate<unknown>;
    created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
    updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
    readonly goal: z.ZodOptional<z.ZodObject<{
        id: z.coerce.ZodCoercedNumber<unknown>;
        user_id: z.coerce.ZodCoercedNumber<unknown>;
        period: z.coerce.ZodCoercedString<unknown>;
        category: z.coerce.ZodCoercedString<unknown>;
        title: z.coerce.ZodCoercedString<unknown>;
        description: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
        status: z.coerce.ZodCoercedString<unknown>;
        priority: z.coerce.ZodCoercedString<unknown>;
        start_date: z.coerce.ZodCoercedDate<unknown>;
        end_date: z.coerce.ZodCoercedDate<unknown>;
        created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
        updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
        readonly user: z.ZodOptional<z.ZodObject<{
            id: z.coerce.ZodCoercedNumber<unknown>;
            name: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
            email: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
            phone: z.coerce.ZodCoercedString<unknown>;
            password: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
            onboarding_completed: z.coerce.ZodCoercedBoolean<unknown>;
            onboarding_step: z.coerce.ZodCoercedNumber<unknown>;
            created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            readonly goals: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
                out: {};
                in: {};
            }>>>;
            readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
                out: {};
                in: {};
            }>>>;
            readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.coerce.ZodCoercedNumber<unknown>;
                user_id: z.coerce.ZodCoercedNumber<unknown>;
                content: z.coerce.ZodCoercedString<unknown>;
                schedule_time: z.coerce.ZodCoercedDate<unknown>;
                frequency: z.coerce.ZodCoercedString<unknown>;
                task_id: z.ZodNullable<z.coerce.ZodCoercedNumber<unknown>>;
                goal_id: z.ZodNullable<z.coerce.ZodCoercedNumber<unknown>>;
                readonly user: z.ZodOptional<z.ZodObject<any, {
                    out: {};
                    in: {};
                }>>;
                readonly task: z.ZodOptional<z.ZodObject<any, {
                    out: {};
                    in: {};
                }>>;
                readonly goal: z.ZodOptional<z.ZodObject<any, {
                    out: {};
                    in: {};
                }>>;
            }, {
                out: {};
                in: {};
            }>>>;
        }, {
            out: {};
            in: {};
        }>>;
        readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
            out: {};
            in: {};
        }>>>;
    }, {
        out: {};
        in: {};
    }>>;
    readonly user: z.ZodOptional<z.ZodObject<{
        id: z.coerce.ZodCoercedNumber<unknown>;
        name: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
        email: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
        phone: z.coerce.ZodCoercedString<unknown>;
        password: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
        onboarding_completed: z.coerce.ZodCoercedBoolean<unknown>;
        onboarding_step: z.coerce.ZodCoercedNumber<unknown>;
        created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
        updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
        readonly goals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.coerce.ZodCoercedNumber<unknown>;
            user_id: z.coerce.ZodCoercedNumber<unknown>;
            period: z.coerce.ZodCoercedString<unknown>;
            category: z.coerce.ZodCoercedString<unknown>;
            title: z.coerce.ZodCoercedString<unknown>;
            description: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
            status: z.coerce.ZodCoercedString<unknown>;
            priority: z.coerce.ZodCoercedString<unknown>;
            start_date: z.coerce.ZodCoercedDate<unknown>;
            end_date: z.coerce.ZodCoercedDate<unknown>;
            created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            readonly user: z.ZodOptional<z.ZodObject<any, {
                out: {};
                in: {};
            }>>;
            readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
                out: {};
                in: {};
            }>>>;
        }, {
            out: {};
            in: {};
        }>>>;
        readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
            out: {};
            in: {};
        }>>>;
        readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.coerce.ZodCoercedNumber<unknown>;
            user_id: z.coerce.ZodCoercedNumber<unknown>;
            content: z.coerce.ZodCoercedString<unknown>;
            schedule_time: z.coerce.ZodCoercedDate<unknown>;
            frequency: z.coerce.ZodCoercedString<unknown>;
            task_id: z.ZodNullable<z.coerce.ZodCoercedNumber<unknown>>;
            goal_id: z.ZodNullable<z.coerce.ZodCoercedNumber<unknown>>;
            readonly user: z.ZodOptional<z.ZodObject<any, {
                out: {};
                in: {};
            }>>;
            readonly task: z.ZodOptional<z.ZodObject<any, {
                out: {};
                in: {};
            }>>;
            readonly goal: z.ZodOptional<z.ZodObject<{
                id: z.coerce.ZodCoercedNumber<unknown>;
                user_id: z.coerce.ZodCoercedNumber<unknown>;
                period: z.coerce.ZodCoercedString<unknown>;
                category: z.coerce.ZodCoercedString<unknown>;
                title: z.coerce.ZodCoercedString<unknown>;
                description: z.ZodNullable<z.coerce.ZodCoercedString<unknown>>;
                status: z.coerce.ZodCoercedString<unknown>;
                priority: z.coerce.ZodCoercedString<unknown>;
                start_date: z.coerce.ZodCoercedDate<unknown>;
                end_date: z.coerce.ZodCoercedDate<unknown>;
                created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
                updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
                readonly user: z.ZodOptional<z.ZodObject<any, {
                    out: {};
                    in: {};
                }>>;
                readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
                    out: {};
                    in: {};
                }>>>;
            }, {
                out: {};
                in: {};
            }>>;
        }, {
            out: {};
            in: {};
        }>>>;
    }, {
        out: {};
        in: {};
    }>>;
}, {
    out: {};
    in: {};
}>;
export type TTask = z.infer<typeof taskSchema>;
