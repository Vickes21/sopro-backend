import { z } from 'zod/v4';
export declare const messages: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "messages";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "messages";
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
        content: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "content";
            tableName: "messages";
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
        role: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "role";
            tableName: "messages";
            dataType: "string";
            columnType: "MySqlText";
            data: "human" | "system" | "ai";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["human", "system", "ai"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        conversation_id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "conversation_id";
            tableName: "messages";
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
        created_at: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "created_at";
            tableName: "messages";
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
        updated_at: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "updated_at";
            tableName: "messages";
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
    };
    dialect: "mysql";
}>;
export declare const messagesRelations: import("drizzle-orm").Relations<"messages", {
    conversation: import("drizzle-orm").One<"conversations", true>;
}>;
export declare const messageSchema: z.ZodObject<{
    id: z.coerce.ZodCoercedNumber<unknown>;
    content: z.coerce.ZodCoercedString<unknown>;
    role: z.coerce.ZodCoercedString<unknown>;
    conversation_id: z.coerce.ZodCoercedNumber<unknown>;
    created_at: z.coerce.ZodCoercedDate<unknown>;
    updated_at: z.coerce.ZodCoercedDate<unknown>;
    readonly conversation: z.ZodOptional<z.ZodObject<{
        id: z.coerce.ZodCoercedNumber<unknown>;
        status: z.coerce.ZodCoercedString<unknown>;
        contact_id: z.coerce.ZodCoercedNumber<unknown>;
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
            }, {
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
                    readonly user: z.ZodOptional<z.ZodObject<any, {
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
                    start_date: z.coerce.ZodCoercedDate<unknown>;
                    end_date: z.coerce.ZodCoercedDate<unknown>;
                    created_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
                    updated_at: z.ZodNullable<z.coerce.ZodCoercedDate<unknown>>;
                    readonly user: z.ZodOptional<z.ZodObject<any, {
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
                }>>;
            }, {
                out: {};
                in: {};
            }>>>;
        }, {
            out: {};
            in: {};
        }>>;
        readonly messages: z.ZodOptional<z.ZodArray<z.ZodObject<any, {
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
export type TMessage = z.infer<typeof messageSchema>;
