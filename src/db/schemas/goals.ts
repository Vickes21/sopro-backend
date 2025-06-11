import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { tasks, taskSchema } from "src/db/schemas/tasks";
import { users, userSchema } from "src/db/schemas/users";
import { z } from "zod/v4";
import { mysqlTable, int, date, text, timestamp, serial } from "drizzle-orm/mysql-core";

export const goals = mysqlTable('goals', {
  id: int("id").primaryKey().autoincrement(),
  user_id: int("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  period: text({ enum: ['daily', 'weekly', 'monthly', 'yearly'] }).notNull(),
  category: text({ enum: ['personal', 'professional'] }).notNull(),
  title: text().notNull(),
  description: text(),
  status: text({ enum: ['not_started', 'in_progress', 'completed', 'abandoned'] }).notNull(),
  priority: text({ enum: ['high', 'medium', 'low'] }).notNull(),
  start_date: date().notNull(),
  end_date: date().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow().$onUpdate(() => new Date()),
});


export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, {
    fields: [goals.user_id],
    references: [users.id],
  }),
  tasks: many(tasks),
}));

export const goalSchema = createSelectSchema(goals).extend({
  get user() {
    return userSchema.optional();
  },
  get tasks() {
    return taskSchema.array().optional();
  }
});

export type TGoal = z.infer<typeof goalSchema>;