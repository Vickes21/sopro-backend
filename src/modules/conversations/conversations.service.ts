import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import * as schema from 'src/db/schemas';
import { TConversation } from 'src/db/schemas/conversations';
import { conversations } from 'src/db/schemas/conversations';
import { messages } from 'src/db/schemas/messages';
import { TMessage } from 'src/db/schemas/messages';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { MySql2Database } from 'drizzle-orm/mysql2';

@Injectable()
export class ConversationsService {

  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: MySql2Database<typeof schema>,
  ){}

  /**
   * Create a new conversation
   * @param data Conversation data to insert
   * @param relations Relations to include in the response
   * @returns Created conversation with relations
   */
  async create(data: Partial<TConversation>, relations: string[] = []): Promise<TConversation> {
    const inserted = await this.db.insert(conversations).values({
      contact_id: data.contact_id,
      status: data.status as 'open' | 'closed' | 'waiting',
    }).$returningId();

    // Get with relations
    const conversation = await this.get(inserted[0].id.toString(), relations) as TConversation;

    return conversation;
  }

  /**
   * Get a conversation by ID
   * @param id Conversation ID
   * @param relations Relations to include in the response
   * @returns Conversation with specified relations
   */
  async get(id: string, relations: string[] = []): Promise<TConversation | undefined> {
    const result = this.db.query.conversations.findFirst({
      where: eq(conversations.id, parseInt(id)),
      with: relations.reduce((acc, relation) => {
        acc[relation] = true;
        return acc;
      }, {} as Record<string, boolean>),
    }) as unknown as TConversation;

    return result;
  }

  /**
   * Get all conversations
   * @param relations Relations to include in the response
   * @returns Array of all conversations
   */
  async getAll(relations: string[] = []) {
    const data = await this.db.query.conversations.findMany({
      with: relations.reduce((acc, relation) => {
        acc[relation] = true;
        return acc;
      }, {} as Record<string, boolean>),
    });
    return data;
  }

  /**
   * Get conversations by contact ID
   * @param contactId Contact ID
   * @param relations Relations to include in the response
   * @returns Array of conversations for the specified contact
   */
  async getByContactId(contactId: string, relations: string[] = []) {
    const data = await this.db.query.conversations.findMany({
      where: eq(conversations.contact_id, parseInt(contactId)),
      with: relations.reduce((acc, relation) => {
        acc[relation] = true;
        return acc;
      }, {} as Record<string, boolean>),
    });
    return data;
  }

  /**
   * Get active conversation for a contact
   * @param contactId Contact ID
   * @param relations Relations to include in the response
   * @returns The active conversation or undefined if none exists
   */
  async getActiveConversationByContactId(contactId: number, relations: string[] = []): Promise<TConversation | undefined> {
    const data = await this.db.query.conversations.findFirst({
      where: and(eq(conversations.contact_id, contactId), eq(conversations.status, 'open')),
      orderBy: (conversations, { desc }) => [desc(conversations.updated_at)],
      with: relations.reduce((acc, relation) => {
        acc[relation] = true;
        return acc;
      }, {} as Record<string, boolean>),
    });

    if (!data) {
      return undefined;
    }

    return data as unknown as TConversation;
  }

  /**
   * Update a conversation
   * @param id Conversation ID
   * @param data Update data
   * @returns Updated conversation
   */
  async update(id: number, data: Partial<TConversation>) {
    
    const updated = await this.db
      .update(conversations)
      .set({
        ...data,
        status: data.status as 'open' | 'closed' | 'waiting',
      })
      .where(eq(conversations.id, id))

    return updated;
  }

  /**
   * Delete a conversation
   * @param id Conversation ID
   * @returns Deleted conversation
   */
  async delete(id: number) {
    const deleted = await this.db
      .delete(conversations)
      .where(eq(conversations.id, id))
    return deleted;
  }

  /**
   * Add a message to a conversation
   * @param conversationId Conversation ID
   * @param content Message content
   * @param role Message role (human, system, ai)
   * @returns Created message
   */
  async addMessages(conversationId: number, messagesToInsert: Partial<TMessage>[]) {

    // Create message
    const inserted = await this.db.insert(messages).values(
      messagesToInsert as unknown as any
    ).$returningId();

    return inserted;
  }

  /**
   * Get or create a conversation for a contact
   * @param contactId Contact ID
   * @param relations Relations to include in the response
   * @returns Existing or newly created conversation
   */
  async getOrCreate(contactId: number, relations: string[] = []): Promise<TConversation> {
    // Try to get an active conversation
    const existing = await this.getActiveConversationByContactId(contactId, relations);
    
    if (existing) {
      return existing as TConversation;
    }
    
    // Create a new conversation if none exists
    const conversationData = {
      contact_id: contactId,
      status: 'open'
    };
    
    return await this.create(conversationData, relations);
  }

  /**
   * Close a conversation
   * @param id Conversation ID
   * @returns Updated conversation
   */
  async closeConversation(id: number) {
    return await this.update(id, { status: 'closed' });
  }

  /**
   * Set conversation status to waiting
   * @param id Conversation ID
   * @returns Updated conversation
   */
  async setWaiting(id: number) {
    return await this.update(id, { status: 'waiting' });
  }

  /**
   * Reopen a closed conversation
   * @param id Conversation ID
   * @returns Updated conversation
   */
  async reopenConversation(id: number) {
    return await this.update(id, { status: 'open' });
  }
}
