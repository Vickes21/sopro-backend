import { tool } from "@langchain/core/tools";
import z from "zod";
import * as schema from "src/db/schemas";
import { createStandaloneDb } from "src/db/standalone";
import { eq } from "drizzle-orm";

export const updateContact = tool(async ({ name, email, password }, {
  configurable
}) => {
  const db = createStandaloneDb();

  const userId = configurable.contact.id;

  await db.update(schema.users)
    .set({
      name: name || undefined,
      email: email || undefined,
      password: password || undefined,
    })
    .where(eq(schema.users.id, userId))

  return {
    message: "Contato atualizado com sucesso",
    user_id: userId,
  }
}, {
  name: 'update_contact',
  description: 'Atualiza as informações do contato',
  schema: z.object({
    name: z.string().optional().describe("Nome do contato"),
    email: z.string().optional().describe("Email do contato"),
    password: z.string().optional().describe("Senha temporária do contato, não peça para o usuario fornecer pois sera fornecida a você"),
  })
})
