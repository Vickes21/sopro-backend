"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGoal = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const standalone_1 = require("../../../../../db/standalone");
const drizzle_orm_1 = require("drizzle-orm");
const goals_1 = require("../../../../../db/schemas/goals");
exports.updateGoal = (0, tools_1.tool)(async ({ id, title, description, category, period, priority, status }) => {
    if (category && !['personal', 'professional'].includes(category)) {
        throw new Error("Category must be 'personal' or 'professional'");
    }
    if (period && !['daily', 'weekly', 'monthly', 'yearly'].includes(period)) {
        throw new Error("Period must be 'daily', 'weekly', 'monthly' or 'yearly'");
    }
    if (priority && !['high', 'medium', 'low'].includes(priority)) {
        throw new Error("Priority must be 'high', 'medium' or 'low'");
    }
    const db = (0, standalone_1.createStandaloneDb)();
    const existingGoal = await db.query.goals.findFirst({
        where: (0, drizzle_orm_1.eq)(goals_1.goals.id, id)
    });
    if (!existingGoal) {
        throw new Error(`Goal with id ${id} not found`);
    }
    const updateValues = {};
    if (title)
        updateValues.title = title;
    if (description !== undefined)
        updateValues.description = description;
    if (category)
        updateValues.category = category;
    if (period)
        updateValues.period = period;
    if (priority)
        updateValues.priority = priority;
    if (status)
        updateValues.status = status;
    if (period && existingGoal.period !== period) {
        const startDate = new Date(existingGoal.start_date);
        let endDate = new Date(startDate);
        switch (period) {
            case 'daily':
                endDate.setDate(startDate.getDate() + 1);
                break;
            case 'weekly':
                endDate.setDate(startDate.getDate() + 7);
                break;
            case 'monthly':
                endDate.setMonth(startDate.getMonth() + 1);
                break;
            case 'yearly':
                endDate.setFullYear(startDate.getFullYear() + 1);
                break;
        }
        updateValues.end_date = endDate;
    }
    await db.update(goals_1.goals)
        .set(updateValues)
        .where((0, drizzle_orm_1.eq)(goals_1.goals.id, id));
    return {
        message: "Objetivo atualizado com sucesso",
        goal_id: id,
    };
}, {
    name: 'update_goal',
    description: 'Atualiza um objetivo existente',
    schema: zod_1.default.object({
        id: zod_1.default.number().describe("ID do objetivo (obrigatório)"),
        title: zod_1.default.string().optional().describe("Titulo ou nome que ilustre o objetivo"),
        description: zod_1.default.string().optional().describe("Descrição que ilustra o objetivo"),
        category: zod_1.default.enum(['personal', 'professional']).optional().describe("Deve ser apenas um dentre ['personal', 'professional']"),
        period: zod_1.default.enum(['daily', 'weekly', 'monthly', 'yearly']).optional().describe("Deve ser apenas um dentre ['daily', 'weekly', 'monthly', 'yearly']"),
        priority: zod_1.default.enum(['high', 'medium', 'low']).optional().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
        status: zod_1.default.enum(['not_started', 'in_progress', 'completed', 'abandoned']).optional().describe("Deve ser apenas um dentre ['not_started', 'in_progress', 'completed', 'abandoned']"),
    })
});
//# sourceMappingURL=update-goal.tool.js.map