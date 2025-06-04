"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationUpdateSchema = exports.conversationInsertSchema = exports.conversationSchema = exports.conversationsRelations = exports.conversations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const messages_1 = require("./messages");
const drizzle_zod_1 = require("drizzle-zod");
const users_1 = require("./users");
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.conversations = (0, mysql_core_1.mysqlTable)('conversations', {
    id: (0, mysql_core_1.int)().primaryKey().autoincrement(),
    status: (0, mysql_core_1.varchar)({ length: 255 }).default('open').notNull(),
    contact_id: (0, mysql_core_1.int)().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow(),
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().onUpdateNow(),
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
exports.conversationInsertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.conversations);
exports.conversationUpdateSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.conversations);
//# sourceMappingURL=conversations.js.map