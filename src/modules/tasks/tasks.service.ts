import { Inject, Injectable } from '@nestjs/common';
import { TCreateTask } from './dto/create-task.dto';
import { TUpdateTask } from './dto/update-task.dto';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import * as schema from 'src/db/schemas';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

@Injectable()
export class TasksService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NeonHttpDatabase<typeof schema>
  ) {}

  async create(createTaskDto: TCreateTask) {
    return await this.db.insert(schema.tasks).values(createTaskDto);
  }

  async findAll() {
    return await this.db.select().from(schema.tasks);
  }

  async findOne(id: number) {
    return await this.db.select().from(schema.tasks).where(eq(schema.tasks.id, id));
  }

  async update(id: number, updateTaskDto: TUpdateTask) {
    return await this.db.update(schema.tasks).set(updateTaskDto).where(eq(schema.tasks.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(schema.tasks).where(eq(schema.tasks.id, id));
  }
}
