import { z } from 'zod/v4';
export declare const conversations: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "conversations";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "conversations";
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
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: "open" | "closed" | "waiting";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["open", "closed", "waiting"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        contact_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "contact_id";
            tableName: "conversations";
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
        created_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
        updated_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
    dialect: "pg";
}>;
export declare const conversationsRelations: import("drizzle-orm").Relations<"conversations", {
    user: import("drizzle-orm").One<"users", true>;
    messages: import("drizzle-orm").Many<"messages">;
}>;
export declare const conversationSchema: z.ZodObject<{
    id: z.coerce.ZodCoercedNumber<unknown>;
    status: z.coerce.ZodCoercedString<unknown>;
    contact_id: z.coerce.ZodCoercedNumber<unknown>;
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
        readonly reminders: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.coerce.ZodCoercedNumber<unknown>;
            user_id: z.coerce.ZodCoercedNumber<unknown>;
            content: z.coerce.ZodCoercedString<unknown>;
            schedule_time: z.coerce.ZodCoercedDate<unknown>;
            frequency: z.coerce.ZodCoercedString<unknown>;
            task_id: z.coerce.ZodCoercedNumber<unknown>;
            goal_id: z.coerce.ZodCoercedNumber<unknown>;
            readonly user: z.ZodOptional<z.ZodObject<any, {
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
            }>>;
        }, {
            out: {};
            in: {};
        }>>>;
    }, {
        out: {};
        in: {};
    }>>;
    readonly messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.coerce.ZodCoercedNumber<unknown>;
        content: z.coerce.ZodCoercedString<unknown>;
        role: z.coerce.ZodCoercedString<unknown>;
        conversation_id: z.coerce.ZodCoercedNumber<unknown>;
        created_at: z.coerce.ZodCoercedDate<unknown>;
        updated_at: z.coerce.ZodCoercedDate<unknown>;
        readonly conversation: z.ZodOptional<z.ZodObject<any, {
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
export type TConversation = z.infer<typeof conversationSchema>;
