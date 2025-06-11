import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { goals, goalSchema } from "src/db/schemas/goals";
import { tasks, taskSchema } from "src/db/schemas/tasks";
import { users, userSchema } from "src/db/schemas/users";
import { z } from "zod/v4";
import { mysqlTable, int, serial, text, timestamp } from "drizzle-orm/mysql-core";

export const reminders = mysqlTable('reminders', {
  id: int("id").primaryKey().autoincrement(),
  user_id: int("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  content: text().notNull(),
  schedule_time: timestamp().notNull(),
  frequency: text({ enum: ['once', 'daily', 'weekly', 'monthly'] }).notNull(),
  task_id: int("task_id").references(() => tasks.id, { onDelete: 'cascade' }),
  goal_id: int("goal_id").references(() => goals.id, { onDelete: 'cascade' })
});

export const remindersRelations = relations(reminders, ({ one }) => ({
  user: one(users, {
    fields: [reminders.user_id],
    references: [users.id],
  }),
  task: one(tasks, {
    fields: [reminders.task_id],
    references: [tasks.id],
  }),
  goal: one(goals, {
    fields: [reminders.goal_id],
    references: [goals.id],
  }),
}));

export const reminderSchema = createSelectSchema(reminders).extend({
  get user() {
    return userSchema.optional();
  },
  get task() {
    return taskSchema.optional();
  },
  get goal() {
    return goalSchema.optional();
  },
});

export type TReminder = z.infer<typeof reminderSchema>;
