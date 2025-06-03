import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { HttpModule } from '@nestjs/axios';
import { ConversationsModule } from 'src/modules/conversations/conversations.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AiModule } from 'src/modules/ai/ai.module';

@Module({
  providers: [WhatsappService],
  imports: [HttpModule, UsersModule, ConversationsModule, AiModule],
  exports: [WhatsappService]
})
export class WhatsappModule {}
