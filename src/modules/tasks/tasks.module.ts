import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { drizzleProvider } from 'src/db/drizzle.provider';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ...drizzleProvider],
})
export class TasksModule {}
