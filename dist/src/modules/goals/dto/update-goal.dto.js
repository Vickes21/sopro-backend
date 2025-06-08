"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGoalSchema = void 0;
const v4_1 = require("zod/v4");
exports.updateGoalSchema = v4_1.z.object({
    user_id: v4_1.z.number().optional(),
    period: v4_1.z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
    category: v4_1.z.enum(['personal', 'professional']).optional(),
    title: v4_1.z.string().optional(),
    description: v4_1.z.string().optional(),
    status: v4_1.z.enum(['not_started', 'in_progress', 'completed', 'abandoned']).optional(),
    priority: v4_1.z.enum(['high', 'medium', 'low']).optional(),
    start_date: v4_1.z.string().optional(),
    end_date: v4_1.z.string().optional(),
});
//# sourceMappingURL=update-goal.dto.js.map