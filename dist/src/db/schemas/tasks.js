"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = exports.tasksRelations = exports.tasks = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const goals_1 = require("./goals");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_zod_1 = require("drizzle-zod");
const users_1 = require("./users");
exports.tasks = (0, mysql_core_1.mysqlTable)('tasks', {
    id: (0, mysql_core_1.int)().primaryKey().autoincrement(),
    user_id: (0, mysql_core_1.int)().references(() => users_1.users.id, { onDelete: 'cascade' }).notNull(),
    goal_id: (0, mysql_core_1.int)().references(() => goals_1.goals.id, { onDelete: 'set null' }),
    title: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    description: (0, mysql_core_1.text)(),
    due_date: (0, mysql_core_1.timestamp)(),
    priority: (0, mysql_core_1.mysqlEnum)(['high', 'medium', 'low']).notNull(),
    status: (0, mysql_core_1.mysqlEnum)(['pending', 'in_progress', 'completed', 'cancelled']).notNull(),
    last_status_at: (0, mysql_core_1.timestamp)().notNull().defaultNow(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow(),
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().onUpdateNow(),
});
exports.tasksRelations = (0, drizzle_orm_1.relations)(exports.tasks, ({ one, many }) => ({
    goal: one(goals_1.goals, {
        fields: [exports.tasks.goal_id],
        references: [goals_1.goals.id],
    }),
    user: one(users_1.users, {
        fields: [exports.tasks.user_id],
        references: [users_1.users.id],
    }),
}));
exports.taskSchema = (0, drizzle_zod_1.createSelectSchema)(exports.tasks).extend({
    get goal() {
        return goals_1.goalSchema.optional();
    },
    get user() {
        return users_1.userSchema.optional();
    }
});
//# sourceMappingURL=tasks.js.map