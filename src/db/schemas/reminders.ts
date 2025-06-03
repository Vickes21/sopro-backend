import { relations } from "drizzle-orm";
import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";
import { createSelectSchema } from "drizzle-zod";
import { goals, goalSchema } from "src/db/schemas/goals";
import { tasks, taskSchema } from "src/db/schemas/tasks";
import { users, userSchema } from "src/db/schemas/users";
import { z } from "zod/v4";

export const reminders = mysqlTable('reminders', {
  id: int().primaryKey().autoincrement(),
  user_id: int().references(() => users.id, { onDelete: 'cascade' }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  schedule_time: timestamp().notNull(),
  frequency: varchar({ length: 255 }).notNull(),
  task_id: int().references(() => tasks.id, { onDelete: 'cascade' }),
  goal_id: int().references(() => goals.id, { onDelete: 'cascade' })
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
