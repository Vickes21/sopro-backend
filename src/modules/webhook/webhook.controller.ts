import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Request } from 'express';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get('meta')
  metaVerifyWebhook(@Req() request: Request) {
    return this.webhookService.metaVerifyWebhook(request);
  }

  @Post('meta')
  metaReceiveWebhook(@Req() request: Request) {
    return this.webhookService.metaProcessWebhook(request);
  }
}
