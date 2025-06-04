"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const schema = require("../../../../../db/schemas");
const standalone_1 = require("../../../../../db/standalone");
const drizzle_orm_1 = require("drizzle-orm");
exports.updateContact = (0, tools_1.tool)(async ({ name, email, password }, { configurable }) => {
    const db = (0, standalone_1.createStandaloneDb)();
    const userId = configurable.contact.id;
    await db.update(schema.users)
        .set({
        name: name || undefined,
        email: email || undefined,
        password: password || undefined,
    })
        .where((0, drizzle_orm_1.eq)(schema.users.id, userId));
    return {
        message: "Contato atualizado com sucesso",
        user_id: userId,
    };
}, {
    name: 'update_contact',
    description: 'Atualiza as informações do contato',
    schema: zod_1.default.object({
        name: zod_1.default.string().optional().describe("Nome do contato"),
        email: zod_1.default.string().optional().describe("Email do contato"),
        password: zod_1.default.string().optional().describe("Senha temporária do contato, não peça para o usuario fornecer pois sera fornecida a você"),
    })
});
//# sourceMappingURL=update-contact.tool.js.map