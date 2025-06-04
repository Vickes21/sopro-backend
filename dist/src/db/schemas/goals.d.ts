import { z } from "zod/v4";
export declare const goals: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "goals";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "goals";
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
            tableName: "goals";
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
        period: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "period";
            tableName: "goals";
            dataType: "string";
            columnType: "MySqlEnumColumn";
            data: "daily" | "weekly" | "monthly" | "yearly";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["daily", "weekly", "monthly", "yearly"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        category: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "category";
            tableName: "goals";
            dataType: "string";
            columnType: "MySqlEnumColumn";
            data: "personal" | "professional";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["personal", "professional"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        title: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "title";
            tableName: "goals";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
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
            tableName: "goals";
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
        status: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "status";
            tableName: "goals";
            dataType: "string";
            columnType: "MySqlEnumColumn";
            data: "in_progress" | "completed" | "not_started" | "abandoned";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["not_started", "in_progress", "completed", "abandoned"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        priority: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "priority";
            tableName: "goals";
            dataType: "string";
            columnType: "MySqlEnumColumn";
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
        start_date: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "start_date";
            tableName: "goals";
            dataType: "date";
            columnType: "MySqlDate";
            data: Date;
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
        end_date: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "end_date";
            tableName: "goals";
            dataType: "date";
            columnType: "MySqlDate";
            data: Date;
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
        created_at: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "created_at";
            tableName: "goals";
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
            tableName: "goals";
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
export declare const goalsRelations: import("drizzle-orm").Relations<"goals", {
    user: import("drizzle-orm").One<"users", true>;
    tasks: import("drizzle-orm").Many<"tasks">;
}>;
export declare const goalSchema: z.ZodObject<{
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
        readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
            readonly goal: z.ZodOptional<z.ZodObject<any, {
                out: {};
                in: {};
            }>>;
            readonly user: z.ZodOptional<z.ZodObject<any, {
                out: {};
                in: {};
            }>>;
        }, {
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
            readonly task: z.ZodOptional<z.ZodObject<{
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
                readonly goal: z.ZodOptional<z.ZodObject<any, {
                    out: {};
                    in: {};
                }>>;
                readonly user: z.ZodOptional<z.ZodObject<any, {
                    out: {};
                    in: {};
                }>>;
            }, {
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
    readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
        readonly goal: z.ZodOptional<z.ZodObject<any, {
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
    }, {
        out: {};
        in: {};
    }>>>;
}, {
    out: {};
    in: {};
}>;
export type TGoal = z.infer<typeof goalSchema>;
