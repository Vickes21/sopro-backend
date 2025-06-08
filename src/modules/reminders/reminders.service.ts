import { BadRequestException, Injectable } from '@nestjs/common';
import { TCreateReminder } from './dto/create-reminder.dto';
import { TUpdateReminder } from './dto/update-reminder.dto';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/db/schemas';
import { Inject } from '@nestjs/common';
import { reminders } from 'src/db/schemas/reminders';
import { eq, sql } from 'drizzle-orm';
import { AiService } from 'src/modules/ai/ai.service';

@Injectable()
export class RemindersService {

  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NeonHttpDatabase<typeof schema>,
    private aiService: AiService
  ) { }


  async create(createReminderDto: TCreateReminder) {
    return await this.db.insert(reminders).values(createReminderDto);
  }

  async findAll() {
    return await this.db.select().from(reminders);
  }

  async findOne(id: number) {
    return await this.db.select().from(reminders).where(eq(schema.reminders.id, id));
  }

  async update(id: number, updateReminderDto: TUpdateReminder) {
    return await this.db.update(reminders).set(updateReminderDto).where(eq(schema.reminders.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(reminders).where(eq(schema.reminders.id, id));
  }

  async send() {
    // Get current date and time
    const now = new Date();
    
    // Extract hour and minute for matching
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Find reminders that should be sent in this minute
    const remindersToSend = await this.db
      .select()
      .from(reminders)
      .where(
        // Filter by schedule_time
        // For daily/weekly/monthly reminders, we need to match the hour and minute
        // regardless of the date
        sql`HOUR(${reminders.schedule_time}) = ${currentHour} AND MINUTE(${reminders.schedule_time}) = ${currentMinute}`
      );
    
    // Process each reminder
    for (const reminder of remindersToSend) {
      // Check frequency to determine if it should be sent today
      const shouldSendToday = this.shouldSendReminderToday(reminder);
      
      if (shouldSendToday) {        
        //get user
        const user = await this.db.select().from(schema.users).where(eq(schema.users.id, reminder.user_id));
        await this.aiService.sendReminder({
          ...reminder,
          user: user[0]
        });
      }
    }
    
    return { sent: remindersToSend.length };
  }
  
  private shouldSendReminderToday(reminder: typeof reminders.$inferSelect): boolean {
    const now = new Date();
    const scheduleTime = new Date(reminder.schedule_time);
    
    switch (reminder.frequency) {
      case 'once':
        // For one-time reminders, the date must match exactly
        return (
          now.getFullYear() === scheduleTime.getFullYear() &&
          now.getMonth() === scheduleTime.getMonth() &&
          now.getDate() === scheduleTime.getDate()
        );
        
      case 'daily':
        // Daily reminders should be sent every day at the specified time
        return true;
        
      case 'weekly':
        // Weekly reminders should be sent on the same day of the week
        return now.getDay() === scheduleTime.getDay();
        
      case 'monthly':
        // Monthly reminders should be sent on the same day of the month
        return now.getDate() === scheduleTime.getDate();
        
      default:
        return false;
    }
  }
}
