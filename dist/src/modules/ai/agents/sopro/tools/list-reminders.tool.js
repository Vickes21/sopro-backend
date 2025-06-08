"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReminders = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const standalone_1 = require("../../../../../db/standalone");
const reminders_1 = require("../../../../../db/schemas/reminders");
const drizzle_orm_1 = require("drizzle-orm");
exports.listReminders = (0, tools_1.tool)(async ({ task_id, goal_id }, { configurable }) => {
    const db = (0, standalone_1.createStandaloneDb)();
    const userId = configurable.contact.id;
    let remindersList;
    const conditions = [(0, drizzle_orm_1.eq)(reminders_1.reminders.user_id, userId)];
    if (task_id) {
        conditions.push((0, drizzle_orm_1.eq)(reminders_1.reminders.task_id, task_id));
    }
    if (goal_id) {
        conditions.push((0, drizzle_orm_1.eq)(reminders_1.reminders.goal_id, goal_id));
    }
    remindersList = await db.query.reminders.findMany({
        where: (0, drizzle_orm_1.and)(...conditions),
        with: {
            task: true,
            goal: true
        },
        orderBy: (reminders) => [reminders.schedule_time]
    });
    return {
        message: `Listando ${remindersList.length} lembretes`,
        reminders: remindersList.map(reminder => ({
            id: reminder.id,
            content: reminder.content,
            schedule_time: reminder.schedule_time.toISOString(),
            frequency: reminder.frequency,
            task_id: reminder.task_id,
            task_title: reminder.task?.title,
            goal_id: reminder.goal_id,
            goal_title: reminder.goal?.title,
        })),
    };
}, {
    name: 'list_reminders',
    description: 'Lista todos os lembretes, opcionalmente filtrados por tarefa ou objetivo',
    schema: zod_1.default.object({
        task_id: zod_1.default.number().optional().describe("ID da tarefa (opcional)"),
        goal_id: zod_1.default.number().optional().describe("ID do objetivo (opcional)"),
    })
});
//# sourceMappingURL=list-reminders.tool.js.map