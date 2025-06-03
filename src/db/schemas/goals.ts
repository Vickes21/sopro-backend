import { relations } from "drizzle-orm";
import { mysqlTable, int, varchar, date, text, mysqlEnum, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { tasks, taskSchema } from "src/db/schemas/tasks";
import { users, userSchema } from "src/db/schemas/users";
import { z } from "zod/v4";

export const goals = mysqlTable('goals', {
  id: int().primaryKey().autoincrement(),
  user_id: int().references(() => users.id, { onDelete: 'cascade' }).notNull(),
  period: mysqlEnum(['daily', 'weekly', 'monthly', 'yearly']).notNull(),
  category: mysqlEnum(['personal', 'professional']).notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  status: mysqlEnum(['not_started', 'in_progress', 'completed', 'abandoned']).notNull(),
  priority: mysqlEnum(['high', 'medium', 'low']).notNull(),
  start_date: date().notNull(),
  end_date: date().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow().onUpdateNow(),
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