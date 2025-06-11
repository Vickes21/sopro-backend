"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const v4_1 = require("zod/v4");
exports.createTaskSchema = v4_1.z.object({
    goal_id: v4_1.z.number().optional(),
    title: v4_1.z.string(),
    due_date: v4_1.z.date().optional(),
    description: v4_1.z.string().optional(),
    priority: v4_1.z.enum(['high', 'medium', 'low']),
    status: v4_1.z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
});
//# sourceMappingURL=create-task.dto.js.map