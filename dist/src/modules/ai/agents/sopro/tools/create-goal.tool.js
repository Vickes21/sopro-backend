"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoal = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const schema = require("../../../../../db/schemas");
const standalone_1 = require("../../../../../db/standalone");
exports.createGoal = (0, tools_1.tool)(async ({ title, description, category, period, priority }, { configurable }) => {
    if (!['personal', 'professional'].includes(category)) {
        throw new Error("Category must be 'personal' or 'professional'");
    }
    if (!['daily', 'weekly', 'monthly', 'yearly'].includes(period)) {
        throw new Error("Period must be 'daily', 'weekly', 'monthly' or 'yearly'");
    }
    if (!['high', 'medium', 'low'].includes(priority)) {
        throw new Error("Priority must be 'high', 'medium' or 'low'");
    }
    const db = (0, standalone_1.createStandaloneDb)();
    const today = new Date();
    let endDate = new Date(today);
    switch (period) {
        case 'daily':
            endDate.setDate(today.getDate() + 1);
            break;
        case 'weekly':
            endDate.setDate(today.getDate() + 7);
            break;
        case 'monthly':
            endDate.setMonth(today.getMonth() + 1);
            break;
        case 'yearly':
            endDate.setFullYear(today.getFullYear() + 1);
            break;
    }
    const userId = configurable.contact.id;
    const createGoal = await db.insert(schema.goals).values({
        title,
        description,
        category: category,
        period: period,
        priority: priority,
        user_id: userId,
        status: 'not_started',
        start_date: today.toISOString(),
        end_date: endDate.toISOString(),
    }).returning();
    return {
        message: "Objetivo criado com sucesso",
        goal_id: createGoal[0].id,
    };
}, {
    name: 'create_goal',
    description: 'Cria um objetivo',
    schema: zod_1.default.object({
        title: zod_1.default.string().describe("Titulo ou nome que ilustre o objetivo"),
        description: zod_1.default.string().optional().describe("Descrição que ilustra o objetivo"),
        category: zod_1.default.string().describe("Deve ser apenas um dentre ['personal', 'professional']"),
        period: zod_1.default.string().describe("Deve ser apenas um dentre ['daily', 'weekly', 'monthly', 'yearly']"),
        priority: zod_1.default.string().describe("Deve ser apenas um dentre ['high', 'medium', 'low']"),
    })
});
//# sourceMappingURL=create-goal.tool.js.map