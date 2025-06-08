import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/db/schemas';
import { TMessage } from 'src/db/schemas/messages';
export declare class MessagesService {
    private db;
    constructor(db: NeonHttpDatabase<typeof schema>);
    create(data: Partial<TMessage>): Promise<TMessage>;
    getAll(): Promise<{
        id: number;
        content: string;
        role: "human" | "system" | "ai";
        conversation_id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    update(id: string, data: Partial<TMessage>): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
    delete(id: string): Promise<import("drizzle-orm/neon-http").NeonHttpQueryResult<never>>;
}
