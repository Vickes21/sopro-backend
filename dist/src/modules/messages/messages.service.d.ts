import * as schema from 'src/db/schemas';
import { TMessage } from 'src/db/schemas/messages';
import { MySql2Database } from 'drizzle-orm/mysql2';
export declare class MessagesService {
    private db;
    constructor(db: MySql2Database<typeof schema>);
    create(data: Partial<TMessage>): Promise<{
        id: number;
    }[]>;
    getAll(): Promise<{
        id: number;
        content: string;
        role: "human" | "system" | "ai";
        conversation_id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    update(id: string, data: Partial<TMessage>): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    delete(id: string): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
}
