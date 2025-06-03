import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WhatsappModule } from 'src/modules/whatsapp/whatsapp.module';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService],
  imports: [WhatsappModule]
})
export class WebhookModule {}
