import { tool } from "@langchain/core/tools";
import z from "zod";
import * as schema from "src/db/schemas";
import { createStandaloneDb } from "src/db/standalone";
import { eq } from "drizzle-orm";

export const listGoals = tool(async ({},{ configurable }) => {
  const db = createStandaloneDb();

  const userId = configurable.contact.id;
  
  // Get all goals
  const goals = await db.query.goals.findMany({
    where: eq(schema.goals.user_id, userId),
    orderBy: (goals, { desc }) => [
      desc(goals.priority),
      desc(goals.end_date)
    ],
    with: {
      tasks: true
    }
  });

  return {
    message: `Listando ${goals.length} objetivos`,
    goals: goals.map(goal => ({
      id: goal.id,
      title: goal.title,
      description: goal.description,
      category: goal.category,
      period: goal.period,
      priority: goal.priority,
      status: goal.status,
      start_date: goal.start_date.toISOString(),
      end_date: goal.end_date.toISOString(),
      created_at: goal.created_at ? goal.created_at.toISOString() : null,
      updated_at: goal.updated_at ? goal.updated_at.toISOString() : null,
      tasks: goal.tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        due_date: task.due_date ? task.due_date.toISOString() : null,
        priority: task.priority,
        status: task.status,
        last_status_at: task.last_status_at.toISOString(),
        created_at: task.created_at ? task.created_at.toISOString() : null,
        updated_at: task.updated_at ? task.updated_at.toISOString() : null,
      }))
    })),
  }
}, {
  name: 'list_goals',
  description: 'Lista todos os objetivos',
  schema: z.object({})
})
