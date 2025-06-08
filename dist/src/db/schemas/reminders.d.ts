import { z } from "zod/v4";
export declare const reminders: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "reminders";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "reminders";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "reminders";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
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
        content: import("drizzle-orm/pg-core").PgColumn<{
            name: "content";
            tableName: "reminders";
            dataType: "string";
            columnType: "PgText";
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
        schedule_time: import("drizzle-orm/pg-core").PgColumn<{
            name: "schedule_time";
            tableName: "reminders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
        frequency: import("drizzle-orm/pg-core").PgColumn<{
            name: "frequency";
            tableName: "reminders";
            dataType: "string";
            columnType: "PgText";
            data: "daily" | "weekly" | "monthly" | "once";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["once", "daily", "weekly", "monthly"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        task_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "task_id";
            tableName: "reminders";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
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
        goal_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "goal_id";
            tableName: "reminders";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
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
    };
    dialect: "pg";
}>;
export declare const remindersRelations: import("drizzle-orm").Relations<"reminders", {
    user: import("drizzle-orm").One<"users", true>;
    task: import("drizzle-orm").One<"tasks", true>;
    goal: import("drizzle-orm").One<"goals", true>;
}>;
export declare const reminderSchema: z.ZodObject<{
    id: z.coerce.ZodCoercedNumber<unknown>;
    user_id: z.coerce.ZodCoercedNumber<unknown>;
    content: z.coerce.ZodCoercedString<unknown>;
    schedule_time: z.coerce.ZodCoercedDate<unknown>;
    frequency: z.coerce.ZodCoercedString<unknown>;
    task_id: z.coerce.ZodCoercedNumber<unknown>;
    goal_id: z.coerce.ZodCoercedNumber<unknown>;
    readonly user: z.ZodOptional<z.ZodObject<{
        id: z.coerce.ZodCoercedNumber<unknown>;
        name: z.coerce.ZodCoercedString<unknown>;
        email: z.coerce.ZodCoercedString<unknown>;
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
            start_date: z.coerce.ZodCoercedString<unknown>;
            end_date: z.coerce.ZodCoercedString<unknown>;
            created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            readonly user: z.ZodOptional<z.ZodObject<any, {
                out: {};
                in: {};
            }>>;
            readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.coerce.ZodCoercedNumber<unknown>;
                user_id: z.coerce.ZodCoercedNumber<unknown>;
                goal_id: z.coerce.ZodCoercedNumber<unknown>;
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
        }, {
            out: {};
            in: {};
        }>>>;
        readonly tasks: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.coerce.ZodCoercedNumber<unknown>;
            user_id: z.coerce.ZodCoercedNumber<unknown>;
            goal_id: z.coerce.ZodCoercedNumber<unknown>;
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
                start_date: z.coerce.ZodCoercedString<unknown>;
                end_date: z.coerce.ZodCoercedString<unknown>;
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
            readonly user: z.ZodOptional<z.ZodObject<any, {
                out: {};
                in: {};
            }>>;
        }, {
            out: {};
            in: {};
        }>>>;
        readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
            out: {};
            in: {};
        }>>>;
    }, {
        out: {};
        in: {};
    }>>;
    readonly task: z.ZodOptional<z.ZodObject<{
        id: z.coerce.ZodCoercedNumber<unknown>;
        user_id: z.coerce.ZodCoercedNumber<unknown>;
        goal_id: z.coerce.ZodCoercedNumber<unknown>;
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
            start_date: z.coerce.ZodCoercedString<unknown>;
            end_date: z.coerce.ZodCoercedString<unknown>;
            created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
            readonly user: z.ZodOptional<z.ZodObject<{
                id: z.coerce.ZodCoercedNumber<unknown>;
                name: z.coerce.ZodCoercedString<unknown>;
                email: z.coerce.ZodCoercedString<unknown>;
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
                readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
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
            name: z.coerce.ZodCoercedString<unknown>;
            email: z.coerce.ZodCoercedString<unknown>;
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
                start_date: z.coerce.ZodCoercedString<unknown>;
                end_date: z.coerce.ZodCoercedString<unknown>;
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
            readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
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
        start_date: z.coerce.ZodCoercedString<unknown>;
        end_date: z.coerce.ZodCoercedString<unknown>;
        created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
        updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
        readonly user: z.ZodOptional<z.ZodObject<{
            id: z.coerce.ZodCoercedNumber<unknown>;
            name: z.coerce.ZodCoercedString<unknown>;
            email: z.coerce.ZodCoercedString<unknown>;
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
                goal_id: z.coerce.ZodCoercedNumber<unknown>;
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
            readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
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
            goal_id: z.coerce.ZodCoercedNumber<unknown>;
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
                name: z.coerce.ZodCoercedString<unknown>;
                email: z.coerce.ZodCoercedString<unknown>;
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
                readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
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
export type TReminder = z.infer<typeof reminderSchema>;
