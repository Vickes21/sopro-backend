import { TMetaWebhookBase } from 'src/modules/webhook/schemas/meta-webhook.schema';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { WhatsappService } from 'src/modules/whatsapp/whatsapp.service';
export declare class WebhookService {
    private configService;
    private _whatsappService;
    constructor(configService: ConfigService, _whatsappService: WhatsappService);
    metaVerifyWebhook(request: Request): number;
    metaProcessWebhook(request: Request): Promise<{
        success: boolean;
        message: string;
        error?: any;
        statusCode?: number;
    }>;
    processWebhookEvent(payload: TMetaWebhookBase): Promise<{
        success: boolean;
        message: string;
        error?: any;
        statusCode?: number;
    }>;
}
