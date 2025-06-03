ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_goal_id_goals_id_fk`;
--> statement-breakpoint
ALTER TABLE `goals` MODIFY COLUMN `user_id` int;--> statement-breakpoint
ALTER TABLE `goals` ADD CONSTRAINT `goals_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_goal_id_goals_id_fk` FOREIGN KEY (`goal_id`) REFERENCES `goals`(`id`) ON DELETE set null ON UPDATE no action;