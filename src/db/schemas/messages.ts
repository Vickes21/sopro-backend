import { relations } from 'drizzle-orm';
import { conversations, conversationSchema } from './conversations';
import { z } from 'zod/v4';
import { createSelectSchema } from 'drizzle-zod';
import { mysqlTable, int, serial, text, timestamp } from 'drizzle-orm/mysql-core';

export const messages = mysqlTable('messages', {
  id: int("id").primaryKey().autoincrement(),
  content: text().notNull(),
  role: text({ enum: ['human', 'system', 'ai'] }).notNull(),
  conversation_id: int("conversation_id").notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
});

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversation_id],
    references: [conversations.id]
  })
}));

export const messageSchema = createSelectSchema(messages).extend({
  get conversation() {
    return conversationSchema.optional();
  }
});

export type TMessage = z.infer<typeof messageSchema>;
  