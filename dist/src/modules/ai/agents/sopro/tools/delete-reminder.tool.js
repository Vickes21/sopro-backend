"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReminder = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const standalone_1 = require("../../../../../db/standalone");
const reminders_1 = require("../../../../../db/schemas/reminders");
const drizzle_orm_1 = require("drizzle-orm");
exports.deleteReminder = (0, tools_1.tool)(async ({ id }, { configurable }) => {
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
    await db.delete(reminders_1.reminders)
        .where((0, drizzle_orm_1.eq)(reminders_1.reminders.id, id));
    return {
        message: "Lembrete excluído com sucesso",
        reminder_id: id,
    };
}, {
    name: 'delete_reminder',
    description: 'Deleta um lembrete',
    schema: zod_1.default.object({
        id: zod_1.default.number().describe("ID do lembrete (obrigatório)"),
    })
});
//# sourceMappingURL=delete-reminder.tool.js.map