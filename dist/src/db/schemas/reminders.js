"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderSchema = exports.remindersRelations = exports.reminders = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_zod_1 = require("drizzle-zod");
const goals_1 = require("./goals");
const tasks_1 = require("./tasks");
const users_1 = require("./users");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.reminders = (0, pg_core_1.pgTable)('reminders', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    user_id: (0, pg_core_1.serial)("user_id").references(() => users_1.users.id, { onDelete: 'cascade' }).notNull(),
    content: (0, pg_core_1.text)().notNull(),
    schedule_time: (0, pg_core_1.timestamp)().notNull(),
    frequency: (0, pg_core_1.text)({ enum: ['once', 'daily', 'weekly', 'monthly'] }).notNull(),
    task_id: (0, pg_core_1.serial)("task_id").references(() => tasks_1.tasks.id, { onDelete: 'cascade' }),
    goal_id: (0, pg_core_1.serial)("goal_id").references(() => goals_1.goals.id, { onDelete: 'cascade' })
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