"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReminder = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const standalone_1 = require("../../../../../db/standalone");
const reminders_1 = require("../../../../../db/schemas/reminders");
const drizzle_orm_1 = require("drizzle-orm");
const tasks_1 = require("../../../../../db/schemas/tasks");
const goals_1 = require("../../../../../db/schemas/goals");
exports.updateReminder = (0, tools_1.tool)(async ({ id, content, schedule_time, frequency, task_id, goal_id }, { configurable }) => {
    if (frequency && !['once', 'daily', 'weekly', 'monthly'].includes(frequency)) {
        throw new Error("Frequency must be 'once', 'daily', 'weekly' or 'monthly'");
    }
    const db = (0, standalone_1.createStandaloneDb)();
    const userId = configurable.contact.id;
    const existingReminder = await db.query.reminders.findFirst({
        where: (0, drizzle_orm_1.eq)(reminders_1.reminders.id, id)
    });
    if (!existingReminder) {
        throw new Error(`Reminder with id ${id} not found`);
    }
    if (existingReminder.user_id !== userId) {
        throw new Error(`Reminder with id ${id} does not belong to this user`);
    }
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
    const updateValues = {};
    if (content !== undefined)
        updateValues.content = content;
    if (schedule_time)
        updateValues.schedule_time = new Date(schedule_time);
    if (frequency)
        updateValues.frequency = frequency;
    if (task_id !== undefined)
        updateValues.task_id = task_id || null;
    if (goal_id !== undefined)
        updateValues.goal_id = goal_id || null;
    await db.update(reminders_1.reminders)
        .set(updateValues)
        .where((0, drizzle_orm_1.eq)(reminders_1.reminders.id, id));
    return {
        message: "Lembrete atualizado com sucesso",
        reminder_id: id,
    };
}, {
    name: 'update_reminder',
    description: 'Atualiza um lembrete existente',
    schema: zod_1.default.object({
        id: zod_1.default.number().describe("ID do lembrete (obrigatório)"),
        content: zod_1.default.string().optional().describe("Conteúdo que ilustra o lembrete"),
        schedule_time: zod_1.default.string().optional().describe("Horário em que o lembrete deve ser enviado"),
        frequency: zod_1.default.enum(['once', 'daily', 'weekly', 'monthly']).optional().describe("Deve ser apenas um dentre ['once', 'daily', 'weekly', 'monthly']"),
        task_id: zod_1.default.number().optional().describe("ID da tarefa (opcional)"),
        goal_id: zod_1.default.number().optional().describe("ID do objetivo (opcional)"),
    })
});
//# sourceMappingURL=update-reminder.tool.js.map