import { Inject, Injectable } from '@nestjs/common';
import { TCreateTask } from './dto/create-task.dto';
import { TUpdateTask } from './dto/update-task.dto';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import * as schema from 'src/db/schemas';
import { and, eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { MySql2Database } from 'drizzle-orm/mysql2';

@Injectable()
export class TasksService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: MySql2Database<typeof schema>
  ) {}

  async create(userId: number, createTaskDto: TCreateTask) {
    return await this.db.insert(schema.tasks).values({
      ...createTaskDto,
      user_id: userId
    });
  }

  async findAll(userId: number) {
    return await this.db.select().from(schema.tasks).where(eq(schema.tasks.user_id, userId));
  }

  async findOne(userId: number, id: number) {
    return await this.db.query.tasks.findFirst({
      where: and(eq(schema.tasks.id, id), eq(schema.tasks.user_id, userId))
    });
  }

  async update(userId: number, id: number, updateTaskDto: TUpdateTask) {
    return await this.db.update(schema.tasks).set(updateTaskDto).where(and(eq(schema.tasks.id, id), eq(schema.tasks.user_id, userId)));
  }

  async remove(userId: number, id: number) {
    return await this.db.delete(schema.tasks).where(and(eq(schema.tasks.id, id), eq(schema.tasks.user_id, userId)));
  }
}
