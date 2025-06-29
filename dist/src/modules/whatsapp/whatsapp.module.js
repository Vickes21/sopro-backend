"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappModule = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp.service");
const axios_1 = require("@nestjs/axios");
const conversations_module_1 = require("../conversations/conversations.module");
const users_module_1 = require("../users/users.module");
const ai_module_1 = require("../ai/ai.module");
let WhatsappModule = class WhatsappModule {
};
exports.WhatsappModule = WhatsappModule;
exports.WhatsappModule = WhatsappModule = __decorate([
    (0, common_1.Module)({
        providers: [whatsapp_service_1.WhatsappService],
        imports: [axios_1.HttpModule, users_module_1.UsersModule, conversations_module_1.ConversationsModule, ai_module_1.AiModule],
        exports: [whatsapp_service_1.WhatsappService]
    })
], WhatsappModule);
//# sourceMappingURL=whatsapp.module.js.map