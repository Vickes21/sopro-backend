"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalSchema = exports.goalsRelations = exports.goals = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_zod_1 = require("drizzle-zod");
const tasks_1 = require("./tasks");
const users_1 = require("./users");
exports.goals = (0, mysql_core_1.mysqlTable)('goals', {
    id: (0, mysql_core_1.int)().primaryKey().autoincrement(),
    user_id: (0, mysql_core_1.int)().references(() => users_1.users.id, { onDelete: 'cascade' }).notNull(),
    period: (0, mysql_core_1.mysqlEnum)(['daily', 'weekly', 'monthly', 'yearly']).notNull(),
    category: (0, mysql_core_1.mysqlEnum)(['personal', 'professional']).notNull(),
    title: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    description: (0, mysql_core_1.text)(),
    status: (0, mysql_core_1.mysqlEnum)(['not_started', 'in_progress', 'completed', 'abandoned']).notNull(),
    priority: (0, mysql_core_1.mysqlEnum)(['high', 'medium', 'low']).notNull(),
    start_date: (0, mysql_core_1.date)().notNull(),
    end_date: (0, mysql_core_1.date)().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow(),
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().onUpdateNow(),
});
exports.goalsRelations = (0, drizzle_orm_1.relations)(exports.goals, ({ one, many }) => ({
    user: one(users_1.users, {
        fields: [exports.goals.user_id],
        references: [users_1.users.id],
    }),
    tasks: many(tasks_1.tasks),
}));
exports.goalSchema = (0, drizzle_zod_1.createSelectSchema)(exports.goals).extend({
    get user() {
        return users_1.userSchema.optional();
    },
    get tasks() {
        return tasks_1.taskSchema.array().optional();
    }
});
//# sourceMappingURL=goals.js.map