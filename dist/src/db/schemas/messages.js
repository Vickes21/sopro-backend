"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = exports.messagesRelations = exports.messages = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const conversations_1 = require("./conversations");
const drizzle_zod_1 = require("drizzle-zod");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.messages = (0, pg_core_1.pgTable)('messages', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    content: (0, pg_core_1.text)().notNull(),
    role: (0, pg_core_1.text)({ enum: ['human', 'system', 'ai'] }).notNull(),
    conversation_id: (0, pg_core_1.serial)("conversation_id").notNull(),
    created_at: (0, pg_core_1.timestamp)().defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)().defaultNow().notNull()
});
exports.messagesRelations = (0, drizzle_orm_1.relations)(exports.messages, ({ one }) => ({
    conversation: one(conversations_1.conversations, {
        fields: [exports.messages.conversation_id],
        references: [conversations_1.conversations.id]
    })
}));
exports.messageSchema = (0, drizzle_zod_1.createSelectSchema)(exports.messages).extend({
    get conversation() {
        return conversations_1.conversationSchema.optional();
    }
});
//# sourceMappingURL=messages.js.map