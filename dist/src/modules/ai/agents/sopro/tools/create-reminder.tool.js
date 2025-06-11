"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReminder = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const standalone_1 = require("../../../../../db/standalone");
const reminders_1 = require("../../../../../db/schemas/reminders");
const drizzle_orm_1 = require("drizzle-orm");
const tasks_1 = require("../../../../../db/schemas/tasks");
const goals_1 = require("../../../../../db/schemas/goals");
exports.createReminder = (0, tools_1.tool)(async ({ content, schedule_time, frequency, task_id, goal_id }, { configurable }) => {
    if (!['once', 'daily', 'weekly', 'monthly'].includes(frequency)) {
        throw new Error("Frequency must be 'once', 'daily', 'weekly' or 'monthly'");
    }
    const db = (0, standalone_1.createStandaloneDb)();
    const userId = configurable.contact.id;
    if (task_id) {
        const existingTask = await db.query.tasks.findFirst({
            where: (0, drizzle_orm_1.eq)(tasks_1.tasks.id, task_id)
        });
        if (!existingTask) {
            throw new Error(`Task with id ${task_id} not found`);
        }
        if (existingTask.user_id !== userId) {
            throw new Error(`Task with id ${task_id} does not belong to this user`);
        }
    }
    if (goal_id) {
        const existingGoal = await db.query.goals.findFirst({
            where: (0, drizzle_orm_1.eq)(goals_1.goals.id, goal_id)
        });
        if (!existingGoal) {
            throw new Error(`Goal with id ${goal_id} not found`);
        }
        if (existingGoal.user_id !== userId) {
            throw new Error(`Goal with id ${goal_id} does not belong to this user`);
        }
    }
    const createReminder = await db.insert(reminders_1.reminders).values({
        user_id: userId,
        content,
        schedule_time: new Date(schedule_time),
        frequency,
        task_id: task_id || null,
        goal_id: goal_id || null,
    }).$returningId();
    return {
        message: "Lembrete criado com sucesso",
        reminder_id: createReminder[0].id,
    };
}, {
    name: 'create_reminder',
    description: 'Cria um lembrete',
    schema: zod_1.default.object({
        content: zod_1.default.string().describe("Conteúdo que ilustra o lembrete"),
        schedule_time: zod_1.default.string().describe("Horário em que o lembrete deve ser enviado ex: '2025-06-03T17:00:00'"),
        frequency: zod_1.default.enum(['once', 'daily', 'weekly', 'monthly']).describe("Deve ser apenas um dentre ['once', 'daily', 'weekly', 'monthly']"),
        task_id: zod_1.default.number().optional().describe("ID da tarefa (opcional)"),
        goal_id: zod_1.default.number().optional().describe("ID do objetivo (opcional)"),
    })
});
//# sourceMappingURL=create-reminder.tool.js.map