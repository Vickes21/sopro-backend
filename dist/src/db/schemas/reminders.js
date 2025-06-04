"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderSchema = exports.remindersRelations = exports.reminders = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_zod_1 = require("drizzle-zod");
const goals_1 = require("./goals");
const tasks_1 = require("./tasks");
const users_1 = require("./users");
exports.reminders = (0, mysql_core_1.mysqlTable)('reminders', {
    id: (0, mysql_core_1.int)().primaryKey().autoincrement(),
    user_id: (0, mysql_core_1.int)().references(() => users_1.users.id, { onDelete: 'cascade' }).notNull(),
    content: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    schedule_time: (0, mysql_core_1.timestamp)().notNull(),
    frequency: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    task_id: (0, mysql_core_1.int)().references(() => tasks_1.tasks.id, { onDelete: 'cascade' }),
    goal_id: (0, mysql_core_1.int)().references(() => goals_1.goals.id, { onDelete: 'cascade' })
});
exports.remindersRelations = (0, drizzle_orm_1.relations)(exports.reminders, ({ one }) => ({
    user: one(users_1.users, {
        fields: [exports.reminders.user_id],
        references: [users_1.users.id],
    }),
    task: one(tasks_1.tasks, {
        fields: [exports.reminders.task_id],
        references: [tasks_1.tasks.id],
    }),
    goal: one(goals_1.goals, {
        fields: [exports.reminders.goal_id],
        references: [goals_1.goals.id],
    }),
}));
exports.reminderSchema = (0, drizzle_zod_1.createSelectSchema)(exports.reminders).extend({
    get user() {
        return users_1.userSchema.optional();
    },
    get task() {
        return tasks_1.taskSchema.optional();
    },
    get goal() {
        return goals_1.goalSchema.optional();
    },
});
//# sourceMappingURL=reminders.js.map