import { mysqlTable, int, varchar, text, mysqlEnum, timestamp } from "drizzle-orm/mysql-core";
import { goals, goalSchema } from "./goals";
import { relations } from "drizzle-orm";
import { z } from "zod/v4";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { users, userSchema } from "./users";

export const tasks = mysqlTable('tasks', {
  id: int().primaryKey().autoincrement(),
  user_id: int().references(() => users.id, { onDelete: 'cascade' }).notNull(),
  goal_id: int().references(() => goals.id, { onDelete: 'set null' }),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  due_date: timestamp(),
  priority: mysqlEnum(['high', 'medium', 'low']).notNull(),
  status: mysqlEnum(['pending', 'in_progress', 'completed', 'cancelled']).notNull(),
  last_status_at: timestamp().notNull().defaultNow(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow().onUpdateNow(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
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
