"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.usersRelations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_zod_1 = require("drizzle-zod");
const goals_1 = require("./goals");
const reminders_1 = require("./reminders");
const tasks_1 = require("./tasks");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const mysql_core_2 = require("drizzle-orm/mysql-core");
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_2.int)("id").primaryKey().autoincrement(),
    name: (0, mysql_core_2.text)(),
    email: (0, mysql_core_2.varchar)({ length: 255 }).unique(),
    phone: (0, mysql_core_2.varchar)({ length: 255 }).notNull().unique(),
    password: (0, mysql_core_2.text)(),
    onboarding_completed: (0, mysql_core_2.boolean)().notNull().default(false),
    onboarding_step: (0, mysql_core_2.int)().notNull().default(0),
    created_at: (0, mysql_core_2.timestamp)().defaultNow(),
    updated_at: (0, mysql_core_2.timestamp)().defaultNow().$onUpdate(() => new Date()),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ one, many }) => ({
    goals: many(goals_1.goals),
    tasks: many(tasks_1.tasks),
    reminders: many(reminders_1.reminders),
}));
exports.userSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users).extend({
    get goals() {
        return goals_1.goalSchema.array().optional();
    },
    get tasks() {
        return tasks_1.taskSchema.array().optional();
    },
    get reminders() {
        return reminders_1.reminderSchema.array().optional();
    }
});
//# sourceMappingURL=users.js.map