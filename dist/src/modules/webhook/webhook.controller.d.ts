import { WebhookService } from './webhook.service';
import { Request } from 'express';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    metaVerifyWebhook(request: Request): number;
    metaReceiveWebhook(request: Request): Promise<{
        success: boolean;
        message: string;
        error?: any;
        statusCode?: number;
    }>;
}
