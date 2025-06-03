import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { ConversationsService } from './conversations.service';
import { MessagesModule } from 'src/modules/messages/messages.module';

@Module({
  imports: [DrizzleModule, MessagesModule],
  exports: [ConversationsService],
  providers: [ConversationsService]
})
export class ConversationsModule {}
