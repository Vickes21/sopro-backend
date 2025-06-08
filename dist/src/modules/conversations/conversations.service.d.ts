import * as schema from 'src/db/schemas';
import { TConversation } from 'src/db/schemas/conversations';
import { TMessage } from 'src/db/schemas/messages';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
export declare class ConversationsService {
    private db;
    constructor(db: NeonHttpDatabase<typeof schema>);
    create(data: Partial<TConversation>, relations?: string[]): Promise<TConversation>;
    get(id: string, relations?: string[]): Promise<TConversation | undefined>;
    getAll(relations?: string[]): Promise<{
        status: "open" | "closed" | "waiting";
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
            role: "human" | "system" | "ai";
            conversation_id: number;
        }[];
    }[]>;
    getByContactId(contactId: string, relations?: string[]): Promise<{
        status: "open" | "closed" | "waiting";
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
            role: "human" | "system" | "ai";
            conversation_id: number;
        }[];
    }[]>;
    getActiveConversationByContactId(contactId: number, relations?: string[]): Promise<TConversation | undefined>;
    update(id: number, data: Partial<TConversation>): Promise<{
        id: number;
        status: "open" | "closed" | "waiting";
        contact_id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    delete(id: number): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    addMessages(conversationId: number, messagesToInsert: Partial<TMessage>[]): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        role: "human" | "system" | "ai";
        conversation_id: number;
    }[]>;
    getOrCreate(contactId: number, relations?: string[]): Promise<TConversation>;
    closeConversation(id: number): Promise<{
        id: number;
        status: "open" | "closed" | "waiting";
        contact_id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    setWaiting(id: number): Promise<{
        id: number;
        status: "open" | "closed" | "waiting";
        contact_id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    reopenConversation(id: number): Promise<{
        id: number;
        status: "open" | "closed" | "waiting";
        contact_id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
}
