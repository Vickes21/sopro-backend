import { relations } from 'drizzle-orm';
import { messages, messageSchema } from './messages';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod/v4';
import { users, userSchema } from './users';
import { int, mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const conversations = mysqlTable('conversations', {
  id: int().primaryKey().autoincrement(),
  status: varchar({ length: 255 }).default('open').notNull(), // open, closed, waiting
  contact_id: int().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow().onUpdateNow(),
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

export const conversationInsertSchema = createInsertSchema(conversations);
export type TConversationInsert = z.infer<typeof conversationInsertSchema>;

export const conversationUpdateSchema = createUpdateSchema(conversations);
export type TConversationUpdate = z.infer<typeof conversationUpdateSchema>;



