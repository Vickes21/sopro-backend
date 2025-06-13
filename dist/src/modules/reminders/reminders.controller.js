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
var RemindersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemindersController = void 0;
const common_1 = require("@nestjs/common");
const reminders_service_1 = require("./reminders.service");
const zod_validation_pipe_1 = require("../../shared/pipes/zod-validation/zod-validation.pipe");
const create_reminder_dto_1 = require("./dto/create-reminder.dto");
const update_reminder_dto_1 = require("./dto/update-reminder.dto");
const schedule_1 = require("@nestjs/schedule");
let RemindersController = RemindersController_1 = class RemindersController {
    constructor(remindersService) {
        this.remindersService = remindersService;
        this.logger = new common_1.Logger(RemindersController_1.name);
    }
    create(userId, createReminderDto) {
        return this.remindersService.create(+userId, createReminderDto);
    }
    findAll(userId) {
        return this.remindersService.findAll(+userId);
    }
    findOne(userId, id) {
        return this.remindersService.findOne(+userId, +id);
    }
    update(userId, id, updateReminderDto) {
        return this.remindersService.update(+userId, +id, updateReminderDto);
    }
    remove(userId, id) {
        return this.remindersService.remove(+userId, +id);
    }
    async handleReminders() {
        this.logger.debug('Cron job executed');
        return await this.remindersService.send();
    }
};
exports.RemindersController = RemindersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_reminder_dto_1.createReminderSchema)),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RemindersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RemindersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RemindersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(update_reminder_dto_1.updateReminderSchema)),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], RemindersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RemindersController.prototype, "remove", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemindersController.prototype, "handleReminders", null);
exports.RemindersController = RemindersController = RemindersController_1 = __decorate([
    (0, common_1.Controller)('users/:userId/reminders'),
    __metadata("design:paramtypes", [reminders_service_1.RemindersService])
], RemindersController);
//# sourceMappingURL=reminders.controller.js.map