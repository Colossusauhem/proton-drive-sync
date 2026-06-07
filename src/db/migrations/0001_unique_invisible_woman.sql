CREATE TABLE `sync_jobs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_type` text NOT NULL,
	`local_path` text NOT NULL,
	`remote_path` text NOT NULL,
	`watch_root` text NOT NULL,
	`clock` text,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`retry_at` integer NOT NULL,
	`n_retries` integer DEFAULT 0 NOT NULL,
	`last_error` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_sync_jobs_status_retry` ON `sync_jobs` (`status`,`retry_at`);
