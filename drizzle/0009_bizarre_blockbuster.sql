CREATE TABLE `reminders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`content` varchar(255) NOT NULL,
	`schedule_time` timestamp NOT NULL,
	`frequency` varchar(255) NOT NULL,
	`task_id` int,
	`goal_id` int,
	CONSTRAINT `reminders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `reminders` ADD CONSTRAINT `reminders_task_id_tasks_id_fk` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reminders` ADD CONSTRAINT `reminders_goal_id_goals_id_fk` FOREIGN KEY (`goal_id`) REFERENCES `goals`(`id`) ON DELETE cascade ON UPDATE no action;