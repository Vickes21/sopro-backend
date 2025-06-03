import { tool } from "@langchain/core/tools";
import z from "zod";
import { createStandaloneDb } from "src/db/standalone";
import { reminders } from "src/db/schemas/reminders";
import { eq } from "drizzle-orm";

export const deleteReminder = tool(async ({ id }, {
  configurable
}) => {
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

  // Delete reminder
  await db.delete(reminders)
    .where(eq(reminders.id, id));

  return {
    message: "Lembrete excluído com sucesso",
    reminder_id: id,
  }
}, {
  name: 'delete_reminder',
  description: 'Deleta um lembrete',
  schema: z.object({
    id: z.number().describe("ID do lembrete (obrigatório)"),
  })
})
