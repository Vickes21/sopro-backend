import { tool } from "@langchain/core/tools";
import z from "zod";
import * as schema from "src/db/schemas";
import { createStandaloneDb } from "src/db/standalone";
import { eq } from "drizzle-orm";

export const listTasks = tool(async ({ goal_id }, {
  configurable
}) => {
  const db = createStandaloneDb();

  const userId = configurable.contact.id;
  
  let tasks;
  
  if (goal_id) {
    // Check if goal exists
    const existingGoal = await db.query.goals.findFirst({
      where: eq(schema.goals.id, goal_id)
    });

    if (!existingGoal) {
      throw new Error(`Goal with id ${goal_id} not found`);
    }
    
    // Get tasks for specific goal
    tasks = await db.query.tasks.findMany({
      where: eq(schema.tasks.goal_id, goal_id),
      orderBy: (tasks, { desc }) => [
        desc(tasks.priority),
        desc(tasks.due_date)
      ]
    });
  } else {
    // Get all tasks
    tasks = await db.query.tasks.findMany({
      where: eq(schema.tasks.user_id, userId),
      orderBy: (tasks, { desc }) => [
        desc(tasks.priority),
        desc(tasks.due_date)
      ]
    });
  }

  return {
    message: goal_id 
      ? `Listando ${tasks.length} tarefas para o objetivo ${goal_id}` 
      : `Listando ${tasks.length} tarefas`,
    tasks: tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date ? task.due_date.toISOString() : null,
      priority: task.priority,
      status: task.status,
      goal_id: task.goal_id,
      last_status_at: task.last_status_at.toISOString(),
      created_at: task.created_at ? task.created_at.toISOString() : null,
      updated_at: task.updated_at ? task.updated_at.toISOString() : null,
    })),
  }
}, {
  name: 'list_tasks',
  description: 'Lista todas as tarefas, opcionalmente filtradas por objetivo',
  schema: z.object({
    goal_id: z.number().optional().describe("ID do objetivo (opcional, se não passado, lista todas as tarefas)"),
  })
})
