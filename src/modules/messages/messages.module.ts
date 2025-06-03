import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { DrizzleModule } from 'src/db/drizzle.module';

@Module({
  providers: [MessagesService],
  imports: [DrizzleModule],
  exports: [MessagesService]
})
export class MessagesModule {}
