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
const schema = require("../../db/schemas");
const common_2 = require("@nestjs/common");
const reminders_1 = require("../../db/schemas/reminders");
const drizzle_orm_1 = require("drizzle-orm");
const ai_service_1 = require("../ai/ai.service");
const mysql2_1 = require("drizzle-orm/mysql2");
let RemindersService = class RemindersService {
    constructor(db, aiService) {
        this.db = db;
        this.aiService = aiService;
    }
    async create(userId, createReminderDto) {
        return await this.db.insert(reminders_1.reminders).values({
            ...createReminderDto,
            user_id: userId
        });
    }
    async findAll(userId) {
        return await this.db.select().from(reminders_1.reminders).where((0, drizzle_orm_1.eq)(schema.reminders.user_id, userId));
    }
    async findOne(userId, id) {
        return await this.db.query.reminders.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.reminders.id, id), (0, drizzle_orm_1.eq)(schema.reminders.user_id, userId))
        });
    }
    async update(userId, id, updateReminderDto) {
        return await this.db.update(reminders_1.reminders).set(updateReminderDto).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.reminders.id, id), (0, drizzle_orm_1.eq)(schema.reminders.user_id, userId)));
    }
    async remove(userId, id) {
        return await this.db.delete(reminders_1.reminders).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.reminders.id, id), (0, drizzle_orm_1.eq)(schema.reminders.user_id, userId)));
    }
    async send() {
        try {
            const now = new Date();
            const currentHourUTC = now.getUTCHours();
            const currentMinuteUTC = now.getUTCMinutes();
            console.log(`Checking reminders at ${now.toISOString()} (UTC: ${currentHourUTC}:${currentMinuteUTC}, Local: ${now.getHours()}:${now.getMinutes()})`);
            const remindersToSend = await this.db
                .select()
                .from(reminders_1.reminders)
                .where((0, drizzle_orm_1.sql) `EXTRACT(HOUR FROM CONVERT_TZ(${reminders_1.reminders.schedule_time}, '+00:00', '+00:00')) = ${currentHourUTC} AND EXTRACT(MINUTE FROM CONVERT_TZ(${reminders_1.reminders.schedule_time}, '+00:00', '+00:00')) = ${currentMinuteUTC}`);
            console.log(`Found ${remindersToSend.length} potential reminders to process in UTC time`);
            const results = {
                sent: 0,
                skipped: 0,
                errors: 0
            };
            for (const reminder of remindersToSend) {
                try {
                    const shouldSendToday = this.shouldSendReminderToday(reminder);
                    if (shouldSendToday) {
                        console.log(`Sending reminder ID ${reminder.id} for user ${reminder.user_id}`);
                        const user = await this.db.query.users.findFirst({
                            where: (0, drizzle_orm_1.eq)(schema.users.id, reminder.user_id)
                        });
                        if (!user) {
                            console.error(`User ${reminder.user_id} not found for reminder ${reminder.id}`);
                            results.errors++;
                            continue;
                        }
                        await this.aiService.sendReminder({
                            ...reminder,
                            user: user
                        });
                        results.sent++;
                    }
                    else {
                        console.log(`Reminder ID ${reminder.id} frequency check failed, not sending today`);
                        results.skipped++;
                    }
                }
                catch (reminderError) {
                    console.error(`Error processing reminder ID ${reminder.id}:`, reminderError);
                    results.errors++;
                }
            }
            console.log('Reminder processing complete:', results);
            return results;
        }
        catch (error) {
            console.error('Error in send method:', error);
            throw new common_1.BadRequestException('Failed to process reminders');
        }
    }
    shouldSendReminderToday(reminder) {
        const now = new Date();
        const scheduleTime = new Date(reminder.schedule_time);
        switch (reminder.frequency) {
            case 'once':
                return (now.getUTCFullYear() === scheduleTime.getUTCFullYear() &&
                    now.getUTCMonth() === scheduleTime.getUTCMonth() &&
                    now.getUTCDate() === scheduleTime.getUTCDate());
            case 'daily':
                return true;
            case 'weekly':
                return now.getUTCDay() === scheduleTime.getUTCDay();
            case 'monthly':
                return now.getUTCDate() === scheduleTime.getUTCDate();
            default:
                return false;
        }
    }
};
exports.RemindersService = RemindersService;
exports.RemindersService = RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [mysql2_1.MySql2Database,
        ai_service_1.AiService])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map