import { Injectable, ForbiddenException } from '@nestjs/common';
import { metaWebhookBaseSchema, metaWebhookVerificationSchema, TMetaWebhookBase } from 'src/modules/webhook/schemas/meta-webhook.schema';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { WhatsappService } from 'src/modules/whatsapp/whatsapp.service';

@Injectable()
export class WebhookService {
  constructor(private configService: ConfigService, private _whatsappService: WhatsappService) {}

  metaVerifyWebhook(request: Request) {
    try {
      const query = request.query;

      const validated = metaWebhookVerificationSchema.parse(query);

      const { "hub.challenge": challenge, "hub.mode": mode, "hub.verify_token": verify_token } = validated;

      if (mode !== 'subscribe' || verify_token !== this.configService.get<string>('META_WEBHOOK_VERIFY_TOKEN')) {
        throw new ForbiddenException('Invalid verification token or mode');
      }

      return parseInt(challenge);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new ForbiddenException('Invalid webhook verification request');
    }
  }

  metaProcessWebhook(request: Request) {
    const payload = request.body;

    console.log("MetaService processWebhook", payload);    

    const validated = metaWebhookBaseSchema.parse(payload);

    return this.processWebhookEvent(validated);
  }

    /**
     * Validate and process a Meta webhook event
     * @param payload The webhook payload to process
     * @returns Result of the processing
     */
    public async processWebhookEvent(payload: TMetaWebhookBase): Promise<{
      success: boolean;
      message: string;
      error?: any;
      statusCode?: number;
    }> {
      try {
  
        const body = payload;
  
        // Check if this is a WhatsApp Business Account event
        if (body.object === 'whatsapp_business_account') {
          console.log('PAYLOAD:', JSON.stringify(body, null, 2));
  
          return await this._whatsappService.processWhatsAppEvent(body);
        } else {
          // Handle other Meta platform events if needed
          console.log('Received non-WhatsApp Meta event:', body.object);
          return {
            success: true,
            message: 'Event received but not processed'
          };
        }
      } catch (err) {
        console.error('Error processing webhook event:', err);
        return {
          success: false,
          message: 'Error processing webhook event',
          error: err instanceof Error ? err.message : String(err),
          statusCode: 500
        };
      }
    }
}
