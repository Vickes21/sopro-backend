"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const schema = require("../../../../../db/schemas");
const standalone_1 = require("../../../../../db/standalone");
const drizzle_orm_1 = require("drizzle-orm");
exports.deleteTask = (0, tools_1.tool)(async ({ id }) => {
    const db = (0, standalone_1.createStandaloneDb)();
    const existingTask = await db.query.tasks.findFirst({
        where: (0, drizzle_orm_1.eq)(schema.tasks.id, id)
    });
    if (!existingTask) {
        throw new Error(`Task with id ${id} not found`);
    }
    await db.delete(schema.tasks)
        .where((0, drizzle_orm_1.eq)(schema.tasks.id, id));
    return {
        message: "Tarefa excluída com sucesso",
        task_id: id,
    };
}, {
    name: 'delete_task',
    description: 'Deleta uma tarefa',
    schema: zod_1.default.object({
        id: zod_1.default.number().describe("ID da tarefa (obrigatório)"),
    })
});
//# sourceMappingURL=delete-task.tool.js.map