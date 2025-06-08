"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const schema = require("../../../../../db/schemas");
const standalone_1 = require("../../../../../db/standalone");
const drizzle_orm_1 = require("drizzle-orm");
exports.deleteGoal = (0, tools_1.tool)(async ({ id }) => {
    const db = (0, standalone_1.createStandaloneDb)();
    const existingGoal = await db.query.goals.findFirst({
        where: (0, drizzle_orm_1.eq)(schema.goals.id, id)
    });
    if (!existingGoal) {
        throw new Error(`Goal with id ${id} not found`);
    }
    const associatedTasks = await db.query.tasks.findMany({
        where: (0, drizzle_orm_1.eq)(schema.tasks.goal_id, id)
    });
    if (associatedTasks.length > 0) {
        await db.delete(schema.tasks)
            .where((0, drizzle_orm_1.eq)(schema.tasks.goal_id, id));
    }
    await db.delete(schema.goals)
        .where((0, drizzle_orm_1.eq)(schema.goals.id, id));
    return {
        message: "Objetivo excluído com sucesso",
        goal_id: id,
    };
}, {
    name: 'delete_goal',
    description: 'Deleta um objetivo',
    schema: zod_1.default.object({
        id: zod_1.default.number().describe("ID do objetivo (obrigatório)"),
    })
});
//# sourceMappingURL=delete-goal.tool.js.map