import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Logger, Put } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { createReminderSchema, TCreateReminder } from 'src/modules/reminders/dto/create-reminder.dto';
import { TUpdateReminder, updateReminderSchema } from 'src/modules/reminders/dto/update-reminder.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('users/:userId/reminders')
export class RemindersController {
  private readonly logger = new Logger(RemindersController.name);

  constructor(private readonly remindersService: RemindersService) {}


  @Post()
  @UsePipes(new ZodValidationPipe(createReminderSchema))
  create(@Param('userId') userId: string, @Body() createReminderDto: TCreateReminder) {
    return this.remindersService.create(+userId, createReminderDto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.remindersService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.remindersService.findOne(+userId, +id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateReminderSchema))
  update(@Param('userId') userId: string, @Param('id') id: string, @Body() updateReminderDto: TUpdateReminder) {
    return this.remindersService.update(+userId, +id, updateReminderDto);
  }

  @Delete(':id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.remindersService.remove(+userId, +id);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleReminders() {
    this.logger.debug('Cron job executed');
    return await this.remindersService.send();
  }
}
