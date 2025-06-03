import { z } from "zod/v4";

export const updateReminderSchema = z.object({
  content: z.string().optional(),
  schedule_time: z.date().optional(),
  frequency: z.enum(['once', 'daily', 'weekly', 'monthly']).optional(),
  task_id: z.number().optional(),
  goal_id: z.number().optional(),
});

export type TUpdateReminder = z.infer<typeof updateReminderSchema>;


