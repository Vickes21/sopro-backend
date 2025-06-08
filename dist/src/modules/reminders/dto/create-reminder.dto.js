"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReminderSchema = void 0;
const v4_1 = require("zod/v4");
exports.createReminderSchema = v4_1.z.object({
    user_id: v4_1.z.number(),
    content: v4_1.z.string(),
    schedule_time: v4_1.z.date(),
    frequency: v4_1.z.enum(['once', 'daily', 'weekly', 'monthly']),
    task_id: v4_1.z.number().optional(),
    goal_id: v4_1.z.number().optional(),
});
//# sourceMappingURL=create-reminder.dto.js.map