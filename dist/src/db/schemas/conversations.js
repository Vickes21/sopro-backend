"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationSchema = exports.conversationsRelations = exports.conversations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const messages_1 = require("./messages");
const drizzle_zod_1 = require("drizzle-zod");
const users_1 = require("./users");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.conversations = (0, pg_core_1.pgTable)('conversations', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    status: (0, pg_core_1.text)({ enum: ['open', 'closed', 'waiting'] }).default('open').notNull(),
    contact_id: (0, pg_core_1.serial)("contact_id").notNull(),
    created_at: (0, pg_core_1.timestamp)().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)().defaultNow().$onUpdate(() => new Date()),
});
exports.conversationsRelations = (0, drizzle_orm_1.relations)(exports.conversations, ({ one, many }) => ({
    user: one(users_1.users, {
        fields: [exports.conversations.contact_id],
        references: [users_1.users.id]
    }),
    messages: many(messages_1.messages)
}));
exports.conversationSchema = (0, drizzle_zod_1.createSelectSchema)(exports.conversations).extend({
    get user() {
        return users_1.userSchema.optional();
    },
    get messages() {
        return messages_1.messageSchema.array().optional();
    }
});
//# sourceMappingURL=conversations.js.map