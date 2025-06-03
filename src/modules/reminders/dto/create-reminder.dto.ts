import { z } from "zod/v4";

export const createReminderSchema = z.object({
  user_id: z.number(),
  content: z.string(),
  schedule_time: z.date(),
  frequency: z.enum(['once', 'daily', 'weekly', 'monthly']),
  task_id: z.number().optional(),
  goal_id: z.number().optional(),
});

export type TCreateReminder = z.infer<typeof createReminderSchema>;
