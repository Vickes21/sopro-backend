import { tool } from "@langchain/core/tools";
import z from "zod";
import { createStandaloneDb } from "src/db/standalone";
import { eq } from "drizzle-orm";
import { tasks, TTask } from "src/db/schemas";

export const updateTask = tool(async ({ id, title, description, priority, status, due_date, goal_id }) => {
  if (priority && !['high', 'medium', 'low'].includes(priority)) {
    throw new Error("Priority must be 'high', 'medium' or 'low'");
  }

  if (status && !['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
    throw new Error("Status must be 'pending', 'in_progress', 'completed' or 'cancelled'");
  }

  const db = createStandaloneDb();

  // Check if task exists
  const existingTask = await db.query.tasks.findFirst({
    where: eq(tasks.id, id)
  });

  if (!existingTask) {
    throw new Error(`Task with id ${id} not found`);
  }

  const updateValues: Partial<TTask> = {};
  
  if (title) updateValues.title = title;
  if (description !== undefined) updateValues.description = description;
  if (due_date) updateValues.due_date = new Date(due_date);
  if (priority) updateValues.priority = priority as 'high' | 'medium' | 'low';
  if (status) {
    updateValues.status = status as 'pending' | 'in_progress' | 'completed' | 'cancelled';
    updateValues.last_status_at = new Date();
  }
  if (goal_id !== undefined) updateValues.goal_id = goal_id;

  await db.update(tasks)
    // @ts-ignore 
    .set(updateValues)
    .where(eq(tasks.id, id));

  return {
    message: "Tarefa atualizada com sucesso",
    task_id: id,
  }
}, {
  name: 'update_task',
  description: 'Atualiza uma tarefa existente',
  schema: z.object({
    id: z.number().describe("ID da tarefa (obrigatório)"),
    title: z.string().optional().describe("Titulo ou nome que ilustre a tarefa"),
    description: z.string().optional().describe("Descrição que ilustra a tarefa"),
    due_date: z.string().optional().describe("Data em que a tarefa deve ser concluída"),
    priority: z.enum(['high', 'medium', 'low']).optional().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
    status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional().describe("Deve ser apenas um dentre ['pending', 'in_progress', 'completed', 'cancelled']"),
    goal_id: z.number().optional().describe("Identificador do Objetivo, caso aplicável"),
  })
})
