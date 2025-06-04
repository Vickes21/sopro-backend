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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const meta_webhook_schema_1 = require("./schemas/meta-webhook.schema");
const config_1 = require("@nestjs/config");
const whatsapp_service_1 = require("../whatsapp/whatsapp.service");
let WebhookService = class WebhookService {
    constructor(configService, _whatsappService) {
        this.configService = configService;
        this._whatsappService = _whatsappService;
    }
    metaVerifyWebhook(request) {
        try {
            const query = request.query;
            const validated = meta_webhook_schema_1.metaWebhookVerificationSchema.parse(query);
            const { "hub.challenge": challenge, "hub.mode": mode, "hub.verify_token": verify_token } = validated;
            if (mode !== 'subscribe' || verify_token !== this.configService.get('META_WEBHOOK_VERIFY_TOKEN')) {
                throw new common_1.ForbiddenException('Invalid verification token or mode');
            }
            return parseInt(challenge);
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.ForbiddenException('Invalid webhook verification request');
        }
    }
    metaProcessWebhook(request) {
        const payload = request.body;
        console.log("MetaService processWebhook", payload);
        const validated = meta_webhook_schema_1.metaWebhookBaseSchema.parse(payload);
        return this.processWebhookEvent(validated);
    }
    async processWebhookEvent(payload) {
        try {
            const body = payload;
            if (body.object === 'whatsapp_business_account') {
                return await this._whatsappService.processWhatsAppEvent(body);
            }
            else {
                console.log('Received non-WhatsApp Meta event:', body.object);
                return {
                    success: true,
                    message: 'Event received but not processed'
                };
            }
        }
        catch (err) {
            console.error('Error processing webhook event:', err);
            return {
                success: false,
                message: 'Error processing webhook event',
                error: err instanceof Error ? err.message : String(err),
                statusCode: 500
            };
        }
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, whatsapp_service_1.WhatsappService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map