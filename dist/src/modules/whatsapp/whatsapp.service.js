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
var WhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_schema_1 = require("./schemas/whatsapp.schema");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const conversations_service_1 = require("../conversations/conversations.service");
const conversations_1 = require("../../db/schemas/conversations");
const messages_1 = require("../../db/schemas/messages");
const ai_service_1 = require("../ai/ai.service");
const users_service_1 = require("../users/users.service");
const utils_1 = require("../../lib/utils");
const onboarding_1 = require("../ai/onboarding");
const prompts_1 = require("@langchain/core/prompts");
const onboarding_template_1 = require("../ai/agents/sopro/templates/onboarding.template");
let WhatsappService = WhatsappService_1 = class WhatsappService {
    constructor(configService, _http, userService, _conversationsService, _aiService) {
        this.configService = configService;
        this._http = _http;
        this.userService = userService;
        this._conversationsService = _conversationsService;
        this._aiService = _aiService;
        this.logger = new common_1.Logger(WhatsappService_1.name);
        this.phoneNumberId = this.configService.get('WHATSAPP_PHONE_NUMBER_ID');
        this.accessToken = this.configService.get('WHATSAPP_TOKEN');
    }
    async _processMessage(message, waContact) {
        try {
            this.logger.log(` -- Processing message from ${waContact.profile.name} (${waContact.wa_id})`);
            const phone = (0, utils_1.phoneSerialize)(waContact.wa_id);
            let contact = await this.userService.getBy('phone', phone);
            if (!contact) {
                contact = await this.userService.upsert({
                    name: waContact.profile.name,
                    phone: phone
                });
            }
            this.logger.log(` -- Contact ${contact.id}: ${contact.name}`);
            let conversation = await this._conversationsService.getActiveConversationByContactId(contact.id, ['messages']);
            if (!conversation) {
                conversation = await this._conversationsService.create(conversations_1.conversationInsertSchema.parse({
                    contact_id: contact.id,
                    status: 'open'
                }), ['messages']);
            }
            this.logger.log(` -- Conversation ${conversation.id}: ${conversation.status}`);
            let input;
            if (message.type) {
                switch (message.type) {
                    case 'text':
                        if (message.text && message.text.body) {
                            input = await this._handleTextMessage(message.text.body, {
                                profile: {
                                    name: contact.name
                                },
                                wa_id: contact.phone
                            });
                        }
                        break;
                    default:
                        throw new Error('Unknown message type');
                }
            }
            if (!input || input.trim() === '') {
                throw new Error('No input found');
            }
            this.logger.log('Input:', input);
            const messages = [...conversation.messages, {
                    content: input,
                    role: 'human',
                }];
            let canProceed = true;
            const currentStep = onboarding_1.onboardingSteps[contact.onboarding_step];
            const nextStep = onboarding_1.onboardingSteps[contact.onboarding_step + 1];
            if (!contact.onboarding_completed) {
                messages.push({
                    content: await prompts_1.PromptTemplate.fromTemplate(onboarding_template_1.ONBOARDING_TEMPLATE).format({
                        current_step: currentStep?.instruction,
                        next_step: await prompts_1.PromptTemplate.fromTemplate(nextStep?.instruction || '').format({
                            app_url: this.configService.get('APP_URL'),
                            email: contact.email,
                            temp_password: Math.random().toString(36).slice(-8),
                        }),
                    }),
                    role: 'system'
                });
            }
            const aiResponse = await this._aiService.onMessage([
                ...messages,
            ], contact);
            this.logger.log('AI Response:', aiResponse);
            const newMessages = messages_1.messageInsertSchema.array().parse([
                {
                    content: input,
                    role: 'human',
                    conversation_id: conversation.id
                },
                {
                    content: aiResponse.content,
                    role: 'ai',
                    conversation_id: conversation.id
                }
            ]);
            await this._conversationsService.addMessages(conversation.id, newMessages);
            await this.sendMessage(contact.phone, {
                type: 'text',
                text: {
                    body: aiResponse.content,
                }
            });
            if (!contact.onboarding_completed) {
                this.logger.log('Updating onboarding step');
                this.logger.log(' - Current step:', currentStep?.instruction);
                this.logger.log(' - Next step:', nextStep?.instruction);
                if (nextStep?.condition) {
                    const updatedContact = await this.userService.getBy('id', contact.id);
                    canProceed = nextStep.condition(updatedContact);
                }
                await this.userService.update(contact.id, {
                    onboarding_completed: contact.onboarding_step >= (onboarding_1.onboardingSteps.length - 1),
                    onboarding_step: canProceed ? contact.onboarding_step + 1 : contact.onboarding_step
                });
            }
        }
        catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
    async _handleTextMessage(text, contact) {
        console.log(` -- Text message from ${contact.profile?.name}: ${text}`);
        return text;
    }
    async sendMessage(recipientPhone, messageContent) {
        if (!this.phoneNumberId || !this.accessToken) {
            throw new Error('Missing WhatsApp API credentials in environment variables');
        }
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhone,
            ...messageContent
        };
        console.log('Sending WhatsApp payload:', JSON.stringify(payload, null, 2));
        const { data } = await (0, rxjs_1.firstValueFrom)(this._http.post(`https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`, payload, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            }
        }).pipe((0, rxjs_1.catchError)((error) => {
            console.error('Error sending WhatsApp message:', error.message);
            console.log('Request error details:', error);
            if (error.request) {
                console.log('Request details:', error.request);
            }
            throw error;
        })));
        console.log('WhatsApp message sent successfully:', data);
        return data;
    }
    async processWhatsAppEvent(payload) {
        const { success, data, error } = whatsapp_schema_1.whatsappWebhookSchema.safeParse(payload);
        if (!success) {
            console.error('Invalid WhatsApp webhook payload:', error);
            return {
                success: false,
                message: 'Invalid WhatsApp webhook payload',
                error: error.format(),
                statusCode: 422
            };
        }
        try {
            for (const entry of data.entry) {
                for (const change of entry.changes) {
                    const { value } = change;
                    if (value.messages && value.messages.length > 0) {
                        for (const message of value.messages) {
                            if (value.contacts && value.contacts.length > 0) {
                                await this._processMessage(message, value.contacts[0]);
                            }
                        }
                    }
                }
            }
            return {
                success: true,
                message: 'WhatsApp message processed successfully'
            };
        }
        catch (err) {
            console.error('Error processing WhatsApp message:', err);
            return {
                success: false,
                message: 'Error processing WhatsApp message',
                error: err instanceof Error ? err.message : String(err),
                statusCode: 500
            };
        }
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService,
        users_service_1.UsersService,
        conversations_service_1.ConversationsService,
        ai_service_1.AiService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map