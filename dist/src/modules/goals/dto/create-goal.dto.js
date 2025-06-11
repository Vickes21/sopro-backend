"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoalSchema = void 0;
const v4_1 = require("zod/v4");
exports.createGoalSchema = v4_1.z.object({
    period: v4_1.z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    category: v4_1.z.enum(['personal', 'professional']),
    title: v4_1.z.string(),
    description: v4_1.z.string().optional(),
    status: v4_1.z.enum(['not_started', 'in_progress', 'completed', 'abandoned']),
    priority: v4_1.z.enum(['high', 'medium', 'low']),
    start_date: v4_1.z.date(),
    end_date: v4_1.z.date(),
});
//# sourceMappingURL=create-goal.dto.js.map