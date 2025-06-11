import { Controller, Get, Post, Body, Param, Delete, UsePipes, Put } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { createGoalSchema, TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TGoal } from 'src/db/schemas';
import { TUpdateGoal, updateGoalSchema } from 'src/modules/goals/dto/update-goal.dto';


@Controller('users/:userId/goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createGoalSchema))
  create(@Param('userId') userId: string, @Body() createGoalDto: TCreateGoal) {
    return this.goalsService.create(+userId, createGoalDto);
  }

  @Get()
  async findAll(@Param('userId') userId: string): Promise<TGoal[]> {
    return await this.goalsService.findAll(+userId);
  }

  @Get(':id')
  async findOne(@Param('userId') userId: string, @Param('id') id: string): Promise<TGoal> {
    return this.goalsService.findOne(+userId, +id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateGoalSchema))
  update(@Param('userId') userId: string, @Param('id') id: string, @Body() updateGoalDto: TUpdateGoal) {
    return this.goalsService.update(+userId, +id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.goalsService.remove(+userId, +id);
  }
}
