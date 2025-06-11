import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskSchema, TCreateTask } from './dto/create-task.dto';
import { updateTaskSchema, TUpdateTask } from './dto/update-task.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { TTask } from 'src/db/schemas';

@Controller('users/:userId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  create(@Param('userId') userId: string, @Body() createTaskDto: TCreateTask) {
    return this.tasksService.create(+userId, createTaskDto);
  }

  @Get()
  async findAll(@Param('userId') userId: string): Promise<TTask[]> {
    return this.tasksService.findAll(+userId);
  }

  @Get(':id')
  async findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return await this.tasksService.findOne(+userId, +id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateTaskSchema))
  update(@Param('userId') userId: string, @Param('id') id: string, @Body() updateTaskDto: TUpdateTask) {
    return this.tasksService.update(+userId, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.tasksService.remove(+userId, +id);
  }
}
