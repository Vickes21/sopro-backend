import { relations } from 'drizzle-orm';
import { conversations, conversationSchema } from './conversations';
import { z } from 'zod/v4';
import { createSelectSchema } from 'drizzle-zod';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
  id: serial("id").primaryKey(),
  content: text().notNull(),
  role: text({ enum: ['human', 'system', 'ai'] }).notNull(),
  conversation_id: serial("conversation_id").notNull(),
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
  