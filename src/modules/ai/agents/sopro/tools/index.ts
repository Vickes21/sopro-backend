import { createTask } from 'src/modules/ai/agents/sopro/tools/create-task.tool';
import { listTasks } from 'src/modules/ai/agents/sopro/tools/list-tasks.tool';
import { updateTask } from 'src/modules/ai/agents/sopro/tools/update-task.tool';
import { deleteTask } from 'src/modules/ai/agents/sopro/tools/delete-task.tool';
import { createGoal } from 'src/modules/ai/agents/sopro/tools/create-goal.tool';
import { updateGoal } from 'src/modules/ai/agents/sopro/tools/update-goal.tool';
import { deleteGoal } from 'src/modules/ai/agents/sopro/tools/delete-goal.tool';
import { listGoals } from 'src/modules/ai/agents/sopro/tools/list-goals.tool';
import { createReminder } from 'src/modules/ai/agents/sopro/tools/create-reminder.tool';
import { updateReminder } from 'src/modules/ai/agents/sopro/tools/update-reminder.tool';
import { deleteReminder } from 'src/modules/ai/agents/sopro/tools/delete-reminder.tool';
import { listReminders } from 'src/modules/ai/agents/sopro/tools/list-reminders.tool';
import { sendReminder } from 'src/modules/ai/agents/sopro/tools/send-reminder.tool';


export const TOOLS = [
  createTask,
  updateTask,
  deleteTask,
  listTasks,
  createGoal,
  updateGoal,
  deleteGoal,
  listGoals,
  createReminder,
  updateReminder,
  deleteReminder,
  listReminders,
  sendReminder,
]