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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReminder = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let WhatsappHelperService = class WhatsappHelperService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.phoneNumberId = this.configService.get('WHATSAPP_PHONE_NUMBER_ID');
        this.accessToken = this.configService.get('WHATSAPP_TOKEN');
    }
    async sendMessage(recipientPhone, message) {
        if (!this.phoneNumberId || !this.accessToken) {
            throw new Error('Missing WhatsApp API credentials in environment variables');
        }
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhone,
            type: 'text',
            text: { body: message }
        };
        console.log('Sending WhatsApp payload:', JSON.stringify(payload, null, 2));
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`, payload, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                }
            }).pipe((0, rxjs_1.catchError)((error) => {
                console.error('Error sending WhatsApp message:', error.message);
                throw error;
            })));
            console.log('WhatsApp message sent successfully:', data);
            return data;
        }
        catch (error) {
            console.error('Failed to send WhatsApp message:', error);
            throw error;
        }
    }
};
WhatsappHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], WhatsappHelperService);
const createWhatsappHelper = () => {
    const configService = new config_1.ConfigService();
    const httpService = new axios_1.HttpService();
    return new WhatsappHelperService(configService, httpService);
};
exports.sendReminder = (0, tools_1.tool)(async ({ content }, { configurable }) => {
    const userPhone = configurable.contact.phone;
    if (!userPhone) {
        throw new Error("Número de telefone do usuário não encontrado");
    }
    try {
        const whatsappHelper = createWhatsappHelper();
        const messageBody = `🔔 *LEMBRETE:* \n\n${content}`;
        await whatsappHelper.sendMessage(userPhone, messageBody);
        return {
            message: "Lembrete enviado com sucesso via WhatsApp",
        };
    }
    catch (error) {
        console.error("Erro ao enviar lembrete via WhatsApp:", error);
        throw new Error(`Falha ao enviar lembrete via WhatsApp: ${error.message || error}`);
    }
}, {
    name: 'send_reminder',
    description: 'Envia um lembrete, gerando o conteúdo de forma personalizada e motivacional',
    schema: zod_1.default.object({
        content: zod_1.default.string().describe("Conteúdo do lembrete, personalizado e motivacional para o usuário"),
    })
});
//# sourceMappingURL=send-reminder.tool.js.map