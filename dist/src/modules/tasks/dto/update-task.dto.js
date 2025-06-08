"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = void 0;
const v4_1 = require("zod/v4");
exports.updateTaskSchema = v4_1.z.object({
    user_id: v4_1.z.number().optional(),
    goal_id: v4_1.z.number().optional(),
    title: v4_1.z.string().optional(),
    description: v4_1.z.string().optional(),
    due_date: v4_1.z.date().optional(),
    priority: v4_1.z.enum(['high', 'medium', 'low']).optional(),
    status: v4_1.z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional(),
});
//# sourceMappingURL=update-task.dto.js.map