ALTER TABLE `users` DROP INDEX `users_email_unique`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(255);