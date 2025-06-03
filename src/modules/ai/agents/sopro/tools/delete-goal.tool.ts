import { tool } from "@langchain/core/tools";
import z from "zod";
import * as schema from "src/db/schemas";
import { createStandaloneDb } from "src/db/standalone";
import { eq } from "drizzle-orm";

export const deleteGoal = tool(async ({ id }) => {
  const db = createStandaloneDb();

  // Check if goal exists
  const existingGoal = await db.query.goals.findFirst({
    where: eq(schema.goals.id, id)
  });

  if (!existingGoal) {
    throw new Error(`Goal with id ${id} not found`);
  }

  // Check if there are any tasks associated with this goal
  const associatedTasks = await db.query.tasks.findMany({
    where: eq(schema.tasks.goal_id, id)
  });

  if (associatedTasks.length > 0) {
    // Option 1: Throw error if there are associated tasks
    // throw new Error(`Cannot delete goal with id ${id} because it has ${associatedTasks.length} associated tasks`);
    
    // Option 2: Delete associated tasks (cascade delete)
    await db.delete(schema.tasks)
      .where(eq(schema.tasks.goal_id, id));
  }

  await db.delete(schema.goals)
    .where(eq(schema.goals.id, id));

  return {
    message: "Objetivo excluído com sucesso",
    goal_id: id,
  }
}, {
  name: 'delete_goal',
  description: 'Deleta um objetivo',
  schema: z.object({
    id: z.number().describe("ID do objetivo (obrigatório)"),
  })
})
