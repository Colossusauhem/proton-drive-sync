CREATE TABLE `clocks` (
	`directory` text PRIMARY KEY NOT NULL,
	`clock` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `signals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`signal` text NOT NULL,
	`created_at` integer NOT NULL
);
