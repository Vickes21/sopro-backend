import { tool } from "@langchain/core/tools";
import z from "zod";
import { createStandaloneDb } from "src/db/standalone";
import { reminders } from "src/db/schemas/reminders";
import { eq } from "drizzle-orm";
import { tasks } from "src/db/schemas/tasks";
import { goals } from "src/db/schemas/goals";

export const updateReminder = tool(async ({ id, content, schedule_time, frequency, task_id, goal_id }, {
  configurable
}) => {
  if (frequency && !['once', 'daily', 'weekly', 'monthly'].includes(frequency)) {
    throw new Error("Frequency must be 'once', 'daily', 'weekly' or 'monthly'");
  }

  const db = createStandaloneDb();
  const userId = configurable.contact.id;

  // Check if reminder exists and belongs to the user
  const existingReminder = await db.query.reminders.findFirst({
    where: eq(reminders.id, id)
  });

  if (!existingReminder) {
    throw new Error(`Reminder with id ${id} not found`);
  }

  if (existingReminder.user_id !== userId) {
    throw new Error(`Reminder with id ${id} does not belong to this user`);
  }

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

  // Prepare update values
  const updateValues: Record<string, any> = {};
  
  if (content !== undefined) updateValues.content = content;
  if (schedule_time) updateValues.schedule_time = new Date(schedule_time);
  if (frequency) updateValues.frequency = frequency;
  if (task_id !== undefined) updateValues.task_id = task_id || null;
  if (goal_id !== undefined) updateValues.goal_id = goal_id || null;

  // Update reminder
  await db.update(reminders)
    // @ts-ignore
    .set(updateValues)
    .where(eq(reminders.id, id));

  return {
    message: "Lembrete atualizado com sucesso",
    reminder_id: id,
  }
}, {
  name: 'update_reminder',
  description: 'Atualiza um lembrete existente',
  schema: z.object({
    id: z.number().describe("ID do lembrete (obrigatório)"),
    content: z.string().optional().describe("Conteúdo que ilustra o lembrete"),
    schedule_time: z.string().optional().describe("Horário em que o lembrete deve ser enviado"),
    frequency: z.enum(['once', 'daily', 'weekly', 'monthly']).optional().describe("Deve ser apenas um dentre ['once', 'daily', 'weekly', 'monthly']"),
    task_id: z.number().optional().describe("ID da tarefa (opcional)"),
    goal_id: z.number().optional().describe("ID do objetivo (opcional)"),
  })
})
