import { tool } from "@langchain/core/tools";
import z from "zod";
import * as schema from "src/db/schemas";
import { createStandaloneDb } from "src/db/standalone";

export const createTask = tool(async ({ title, description, priority, status, due_date, goal_id }, { configurable }) => {

  //validate enums
  if (!['high', 'medium', 'low'].includes(priority)) {
    throw new Error("Priority must be 'high', 'medium' or 'low'");
  }

  if (!['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
    throw new Error("Status must be 'pending', 'in_progress', 'completed' or 'cancelled'");
  }

  const db = createStandaloneDb();

  const userId = configurable.contact.id;

  const createTask = await db.insert(schema.tasks).values({
    user_id: userId,
    title,
    description,
    due_date: due_date ? new Date(due_date) : undefined,
    priority: priority as 'high' | 'medium' | 'low',
    status: status as 'pending' | 'in_progress' | 'completed' | 'cancelled',
    goal_id: goal_id ? goal_id : undefined,
    last_status_at: new Date(),
  }).$returningId();

  return {
    message: "Tarefa criada com sucesso",
    task_id: createTask[0].id,
  }

}, {
  name: 'create_task',
  description: 'Cria uma tarefa, podendo ou não, vinculá-la a um objetivo',
  schema: z.object({
    title: z.string().describe("Titulo ou nome que ilustre a tarefa"),
    description: z.string().optional().describe("Descrição que ilustra a tarefa"),
    due_date: z.string().optional().describe("Data em que a tarefa deve ser concluída"),
    priority: z.string().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
    status: z.string().describe("Deve ser apenas um dentre ['pending', 'in_progress', 'completed', 'cancelled']"),
    goal_id: z.number().optional().describe("Identificador do Objetivo, caso aplicável"),
  })
})