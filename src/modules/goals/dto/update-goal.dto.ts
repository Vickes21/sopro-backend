import { z } from "zod/v4";

export const updateGoalSchema = z.object({
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  category: z.enum(['personal', 'professional']).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'abandoned']).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
})

export type TUpdateGoal = z.infer<typeof updateGoalSchema>



