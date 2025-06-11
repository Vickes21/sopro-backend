import { BadRequestException, Injectable } from '@nestjs/common';
import { TCreateReminder } from './dto/create-reminder.dto';
import { TUpdateReminder } from './dto/update-reminder.dto';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/db/schemas';
import { Inject } from '@nestjs/common';
import { reminders } from 'src/db/schemas/reminders';
import { and, eq, sql } from 'drizzle-orm';
import { AiService } from 'src/modules/ai/ai.service';
import { MySql2Database } from 'drizzle-orm/mysql2';

@Injectable()
export class RemindersService {

  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: MySql2Database<typeof schema>,
    private aiService: AiService
  ) { }


  async create(userId: number, createReminderDto: TCreateReminder) {
    return await this.db.insert(reminders).values({
      ...createReminderDto,
      user_id: userId
    });
  }

  async findAll(userId: number) {
    return await this.db.select().from(reminders).where(eq(schema.reminders.user_id, userId));
  }

  async findOne(userId: number, id: number) {
    return await this.db.query.reminders.findFirst({
      where: and(eq(schema.reminders.id, id), eq(schema.reminders.user_id, userId))
    });
  }

  async update(userId: number, id: number, updateReminderDto: TUpdateReminder) {
    return await this.db.update(reminders).set(updateReminderDto).where(and(eq(schema.reminders.id, id), eq(schema.reminders.user_id, userId)));
  }

  async remove(userId: number, id: number) {
    return await this.db.delete(reminders).where(and(eq(schema.reminders.id, id), eq(schema.reminders.user_id, userId)));
  }

  async send() {
    try {
      // Get current date and time in UTC
      const now = new Date();
      
      // Extract hour and minute in UTC for matching
      const currentHourUTC = now.getUTCHours();
      const currentMinuteUTC = now.getUTCMinutes();
      
      console.log(`Checking reminders at ${now.toISOString()} (UTC: ${currentHourUTC}:${currentMinuteUTC}, Local: ${now.getHours()}:${now.getMinutes()})`);      
      
      // Find reminders that should be sent in this minute
      // Using UTC time for consistency with database
      const remindersToSend = await this.db
        .select()
        .from(reminders)
        .where(
          sql`EXTRACT(HOUR FROM CONVERT_TZ(${reminders.schedule_time}, '+00:00', '+00:00')) = ${currentHourUTC} AND EXTRACT(MINUTE FROM CONVERT_TZ(${reminders.schedule_time}, '+00:00', '+00:00')) = ${currentMinuteUTC}`
        );
      
      console.log(`Found ${remindersToSend.length} potential reminders to process in UTC time`);
      
      // Track successful sends and errors
      const results = {
        sent: 0,
        skipped: 0,
        errors: 0
      };
      
      // Process each reminder
      for (const reminder of remindersToSend) {
        try {
          // Check frequency to determine if it should be sent today
          const shouldSendToday = this.shouldSendReminderToday(reminder);
          
          if (shouldSendToday) {   
            console.log(`Sending reminder ID ${reminder.id} for user ${reminder.user_id}`);
                 
            // Get user
            const user = await this.db.query.users.findFirst({
              where: eq(schema.users.id, reminder.user_id)
            });
            
            if (!user) {
              console.error(`User ${reminder.user_id} not found for reminder ${reminder.id}`);
              results.errors++;
              continue;
            }
            
            await this.aiService.sendReminder({
              ...reminder,
              user: user
            });
            
            results.sent++;
          } else {
            console.log(`Reminder ID ${reminder.id} frequency check failed, not sending today`);
            results.skipped++;
          }
        } catch (reminderError) {
          console.error(`Error processing reminder ID ${reminder.id}:`, reminderError);
          results.errors++;
        }
      }
      
      console.log('Reminder processing complete:', results);
      return results;
    } catch (error) {
      console.error('Error in send method:', error);
      throw new BadRequestException('Failed to process reminders');
    }
  }
  
  /**
   * Checks if a reminder should be sent today based on its frequency.
   * @param reminder The reminder to check.
   * @returns True if the reminder should be sent today, false otherwise.
   */
  private shouldSendReminderToday(reminder: typeof reminders.$inferSelect): boolean {
    // Use UTC dates for consistency
    const now = new Date();
    const scheduleTime = new Date(reminder.schedule_time);
    
    switch (reminder.frequency) {
      case 'once':
        // For one-time reminders, the date must match exactly (using UTC)
        return (
          now.getUTCFullYear() === scheduleTime.getUTCFullYear() &&
          now.getUTCMonth() === scheduleTime.getUTCMonth() &&
          now.getUTCDate() === scheduleTime.getUTCDate()
        );
        
      case 'daily':
        // Daily reminders should be sent every day at the specified time
        return true;
        
      case 'weekly':
        // Weekly reminders should be sent on the same day of the week (using UTC)
        return now.getUTCDay() === scheduleTime.getUTCDay();
        
      case 'monthly':
        // Monthly reminders should be sent on the same day of the month (using UTC)
        return now.getUTCDate() === scheduleTime.getUTCDate();
        
      default:
        return false;
    }
  }
}
