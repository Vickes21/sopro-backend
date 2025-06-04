"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const standalone_1 = require("../../../../../db/standalone");
const drizzle_orm_1 = require("drizzle-orm");
const schemas_1 = require("../../../../../db/schemas");
exports.updateTask = (0, tools_1.tool)(async ({ id, title, description, priority, status, due_date, goal_id }) => {
    if (priority && !['high', 'medium', 'low'].includes(priority)) {
        throw new Error("Priority must be 'high', 'medium' or 'low'");
    }
    if (status && !['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
        throw new Error("Status must be 'pending', 'in_progress', 'completed' or 'cancelled'");
    }
    const db = (0, standalone_1.createStandaloneDb)();
    const existingTask = await db.query.tasks.findFirst({
        where: (0, drizzle_orm_1.eq)(schemas_1.tasks.id, id)
    });
    if (!existingTask) {
        throw new Error(`Task with id ${id} not found`);
    }
    const updateValues = {};
    if (title)
        updateValues.title = title;
    if (description !== undefined)
        updateValues.description = description;
    if (due_date)
        updateValues.due_date = new Date(due_date);
    if (priority)
        updateValues.priority = priority;
    if (status) {
        updateValues.status = status;
        updateValues.last_status_at = new Date();
    }
    if (goal_id !== undefined)
        updateValues.goal_id = goal_id;
    await db.update(schemas_1.tasks)
        .set(updateValues)
        .where((0, drizzle_orm_1.eq)(schemas_1.tasks.id, id));
    return {
        message: "Tarefa atualizada com sucesso",
        task_id: id,
    };
}, {
    name: 'update_task',
    description: 'Atualiza uma tarefa existente',
    schema: zod_1.default.object({
        id: zod_1.default.number().describe("ID da tarefa (obrigatório)"),
        title: zod_1.default.string().optional().describe("Titulo ou nome que ilustre a tarefa"),
        description: zod_1.default.string().optional().describe("Descrição que ilustra a tarefa"),
        due_date: zod_1.default.string().optional().describe("Data em que a tarefa deve ser concluída"),
        priority: zod_1.default.enum(['high', 'medium', 'low']).optional().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
        status: zod_1.default.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional().describe("Deve ser apenas um dentre ['pending', 'in_progress', 'completed', 'cancelled']"),
        goal_id: zod_1.default.number().optional().describe("Identificador do Objetivo, caso aplicável"),
    })
});
//# sourceMappingURL=update-task.tool.js.map