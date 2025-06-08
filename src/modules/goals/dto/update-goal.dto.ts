import { z } from "zod/v4";

export const updateGoalSchema = z.object({
  user_id: z.number().optional(),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  category: z.enum(['personal', 'professional']).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'abandoned']).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})

export type TUpdateGoal = z.infer<typeof updateGoalSchema>



