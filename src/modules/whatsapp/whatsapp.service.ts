import { Injectable, Logger } from '@nestjs/common';
import { TWhatsAppApiResponse, TWhatsAppContact, TWhatsappMessage, TWhatsAppMessageContent, whatsappWebhookSchema } from 'src/modules/whatsapp/schemas/whatsapp.schema';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConversationsService } from 'src/modules/conversations/conversations.service';
import { conversationInsertSchema } from 'src/db/schemas/conversations';
import { messageInsertSchema, TMessage } from 'src/db/schemas/messages';
import { AiService } from 'src/modules/ai/ai.service';
import { UsersService } from 'src/modules/users/users.service';
import { phoneSerialize } from 'src/lib/utils';
import { onboardingSteps, TOnboardingStep } from 'src/modules/ai/onboarding';
import { PromptTemplate } from '@langchain/core/prompts';
import { ONBOARDING_TEMPLATE } from 'src/modules/ai/agents/sopro/templates/onboarding.template';

@Injectable()
export class WhatsappService {

  private phoneNumberId: string | undefined;
  private accessToken: string | undefined;
  private logger = new Logger(WhatsappService.name);

  constructor(
    private configService: ConfigService,
    private _http: HttpService,
    private userService: UsersService,
    private _conversationsService: ConversationsService,
    private _aiService: AiService
  ) {
    this.phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    this.accessToken = this.configService.get<string>('WHATSAPP_TOKEN');
  }

  /**
  * Process a WhatsApp message based on its type
  * @param message The WhatsApp message to process
  * @param waContact The contact who sent the message
  */
  private async _processMessage(message: TWhatsappMessage, waContact: TWhatsAppContact) {
    try {
      this.logger.log(` -- Processing message from ${waContact.profile.name} (${waContact.wa_id})`);

      const phone = phoneSerialize(waContact.wa_id);

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
        conversation = await this._conversationsService.create(
          conversationInsertSchema.parse({
            contact_id: contact.id,
            status: 'open'
          }),
          ['messages']
        );
      }

      this.logger.log(` -- Conversation ${conversation.id}: ${conversation.status}`);

      let input: string | undefined;

      // Process the message based on its type
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

      //USAR O INPUT AQUI:
      this.logger.log('Input:', input);

      const messages: Partial<TMessage>[] = [...conversation.messages, {
        content: input,
        role: 'human',
      }];

      let canProceed = true;
      const currentStep: TOnboardingStep | undefined = onboardingSteps[contact.onboarding_step];

      const nextStep: TOnboardingStep | undefined = onboardingSteps[contact.onboarding_step + 1];

      if (!contact.onboarding_completed) {
        messages.push({
          content: await PromptTemplate.fromTemplate(ONBOARDING_TEMPLATE).format({
            current_step: currentStep?.instruction,
            next_step: await PromptTemplate.fromTemplate(nextStep?.instruction || '').format({
              app_url: this.configService.get<string>('APP_URL'),
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

      const newMessages = messageInsertSchema.array().parse([
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

      // save input and ai response to conversation
      await this._conversationsService.addMessages(conversation.id, newMessages);

      //send ai response to contact
      await this.sendMessage(contact.phone, {
        type: 'text',
        text: {
          body: aiResponse.content as string,
          // body: `Voce disse: ${input}`
        }
      });

      if (!contact.onboarding_completed) {
        this.logger.log('Updating onboarding step');
        this.logger.log(' - Current step:', currentStep?.instruction);
        this.logger.log(' - Next step:', nextStep?.instruction);

        //verifica novamente a condição
        if (nextStep?.condition) {
          const updatedContact = await this.userService.getBy('id', contact.id);
          canProceed = nextStep.condition(updatedContact);
        }

        await this.userService.update(contact.id, {
          onboarding_completed: contact.onboarding_step >= (onboardingSteps.length - 1),
          onboarding_step: canProceed ? contact.onboarding_step + 1 : contact.onboarding_step
        });
      }

      // return aiResponse;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }

  /**
  * Handle text messages
  * Função mantida apenas caso seja necessario um tratamento especial futuramente
  */
  private async _handleTextMessage(text: string, contact: TWhatsAppContact): Promise<string> {
    console.log(` -- Text message from ${contact.profile?.name}: ${text}`);

    return text;
  }

  /**
   * Send a message via WhatsApp Business API
   * @param recipientPhone The recipient's phone number with country code (e.g., "551199999999")
   * @param messageContent The message content to send
   * @returns Promise with the API response
   */
  private async sendMessage(
    recipientPhone: string,
    messageContent: TWhatsAppMessageContent
  ): Promise<TWhatsAppApiResponse> {
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

    const { data } = await firstValueFrom(
      this._http.post<TWhatsAppApiResponse>(`https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`, payload, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        }
      }).pipe(
        catchError((error) => {
          console.error('Error sending WhatsApp message:', error.message);
          console.log('Request error details:', error);

          // Try to log the request payload if available
          if (error.request) {
            console.log('Request details:', error.request);
          }

          throw error;
        })
      )
    );

    console.log('WhatsApp message sent successfully:', data);
    return data;
  }

  /**
   * Process a WhatsApp webhook event
   * @param payload The WhatsApp webhook payload
   * @returns Result of the processing
   */
  public async processWhatsAppEvent(payload: any): Promise<{
    success: boolean;
    message: string;
    error?: any;
    statusCode?: number;
  }> {
    // Validate the payload using the WhatsApp schema
    const { success, data, error } = whatsappWebhookSchema.safeParse(payload);

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
      // Process each entry and its messages
      for (const entry of data.entry) {
        for (const change of entry.changes) {
          const { value } = change;

          // Process each message in the webhook
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
    } catch (err) {
      console.error('Error processing WhatsApp message:', err);
      return {
        success: false,
        message: 'Error processing WhatsApp message',
        error: err instanceof Error ? err.message : String(err),
        statusCode: 500
      };
    }
  }
}
