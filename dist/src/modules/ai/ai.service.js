"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const messages_1 = require("@langchain/core/messages");
const graph_1 = require("./agents/sopro/graph");
const reminder_template_1 = require("./agents/sopro/templates/reminder.template");
const prompts_1 = require("@langchain/core/prompts");
let AiService = class AiService {
    async onMessage(messages, contact) {
        const response = await graph_1.graph.invoke({
            messages: this._parseDbMessagesToLanggraphMessages(messages, contact),
        }, {
            configurable: {
                contact: {
                    id: contact.id,
                    name: contact.name,
                }
            }
        });
        const lastMessage = response.messages[response.messages.length - 1];
        return lastMessage;
    }
    async sendReminder(reminder) {
        console.log('reminder', reminder);
        const response = await this.onMessage([
            {
                content: await prompts_1.PromptTemplate.fromTemplate(reminder_template_1.REMINDER_TEMPLATE).format({
                    reminder_content: reminder.content,
                    task_name: reminder.task?.title || 'Nenhuma tarefa relacionada',
                    goal_name: reminder.goal?.title || 'Nenhum objetivo relacionado',
                }),
                role: 'system'
            }
        ], reminder.user);
        return response;
    }
    _parseDbMessagesToLanggraphMessages(messages, contact) {
        const lgMessages = [];
        for (const message of messages) {
            switch (message.role) {
                case 'human':
                    lgMessages.push(new messages_1.HumanMessage({
                        content: message.content,
                        name: contact.name.replace(/\s+/g, '_').toLowerCase(),
                    }));
                    break;
                case 'ai':
                    lgMessages.push(new messages_1.AIMessage({
                        content: message.content,
                        name: 'sopro',
                    }));
                    break;
                case 'system':
                    lgMessages.push(new messages_1.SystemMessage({
                        content: message.content,
                    }));
                    break;
            }
        }
        return lgMessages;
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map