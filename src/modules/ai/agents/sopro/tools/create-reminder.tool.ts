import { tool } from "@langchain/core/tools";
import z from "zod";
import { createStandaloneDb } from "src/db/standalone";
import { reminders } from "src/db/schemas/reminders";
import { eq } from "drizzle-orm";
import { tasks } from "src/db/schemas/tasks";
import { goals } from "src/db/schemas/goals";

export const createReminder = tool(async ({ content, schedule_time, frequency, task_id, goal_id }, {
  configurable
}) => {
  // Validate frequency
  if (!['once', 'daily', 'weekly', 'monthly'].includes(frequency)) {
    throw new Error("Frequency must be 'once', 'daily', 'weekly' or 'monthly'");
  }

  const db = createStandaloneDb();
  const userId = configurable.contact.id;

  // Validate task_id if provided
  if (task_id) {
    const existingTask = await db.query.tasks.findFirst({
      where: eq(tasks.id, task_id)
    });

    if (!existingTask) {
      throw new Error(`Task with id ${task_id} not found`);
    }
    
    // Verify task belongs to user
    if (existingTask.user_id !== userId) {
      throw new Error(`Task with id ${task_id} does not belong to this user`);
    }
  }

  // Validate goal_id if provided
  if (goal_id) {
    const existingGoal = await db.query.goals.findFirst({
      where: eq(goals.id, goal_id)
    });

    if (!existingGoal) {
      throw new Error(`Goal with id ${goal_id} not found`);
    }
    
    // Verify goal belongs to user
    if (existingGoal.user_id !== userId) {
      throw new Error(`Goal with id ${goal_id} does not belong to this user`);
    }
  }

  // Create reminder
  const createReminder = await db.insert(reminders).values({
    user_id: userId,
    content,
    schedule_time: new Date(schedule_time),
    frequency,
    task_id: task_id || null,
    goal_id: goal_id || null,
  }).returning();

  return {
    message: "Lembrete criado com sucesso",
    reminder_id: createReminder[0].id,
  }
}, {
  name: 'create_reminder',
  description: 'Cria um lembrete',
  schema: z.object({
    content: z.string().describe("Conteúdo que ilustra o lembrete"),
    schedule_time: z.string().describe("Horário em que o lembrete deve ser enviado ex: '2025-06-03T17:00:00'"),
    frequency: z.enum(['once', 'daily', 'weekly', 'monthly']).describe("Deve ser apenas um dentre ['once', 'daily', 'weekly', 'monthly']"),
    task_id: z.number().optional().describe("ID da tarefa (opcional)"),
    goal_id: z.number().optional().describe("ID do objetivo (opcional)"),
  })
})
