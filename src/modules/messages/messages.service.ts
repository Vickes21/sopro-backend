import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import * as schema from 'src/db/schemas';
import { messages, TMessage } from 'src/db/schemas/messages';

@Injectable()
export class MessagesService {

  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NeonHttpDatabase<typeof schema>,
  ){}

  /**
   * Create a new message
   * @param data Message data to insert
   * @param relations Relations to include in the response
   * @returns Created message with relations
   */
  async create(data: Partial<TMessage>): Promise<TMessage> {
    const {
      conversation_id,
      role,
      content,
    } = data;

    const inserted = await this.db.insert(messages).values({
      content: content,
      role: role as 'human' | 'system' | 'ai',
      conversation_id: conversation_id,
    }).returning();

    return inserted[0];
  }

  /**
   * Get all messages
   * @returns Array of all messages
   */
  async getAll() {
    const data = await this.db.select().from(messages);
    return data;
  }

  /**
   * Update a message
   * @param id Message ID
   * @param data Update data
   * @returns Updated message
   */
  async update(id: string, data: Partial<TMessage>) {
    const message = await this.db
      .update(messages)
      .set({
        ...data,
        role: data.role as 'human' | 'system' | 'ai',
      })
      .where(eq(messages.id, parseInt(id)))
    return message;
  }

  /**
   * Delete a message
   * @param id Message ID
   * @returns Deleted message
   */
  async delete(id: string) {
    const message = await this.db
      .delete(messages)
      .where(eq(messages.id, parseInt(id)))
    return message;
  }
}
