"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_provider_1 = require("../../db/drizzle.provider");
const conversations_1 = require("../../db/schemas/conversations");
const messages_1 = require("../../db/schemas/messages");
const mysql2_1 = require("drizzle-orm/mysql2");
let ConversationsService = class ConversationsService {
    constructor(db) {
        this.db = db;
    }
    async create(data, relations = []) {
        const inserted = await this.db.insert(conversations_1.conversations).values({
            contact_id: data.contact_id,
            status: data.status,
        }).$returningId();
        const conversation = await this.get(inserted[0].id.toString(), relations);
        return conversation;
    }
    async get(id, relations = []) {
        const result = this.db.query.conversations.findFirst({
            where: (0, drizzle_orm_1.eq)(conversations_1.conversations.id, parseInt(id)),
            with: relations.reduce((acc, relation) => {
                acc[relation] = true;
                return acc;
            }, {}),
        });
        return result;
    }
    async getAll(relations = []) {
        const data = await this.db.query.conversations.findMany({
            with: relations.reduce((acc, relation) => {
                acc[relation] = true;
                return acc;
            }, {}),
        });
        return data;
    }
    async getByContactId(contactId, relations = []) {
        const data = await this.db.query.conversations.findMany({
            where: (0, drizzle_orm_1.eq)(conversations_1.conversations.contact_id, parseInt(contactId)),
            with: relations.reduce((acc, relation) => {
                acc[relation] = true;
                return acc;
            }, {}),
        });
        return data;
    }
    async getActiveConversationByContactId(contactId, relations = []) {
        const data = await this.db.query.conversations.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(conversations_1.conversations.contact_id, contactId), (0, drizzle_orm_1.eq)(conversations_1.conversations.status, 'open')),
            orderBy: (conversations, { desc }) => [desc(conversations.updated_at)],
            with: relations.reduce((acc, relation) => {
                acc[relation] = true;
                return acc;
            }, {}),
        });
        if (!data) {
            return undefined;
        }
        return data;
    }
    async update(id, data) {
        const updated = await this.db
            .update(conversations_1.conversations)
            .set({
            ...data,
            status: data.status,
        })
            .where((0, drizzle_orm_1.eq)(conversations_1.conversations.id, id));
        return updated;
    }
    async delete(id) {
        const deleted = await this.db
            .delete(conversations_1.conversations)
            .where((0, drizzle_orm_1.eq)(conversations_1.conversations.id, id));
        return deleted;
    }
    async addMessages(conversationId, messagesToInsert) {
        const inserted = await this.db.insert(messages_1.messages).values(messagesToInsert).$returningId();
        return inserted;
    }
    async getOrCreate(contactId, relations = []) {
        const existing = await this.getActiveConversationByContactId(contactId, relations);
        if (existing) {
            return existing;
        }
        const conversationData = {
            contact_id: contactId,
            status: 'open'
        };
        return await this.create(conversationData, relations);
    }
    async closeConversation(id) {
        return await this.update(id, { status: 'closed' });
    }
    async setWaiting(id) {
        return await this.update(id, { status: 'waiting' });
    }
    async reopenConversation(id) {
        return await this.update(id, { status: 'open' });
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [mysql2_1.MySql2Database])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map