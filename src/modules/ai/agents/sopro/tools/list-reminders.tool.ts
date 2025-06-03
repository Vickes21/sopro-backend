import { tool } from "@langchain/core/tools";
import z from "zod";
import { createStandaloneDb } from "src/db/standalone";
import { reminders } from "src/db/schemas/reminders";
import { eq, and } from "drizzle-orm";

export const listReminders = tool(async ({ task_id, goal_id }, {
  configurable
}) => {
  const db = createStandaloneDb();
  const userId = configurable.contact.id;
  
  let remindersList;
  
  // Build query conditions
  const conditions = [eq(reminders.user_id, userId)];
  
  if (task_id) {
    conditions.push(eq(reminders.task_id, task_id));
  }
  
  if (goal_id) {
    conditions.push(eq(reminders.goal_id, goal_id));
  }
  
  // Get reminders with filters
  remindersList = await db.query.reminders.findMany({
    where: and(...conditions),
    with: {
      task: true,
      goal: true
    },
    orderBy: (reminders) => [reminders.schedule_time]
  });

  return {
    message: `Listando ${remindersList.length} lembretes`,
    reminders: remindersList.map(reminder => ({
      id: reminder.id,
      content: reminder.content,
      schedule_time: reminder.schedule_time.toISOString(),
      frequency: reminder.frequency,
      task_id: reminder.task_id,
      task_title: reminder.task?.title,
      goal_id: reminder.goal_id,
      goal_title: reminder.goal?.title,
    })),
  }
}, {
  name: 'list_reminders',
  description: 'Lista todos os lembretes, opcionalmente filtrados por tarefa ou objetivo',
  schema: z.object({
    task_id: z.number().optional().describe("ID da tarefa (opcional)"),
    goal_id: z.number().optional().describe("ID do objetivo (opcional)"),
  })
})
