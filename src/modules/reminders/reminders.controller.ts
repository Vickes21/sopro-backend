import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Logger } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { createReminderSchema, TCreateReminder } from 'src/modules/reminders/dto/create-reminder.dto';
import { TUpdateReminder, updateReminderSchema } from 'src/modules/reminders/dto/update-reminder.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('reminders')
export class RemindersController {
  private readonly logger = new Logger(RemindersController.name);

  constructor(private readonly remindersService: RemindersService) {}


  @Post()
  @UsePipes(new ZodValidationPipe(createReminderSchema))
  create(@Body() createReminderDto: TCreateReminder) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  findAll() {
    return this.remindersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remindersService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateReminderSchema))
  update(@Param('id') id: string, @Body() updateReminderDto: TUpdateReminder) {
    return this.remindersService.update(+id, updateReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remindersService.remove(+id);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleReminders() {
    this.logger.debug('Cron job executed');
    return this.remindersService.send();
  }
}
