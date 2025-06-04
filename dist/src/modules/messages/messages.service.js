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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const mysql2_1 = require("drizzle-orm/mysql2");
const drizzle_provider_1 = require("../../db/drizzle.provider");
const messages_1 = require("../../db/schemas/messages");
const messages_2 = require("../../db/schemas/messages");
let MessagesService = class MessagesService {
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        const { conversation_id, role, content, } = messages_2.messageInsertSchema.parse(data);
        const inserted = await this.db.insert(messages_1.messages).values({
            content: content,
            role: role,
            conversation_id: conversation_id,
        }).$returningId();
        return inserted[0];
    }
    async getAll() {
        const data = await this.db.select().from(messages_1.messages);
        return data;
    }
    async update(id, data) {
        const validated = messages_2.messageUpdateSchema.parse(data);
        const message = await this.db
            .update(messages_1.messages)
            .set({
            ...validated,
        })
            .where((0, drizzle_orm_1.eq)(messages_1.messages.id, parseInt(id)));
        return message;
    }
    async delete(id) {
        const message = await this.db
            .delete(messages_1.messages)
            .where((0, drizzle_orm_1.eq)(messages_1.messages.id, parseInt(id)));
        return message;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [mysql2_1.MySql2Database])
], MessagesService);
//# sourceMappingURL=messages.service.js.map