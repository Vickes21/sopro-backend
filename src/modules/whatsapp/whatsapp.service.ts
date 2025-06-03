import { BadRequestException, Injectable } from '@nestjs/common';
import { TWhatsAppApiResponse, TWhatsAppContact, TWhatsappMessage, TWhatsAppMessageContent, whatsappWebhookSchema } from 'src/modules/whatsapp/schemas/whatsapp.schema';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConversationsService } from 'src/modules/conversations/conversations.service';
import { conversationInsertSchema } from 'src/db/schemas/conversations';
import { messageInsertSchema, TMessage, TMessageInsert } from 'src/db/schemas/messages';
import { AiService } from 'src/modules/ai/ai.service';
import { UsersService } from 'src/modules/users/users.service';
import { phoneSerialize } from 'src/lib/utils';

@Injectable()
export class WhatsappService {

  private phoneNumberId: string | undefined;
  private accessToken: string | undefined;

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
      console.log(` -- Processing message from ${waContact.profile.name} (${waContact.wa_id})`);

      const phone = phoneSerialize(waContact.wa_id);
      
      let contact = await this.userService.getBy('phone', phone);

      if (!contact) {
        throw new BadRequestException({
          message: `Usuário não encontrado para o telefone ${phone}`
        });
      }

      console.log(` -- Contact ${contact.id}: ${contact.name}`);

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

      console.log(` -- Conversation ${conversation.id}: ${conversation.status}`);

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
      console.log('Input:', input);

      const aiResponse = await this._aiService.onMessage([
        ...conversation.messages,
        {
          content: input,
          role: 'human',
        }
      ], contact);

      console.log('AI Response:', aiResponse);

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
