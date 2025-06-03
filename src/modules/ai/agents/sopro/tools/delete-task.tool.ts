import { tool } from "@langchain/core/tools";
import z from "zod";
import * as schema from "src/db/schemas";
import { createStandaloneDb } from "src/db/standalone";
import { eq } from "drizzle-orm";

export const deleteTask = tool(async ({ id }) => {
  const db = createStandaloneDb();

  // Check if task exists
  const existingTask = await db.query.tasks.findFirst({
    where: eq(schema.tasks.id, id)
  });

  if (!existingTask) {
    throw new Error(`Task with id ${id} not found`);
  }

  await db.delete(schema.tasks)
    .where(eq(schema.tasks.id, id));

  return {
    message: "Tarefa excluída com sucesso",
    task_id: id,
  }
}, {
  name: 'delete_task',
  description: 'Deleta uma tarefa',
  schema: z.object({
    id: z.number().describe("ID da tarefa (obrigatório)"),
  })
})
