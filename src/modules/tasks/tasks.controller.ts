import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskSchema, TCreateTask } from './dto/create-task.dto';
import { updateTaskSchema, TUpdateTask } from './dto/update-task.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { TTask } from 'src/db/schemas';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  create(@Body() createTaskDto: TCreateTask) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<TTask[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateTaskSchema))
  update(@Param('id') id: string, @Body() updateTaskDto: TUpdateTask) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
