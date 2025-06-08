"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTasks = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const schema = require("../../../../../db/schemas");
const standalone_1 = require("../../../../../db/standalone");
const drizzle_orm_1 = require("drizzle-orm");
exports.listTasks = (0, tools_1.tool)(async ({ goal_id }, { configurable }) => {
    const db = (0, standalone_1.createStandaloneDb)();
    const userId = configurable.contact.id;
    let tasks;
    if (goal_id) {
        const existingGoal = await db.query.goals.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.goals.id, goal_id)
        });
        if (!existingGoal) {
            throw new Error(`Goal with id ${goal_id} not found`);
        }
        tasks = await db.query.tasks.findMany({
            where: (0, drizzle_orm_1.eq)(schema.tasks.goal_id, goal_id),
            orderBy: (tasks, { desc }) => [
                desc(tasks.priority),
                desc(tasks.due_date)
            ]
        });
    }
    else {
        tasks = await db.query.tasks.findMany({
            where: (0, drizzle_orm_1.eq)(schema.tasks.user_id, userId),
            orderBy: (tasks, { desc }) => [
                desc(tasks.priority),
                desc(tasks.due_date)
            ]
        });
    }
    return {
        message: goal_id
            ? `Listando ${tasks.length} tarefas para o objetivo ${goal_id}`
            : `Listando ${tasks.length} tarefas`,
        tasks: tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            due_date: task.due_date ? task.due_date.toISOString() : null,
            priority: task.priority,
            status: task.status,
            goal_id: task.goal_id,
            last_status_at: task.last_status_at.toISOString(),
            created_at: task.created_at ? task.created_at.toISOString() : null,
            updated_at: task.updated_at ? task.updated_at.toISOString() : null,
        })),
    };
}, {
    name: 'list_tasks',
    description: 'Lista todas as tarefas, opcionalmente filtradas por objetivo',
    schema: zod_1.default.object({
        goal_id: zod_1.default.number().optional().describe("ID do objetivo (opcional, se não passado, lista todas as tarefas)"),
    })
});
//# sourceMappingURL=list-tasks.tool.js.map