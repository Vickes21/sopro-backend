import { z } from "zod/v4";

export const updateTaskSchema = z.object({
  goal_id: z.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  due_date: z.date().optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional(),
});

export type TUpdateTask = z.infer<typeof updateTaskSchema>;
