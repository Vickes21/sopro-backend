ALTER TABLE `users` ADD `onboarding_completed` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `onboarding_step` int DEFAULT 1 NOT NULL;