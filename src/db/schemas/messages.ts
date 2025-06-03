import { relations } from 'drizzle-orm';
import { conversations, conversationSchema } from './conversations';
import { z } from 'zod/v4';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { mysqlTable, int, varchar, timestamp, text } from 'drizzle-orm/mysql-core';

export const messages = mysqlTable('messages', {
  id: int().primaryKey().autoincrement(),
  content: text().notNull(),
  role: varchar({ length: 255 }).notNull(), // human, system, ai
  conversation_id: int().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
});

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversation_id],
    references: [conversations.id]
  })
}));

export const messageInsertSchema = createInsertSchema(messages);
export type TMessageInsert = z.infer<typeof messageInsertSchema>;

export const messageUpdateSchema = createUpdateSchema(messages);
export type TMessageUpdate = z.infer<typeof messageUpdateSchema>;

export const messageSchema = createSelectSchema(messages).extend({
  get conversation() {
    return conversationSchema.optional();
  }
});

export type TMessage = z.infer<typeof messageSchema>;
  