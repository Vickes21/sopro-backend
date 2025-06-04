import { TConversation, TConversationInsert } from 'src/db/schemas/conversations';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from 'src/db/schemas';
import { TMessage } from 'src/db/schemas';
export declare class ConversationsService {
    private db;
    constructor(db: MySql2Database<typeof schema>);
    create(data: TConversationInsert, relations?: string[]): Promise<TConversation>;
    get(id: string, relations?: string[]): Promise<TConversation | undefined>;
    getAll(relations?: string[]): Promise<{
        status: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        contact_id: number;
        user: {
            password: string;
            id: number;
            name: string;
            email: string;
            phone: string;
            onboarding_completed: boolean;
            onboarding_step: number;
            created_at: Date;
            updated_at: Date;
        };
        messages: {
            id: number;
            created_at: Date;
            updated_at: Date;
            content: string;
            role: string;
            conversation_id: number;
        }[];
    }[]>;
    getByContactId(contactId: string, relations?: string[]): Promise<{
        status: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        contact_id: number;
        user: {
            password: string;
            id: number;
            name: string;
            email: string;
            phone: string;
            onboarding_completed: boolean;
            onboarding_step: number;
            created_at: Date;
            updated_at: Date;
        };
        messages: {
            id: number;
            created_at: Date;
            updated_at: Date;
            content: string;
            role: string;
            conversation_id: number;
        }[];
    }[]>;
    getActiveConversationByContactId(contactId: number, relations?: string[]): Promise<TConversation | undefined>;
    update(id: number, data: Partial<TConversation>): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    delete(id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    addMessages(conversationId: number, messagesToInsert: Partial<TMessage>[]): Promise<{
        id: number;
    }[]>;
    getOrCreate(contactId: number, relations?: string[]): Promise<TConversation>;
    closeConversation(id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    setWaiting(id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    reopenConversation(id: number): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
