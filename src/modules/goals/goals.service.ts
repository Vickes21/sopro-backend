import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/db/schemas';
import { eq } from 'drizzle-orm';
import { TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TUpdateGoal } from 'src/modules/goals/dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NeonHttpDatabase<typeof schema>
  ) {}

  async create(createGoalDto: TCreateGoal) {
    const inserted = await this.db.insert(schema.goals).values(createGoalDto).returning();
    return inserted[0];
  }

  async findAll() {
    return await this.db.query.goals.findMany({
      with: {
        user: true,
        tasks: true
      }
    });
  }

  async findOne(id: number) {
    return await this.db.query.goals.findFirst({
      where: eq(schema.goals.id, id),
      with: {
        user: true,
        tasks: true
      }
    });
  }

  async update(id: number, updateGoalDto: TUpdateGoal) {
    return await this.db.update(schema.goals).set(updateGoalDto).where(eq(schema.goals.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(schema.goals).where(eq(schema.goals.id, id));
  }
}
