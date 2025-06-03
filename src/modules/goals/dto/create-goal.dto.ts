import { z } from "zod/v4";

export const createGoalSchema = z.object({
  user_id: z.number(),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  category: z.enum(['personal', 'professional']),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'abandoned']),
  priority: z.enum(['high', 'medium', 'low']),
  start_date: z.date(),
  end_date: z.date(),
})

export type TCreateGoal = z.infer<typeof createGoalSchema>
  