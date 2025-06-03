import { z } from "zod/v4";

export const createTaskSchema = z.object({
  user_id: z.number(),
  goal_id: z.number().optional(),
  title: z.string(),
  due_date: z.date().optional(),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
});

export type TCreateTask = z.infer<typeof createTaskSchema>;

  