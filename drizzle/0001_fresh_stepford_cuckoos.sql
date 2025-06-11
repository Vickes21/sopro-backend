ALTER TABLE `tasks` MODIFY COLUMN `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` MODIFY COLUMN `goal_id` int;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `conversation_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `reminders` MODIFY COLUMN `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `reminders` MODIFY COLUMN `task_id` int;--> statement-breakpoint
ALTER TABLE `reminders` MODIFY COLUMN `goal_id` int;