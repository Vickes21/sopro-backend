import { tool } from "@langchain/core/tools";
import z from "zod";
import * as schema from "src/db/schemas";
import { createStandaloneDb } from "src/db/standalone";

export const createGoal = tool(async ({ title, description, category, period, priority }, { configurable }) => {
  // Validate enums
  if (!['personal', 'professional'].includes(category)) {
    throw new Error("Category must be 'personal' or 'professional'");
  }

  if (!['daily', 'weekly', 'monthly', 'yearly'].includes(period)) {
    throw new Error("Period must be 'daily', 'weekly', 'monthly' or 'yearly'");
  }

  if (!['high', 'medium', 'low'].includes(priority)) {
    throw new Error("Priority must be 'high', 'medium' or 'low'");
  }

  const db = createStandaloneDb();

  // Get current date
  const today = new Date();
  
  // Calculate end date based on period
  let endDate = new Date(today);
  switch (period) {
    case 'daily':
      endDate.setDate(today.getDate() + 1);
      break;
    case 'weekly':
      endDate.setDate(today.getDate() + 7);
      break;
    case 'monthly':
      endDate.setMonth(today.getMonth() + 1);
      break;
    case 'yearly':
      endDate.setFullYear(today.getFullYear() + 1);
      break;
  }

  const userId = configurable.contact.id;

  const createGoal = await db.insert(schema.goals).values({
    title,
    description,
    category: category as 'personal' | 'professional',
    period: period as 'daily' | 'weekly' | 'monthly' | 'yearly',
    priority: priority as 'high' | 'medium' | 'low',
    user_id: userId,
    status: 'not_started',
    start_date: today,
    end_date: endDate,
  }).$returningId();

  return {
    message: "Objetivo criado com sucesso",
    goal_id: createGoal[0].id,
  }
}, {
  name: 'create_goal',
  description: 'Cria um objetivo',
  schema: z.object({
    title: z.string().describe("Titulo ou nome que ilustre o objetivo"),
    description: z.string().optional().describe("Descrição que ilustra o objetivo"),
    category: z.string().describe("Deve ser apenas um dentre ['personal', 'professional']"),
    period: z.string().describe("Deve ser apenas um dentre ['daily', 'weekly', 'monthly', 'yearly']"),
    priority: z.string().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
  })
})
