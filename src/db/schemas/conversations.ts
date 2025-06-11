import { relations } from 'drizzle-orm';
import { messages, messageSchema } from './messages';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';
import { users, userSchema } from './users';
import { mysqlTable, int, serial, text, timestamp } from 'drizzle-orm/mysql-core';

export const conversations = mysqlTable('conversations', {
  id: int("id").primaryKey().autoincrement(),
  status: text({ enum: ['open', 'closed', 'waiting'] }).default('open').notNull(),
  contact_id: int("contact_id").notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow().$onUpdate(() => new Date()),
});

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  user: one(users, {
    fields: [conversations.contact_id],
    references: [users.id]
  }),
  messages: many(messages)
}));

export const conversationSchema = createSelectSchema(conversations).extend({
  get user() {
    return userSchema.optional();
  },
  get messages() {
    return messageSchema.array().optional();
  }
});
export type TConversation = z.infer<typeof conversationSchema>;