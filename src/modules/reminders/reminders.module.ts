import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { DrizzleModule } from 'src/db/drizzle.module';
import { AiModule } from 'src/modules/ai/ai.module';

@Module({
  imports: [DrizzleModule, AiModule],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}
