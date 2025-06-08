"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const goals_module_1 = require("./modules/goals/goals.module");
const webhook_module_1 = require("./modules/webhook/webhook.module");
const whatsapp_module_1 = require("./modules/whatsapp/whatsapp.module");
const conversations_module_1 = require("./modules/conversations/conversations.module");
const messages_module_1 = require("./modules/messages/messages.module");
const ai_module_1 = require("./modules/ai/ai.module");
const drizzle_module_1 = require("./db/drizzle.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const axios_1 = require("@nestjs/axios");
const reminders_module_1 = require("./modules/reminders/reminders.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            tasks_module_1.TasksModule,
            goals_module_1.GoalsModule,
            webhook_module_1.WebhookModule,
            whatsapp_module_1.WhatsappModule,
            conversations_module_1.ConversationsModule,
            messages_module_1.MessagesModule,
            ai_module_1.AiModule,
            users_module_1.UsersModule,
            drizzle_module_1.DrizzleModule,
            auth_module_1.AuthModule,
            axios_1.HttpModule,
            reminders_module_1.RemindersModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map