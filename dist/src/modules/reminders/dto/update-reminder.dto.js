"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReminderSchema = void 0;
const v4_1 = require("zod/v4");
exports.updateReminderSchema = v4_1.z.object({
    content: v4_1.z.string().optional(),
    schedule_time: v4_1.z.date().optional(),
    frequency: v4_1.z.enum(['once', 'daily', 'weekly', 'monthly']).optional(),
    task_id: v4_1.z.number().optional(),
    goal_id: v4_1.z.number().optional(),
});
//# sourceMappingURL=update-reminder.dto.js.map