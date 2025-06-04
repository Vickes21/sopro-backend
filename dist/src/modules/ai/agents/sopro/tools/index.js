"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOOLS = void 0;
const create_task_tool_1 = require("./create-task.tool");
const list_tasks_tool_1 = require("./list-tasks.tool");
const update_task_tool_1 = require("./update-task.tool");
const delete_task_tool_1 = require("./delete-task.tool");
const create_goal_tool_1 = require("./create-goal.tool");
const update_goal_tool_1 = require("./update-goal.tool");
const delete_goal_tool_1 = require("./delete-goal.tool");
const list_goals_tool_1 = require("./list-goals.tool");
const create_reminder_tool_1 = require("./create-reminder.tool");
const update_reminder_tool_1 = require("./update-reminder.tool");
const delete_reminder_tool_1 = require("./delete-reminder.tool");
const list_reminders_tool_1 = require("./list-reminders.tool");
const send_reminder_tool_1 = require("./send-reminder.tool");
const update_contact_tool_1 = require("./update-contact.tool");
exports.TOOLS = [
    create_task_tool_1.createTask,
    update_task_tool_1.updateTask,
    delete_task_tool_1.deleteTask,
    list_tasks_tool_1.listTasks,
    create_goal_tool_1.createGoal,
    update_goal_tool_1.updateGoal,
    delete_goal_tool_1.deleteGoal,
    list_goals_tool_1.listGoals,
    create_reminder_tool_1.createReminder,
    update_reminder_tool_1.updateReminder,
    delete_reminder_tool_1.deleteReminder,
    list_reminders_tool_1.listReminders,
    send_reminder_tool_1.sendReminder,
    update_contact_tool_1.updateContact,
];
//# sourceMappingURL=index.js.map