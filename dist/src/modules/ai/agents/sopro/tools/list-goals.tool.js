"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listGoals = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const schema = require("../../../../../db/schemas");
const standalone_1 = require("../../../../../db/standalone");
const drizzle_orm_1 = require("drizzle-orm");
exports.listGoals = (0, tools_1.tool)(async ({}, { configurable }) => {
    const db = (0, standalone_1.createStandaloneDb)();
    const userId = configurable.contact.id;
    const goals = await db.query.goals.findMany({
        where: (0, drizzle_orm_1.eq)(schema.goals.user_id, userId),
        orderBy: (goals, { desc }) => [
            desc(goals.priority),
            desc(goals.end_date)
        ],
        with: {
            tasks: true
        }
    });
    return {
        message: `Listando ${goals.length} objetivos`,
        goals: goals.map(goal => ({
            id: goal.id,
            title: goal.title,
            description: goal.description,
            category: goal.category,
            period: goal.period,
            priority: goal.priority,
            status: goal.status,
            start_date: goal.start_date,
            end_date: goal.end_date,
            created_at: goal.created_at ? goal.created_at : null,
            updated_at: goal.updated_at ? goal.updated_at : null,
            tasks: goal.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                due_date: task.due_date ? task.due_date : null,
                priority: task.priority,
                status: task.status,
                last_status_at: task.last_status_at,
                created_at: task.created_at ? task.created_at : null,
                updated_at: task.updated_at ? task.updated_at : null,
            }))
        })),
    };
}, {
    name: 'list_goals',
    description: 'Lista todos os objetivos',
    schema: zod_1.default.object({})
});
//# sourceMappingURL=list-goals.tool.js.map