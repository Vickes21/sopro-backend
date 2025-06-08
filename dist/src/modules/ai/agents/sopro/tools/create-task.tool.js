"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const schema = require("../../../../../db/schemas");
const standalone_1 = require("../../../../../db/standalone");
exports.createTask = (0, tools_1.tool)(async ({ title, description, priority, status, due_date, goal_id }, { configurable }) => {
    if (!['high', 'medium', 'low'].includes(priority)) {
        throw new Error("Priority must be 'high', 'medium' or 'low'");
    }
    if (!['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
        throw new Error("Status must be 'pending', 'in_progress', 'completed' or 'cancelled'");
    }
    const db = (0, standalone_1.createStandaloneDb)();
    const userId = configurable.contact.id;
    const createTask = await db.insert(schema.tasks).values({
        user_id: userId,
        title,
        description,
        due_date: due_date ? new Date(due_date) : undefined,
        priority: priority,
        status: status,
        goal_id: goal_id ? goal_id : undefined,
        last_status_at: new Date(),
    }).returning();
    return {
        message: "Tarefa criada com sucesso",
        task_id: createTask[0].id,
    };
}, {
    name: 'create_task',
    description: 'Cria uma tarefa, podendo ou não, vinculá-la a um objetivo',
    schema: zod_1.default.object({
        title: zod_1.default.string().describe("Titulo ou nome que ilustre a tarefa"),
        description: zod_1.default.string().optional().describe("Descrição que ilustra a tarefa"),
        due_date: zod_1.default.string().optional().describe("Data em que a tarefa deve ser concluída"),
        priority: zod_1.default.string().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
        status: zod_1.default.string().describe("Deve ser apenas um dentre ['pending', 'in_progress', 'completed', 'cancelled']"),
        goal_id: zod_1.default.number().optional().describe("Identificador do Objetivo, caso aplicável"),
    })
});
//# sourceMappingURL=create-task.tool.js.map