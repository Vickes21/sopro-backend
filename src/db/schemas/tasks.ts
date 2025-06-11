import { goals, goalSchema } from "./goals";
import { relations } from "drizzle-orm";
import { z } from "zod/v4";
import { createSelectSchema } from "drizzle-zod";
import { users, userSchema } from "./users";
import { mysqlTable, int, serial, text, timestamp } from "drizzle-orm/mysql-core";

export const tasks = mysqlTable('tasks', {
  id: int("id").primaryKey().autoincrement(),
  user_id: int("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  goal_id: int("goal_id").references(() => goals.id, { onDelete: 'set null' }),
  title: text().notNull(),
  description: text(),
  due_date: timestamp(),
  priority: text({ enum: ['high', 'medium', 'low'] }).notNull(),
  status: text({ enum: ['pending', 'in_progress', 'completed', 'cancelled'] }).notNull(),
  last_status_at: timestamp().notNull().defaultNow(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow().$onUpdate(() => new Date()),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  goal: one(goals, {
    fields: [tasks.goal_id],
    references: [goals.id],
  }),
  user: one(users, {
    fields: [tasks.user_id],
    references: [users.id],
  }),
}));

export const taskSchema = createSelectSchema(tasks).extend({
  get goal() {
    return goalSchema.optional();
  },
  get user() {
    return userSchema.optional();
  }
});

export type TTask = z.infer<typeof taskSchema>;
