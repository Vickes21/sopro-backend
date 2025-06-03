import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, UsePipes } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { createGoalSchema, TCreateGoal } from 'src/modules/goals/dto/create-goal.dto';
import { TGoal } from 'src/db/schemas';
import { TUpdateGoal, updateGoalSchema } from 'src/modules/goals/dto/update-goal.dto';


@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createGoalSchema))
  create(@Body() createGoalDto: TCreateGoal) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  async findAll(): Promise<TGoal[]> {
    return await this.goalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TGoal> {
    return this.goalsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateGoalSchema))
  update(@Param('id') id: string, @Body() updateGoalDto: TUpdateGoal) {
    return this.goalsService.update(+id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove(+id);
  }
}
