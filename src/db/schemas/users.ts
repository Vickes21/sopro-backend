import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { goals, goalSchema } from "src/db/schemas/goals";
import { reminders, reminderSchema } from "src/db/schemas/reminders";
import { tasks, taskSchema } from "src/db/schemas/tasks";
import { z } from "zod/v4";
import { mysqlTable } from "drizzle-orm/mysql-core";
import { int, text, boolean, timestamp, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: int("id").primaryKey().autoincrement(),
  name: text(),
  email: varchar({ length: 255 }).unique(),
  phone: varchar({ length: 255 }).notNull().unique(),
  password: text(),
  onboarding_completed: boolean().notNull().default(false),
  onboarding_step: int().notNull().default(0),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow().$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  goals: many(goals),
  tasks: many(tasks),
  reminders: many(reminders),
}));


export const userSchema = createSelectSchema(users).extend({
  get goals() {
    return goalSchema.array().optional();
  },
  get tasks() {
    return taskSchema.array().optional();
  },
  get reminders() {
    return reminderSchema.array().optional();
  }
});

export type TUser = z.infer<typeof userSchema>;


