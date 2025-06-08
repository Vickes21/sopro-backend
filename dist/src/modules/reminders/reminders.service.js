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
exports.RemindersService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_provider_1 = require("../../db/drizzle.provider");
const neon_http_1 = require("drizzle-orm/neon-http");
const schema = require("../../db/schemas");
const common_2 = require("@nestjs/common");
const reminders_1 = require("../../db/schemas/reminders");
const drizzle_orm_1 = require("drizzle-orm");
const ai_service_1 = require("../ai/ai.service");
let RemindersService = class RemindersService {
    constructor(db, aiService) {
        this.db = db;
        this.aiService = aiService;
    }
    async create(createReminderDto) {
        return await this.db.insert(reminders_1.reminders).values(createReminderDto);
    }
    async findAll() {
        return await this.db.select().from(reminders_1.reminders);
    }
    async findOne(id) {
        return await this.db.select().from(reminders_1.reminders).where((0, drizzle_orm_1.eq)(schema.reminders.id, id));
    }
    async update(id, updateReminderDto) {
        return await this.db.update(reminders_1.reminders).set(updateReminderDto).where((0, drizzle_orm_1.eq)(schema.reminders.id, id));
    }
    async remove(id) {
        return await this.db.delete(reminders_1.reminders).where((0, drizzle_orm_1.eq)(schema.reminders.id, id));
    }
    async send() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const remindersToSend = await this.db
            .select()
            .from(reminders_1.reminders)
            .where((0, drizzle_orm_1.sql) `HOUR(${reminders_1.reminders.schedule_time}) = ${currentHour} AND MINUTE(${reminders_1.reminders.schedule_time}) = ${currentMinute}`);
        for (const reminder of remindersToSend) {
            const shouldSendToday = this.shouldSendReminderToday(reminder);
            if (shouldSendToday) {
                const user = await this.db.select().from(schema.users).where((0, drizzle_orm_1.eq)(schema.users.id, reminder.user_id));
                await this.aiService.sendReminder({
                    ...reminder,
                    user: user[0]
                });
            }
        }
        return { sent: remindersToSend.length };
    }
    shouldSendReminderToday(reminder) {
        const now = new Date();
        const scheduleTime = new Date(reminder.schedule_time);
        switch (reminder.frequency) {
            case 'once':
                return (now.getFullYear() === scheduleTime.getFullYear() &&
                    now.getMonth() === scheduleTime.getMonth() &&
                    now.getDate() === scheduleTime.getDate());
            case 'daily':
                return true;
            case 'weekly':
                return now.getDay() === scheduleTime.getDay();
            case 'monthly':
                return now.getDate() === scheduleTime.getDate();
            default:
                return false;
        }
    }
};
exports.RemindersService = RemindersService;
exports.RemindersService = RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [neon_http_1.NeonHttpDatabase,
        ai_service_1.AiService])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map