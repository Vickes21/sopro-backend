import { tool } from "@langchain/core/tools";
import z from "zod";
import { createStandaloneDb } from "src/db/standalone";
import { eq } from "drizzle-orm";
import { goals, TGoal } from "src/db/schemas/goals";

export const updateGoal = tool(async ({ id, title, description, category, period, priority, status }) => {
  if (category && !['personal', 'professional'].includes(category)) {
    throw new Error("Category must be 'personal' or 'professional'");
  }

  if (period && !['daily', 'weekly', 'monthly', 'yearly'].includes(period)) {
    throw new Error("Period must be 'daily', 'weekly', 'monthly' or 'yearly'");
  }

  if (priority && !['high', 'medium', 'low'].includes(priority)) {
    throw new Error("Priority must be 'high', 'medium' or 'low'");
  }

  const db = createStandaloneDb();

  // Check if goal exists
  const existingGoal = await db.query.goals.findFirst({
    where: eq(goals.id, id)
  });

  if (!existingGoal) {
    throw new Error(`Goal with id ${id} not found`);
  }

  const updateValues: Partial<TGoal> = {};
  
  if (title) updateValues.title = title;
  if (description !== undefined) updateValues.description = description;
  if (category) updateValues.category = category as 'personal' | 'professional';
  if (period) updateValues.period = period as 'daily' | 'weekly' | 'monthly' | 'yearly';
  if (priority) updateValues.priority = priority as 'high' | 'medium' | 'low';
  if (status) updateValues.status = status as 'not_started' | 'in_progress' | 'completed' | 'abandoned';

  // If period is changed, recalculate end_date
  if (period && existingGoal.period !== period) {
    const startDate = new Date(existingGoal.start_date);
    let endDate = new Date(startDate);
    
    switch (period) {
      case 'daily':
        endDate.setDate(startDate.getDate() + 1);
        break;
      case 'weekly':
        endDate.setDate(startDate.getDate() + 7);
        break;
      case 'monthly':
        endDate.setMonth(startDate.getMonth() + 1);
        break;
      case 'yearly':
        endDate.setFullYear(startDate.getFullYear() + 1);
        break;
    }
    
    updateValues.end_date = endDate;
  }

  await db.update(goals)
    // @ts-ignore 
    .set(updateValues)
    .where(eq(goals.id, id));

  return {
    message: "Objetivo atualizado com sucesso",
    goal_id: id,
  }
}, {
  name: 'update_goal',
  description: 'Atualiza um objetivo existente',
  schema: z.object({
    id: z.number().describe("ID do objetivo (obrigatório)"),
    title: z.string().optional().describe("Titulo ou nome que ilustre o objetivo"),
    description: z.string().optional().describe("Descrição que ilustra o objetivo"),
    category: z.enum(['personal', 'professional']).optional().describe("Deve ser apenas um dentre ['personal', 'professional']"),
    period: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional().describe("Deve ser apenas um dentre ['daily', 'weekly', 'monthly', 'yearly']"),
    priority: z.enum(['high', 'medium', 'low']).optional().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
    status: z.enum(['not_started', 'in_progress', 'completed', 'abandoned']).optional().describe("Deve ser apenas um dentre ['not_started', 'in_progress', 'completed', 'abandoned']"),
  })
})
