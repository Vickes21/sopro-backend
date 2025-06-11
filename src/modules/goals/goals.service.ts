import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/db/schemas';
import { and, eq } from 'drizzle-orm';
import { TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TUpdateGoal } from 'src/modules/goals/dto/update-goal.dto';
import { MySql2Database } from 'drizzle-orm/mysql2';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: MySql2Database<typeof schema>
  ) {}

  async create(userId: number, createGoalDto: TCreateGoal) {
    const inserted = await this.db.insert(schema.goals).values({
      ...createGoalDto,
      user_id: userId
    }).$returningId();
    const goal = await this.findOne(userId, inserted[0].id);
    return goal;
  }

  async findAll(userId: number) {
    return await this.db.query.goals.findMany({
      where: eq(schema.goals.user_id, userId),
      with: {
        user: true,
        tasks: true
      }
    });
  }

  async findOne(userId: number, id: number) {
    return await this.db.query.goals.findFirst({
      where: and(eq(schema.goals.id, id), eq(schema.goals.user_id, userId)),
      with: {
        user: true,
        tasks: true
      }
    });
  }

  async update(userId: number, id: number, updateGoalDto: TUpdateGoal) {
    return await this.db.update(schema.goals).set(updateGoalDto).where(and(eq(schema.goals.id, id), eq(schema.goals.user_id, userId)));
  }

  async remove(userId: number, id: number) {
    return await this.db.delete(schema.goals).where(and(eq(schema.goals.id, id), eq(schema.goals.user_id, userId)));
  }
}
