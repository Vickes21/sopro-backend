import { Injectable } from '@nestjs/common';
import { TMessage, TReminder, TUser } from 'src/db/schemas';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { graph } from "./agents/sopro/graph";
import { REMINDER_TEMPLATE } from 'src/modules/ai/agents/sopro/templates/reminder.template';
import { PromptTemplate } from '@langchain/core/prompts';

@Injectable()
export class AiService {

  async onMessage(messages: Partial<TMessage>[], contact: TUser) {

    const response = await graph.invoke({
      messages: this._parseDbMessagesToLanggraphMessages(messages, contact),
    }, {
      configurable: {
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email ?? undefined,
          phone: contact.phone ?? undefined,
        }
      }
    })

    const lastMessage = response.messages[response.messages.length - 1];

    return lastMessage;
  }

  async sendReminder(reminder: TReminder) {
    console.log('reminder', reminder);

    const response = await this.onMessage([
      {
        content: await PromptTemplate.fromTemplate(REMINDER_TEMPLATE).format({
          reminder_content: reminder.content,
          task_name: reminder.task?.title || 'Nenhuma tarefa relacionada',
          goal_name: reminder.goal?.title || 'Nenhum objetivo relacionado',
        }),
        role: 'system'
      }
    ], reminder.user);

    return response;
  }

  private _parseDbMessagesToLanggraphMessages(messages: Partial<TMessage>[], contact: TUser): BaseMessage[] {

    const lgMessages = []

    for (const message of messages) {
      switch (message.role) {
        case 'human':
          lgMessages.push(
            new HumanMessage({
              content: message.content,
              //name Vitor Oliveira must be converted to vitor_oliveira
              name: contact.name.replace(/\s+/g, '_').toLowerCase(),
            })
          )
          break;
        case 'ai':
          lgMessages.push(
            new AIMessage({
              content: message.content,
              name: 'sopro',
            })
          )
          break;
        case 'system':
          lgMessages.push(
            new SystemMessage({
              content: message.content,
            })
          )
          break;
      }
    }

    return lgMessages;
  }
}
