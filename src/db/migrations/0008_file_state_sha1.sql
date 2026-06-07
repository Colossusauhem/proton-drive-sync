-- Add content SHA1 hash column to file_state for startup dedup
-- When mtime:size changes (e.g. after macOS reboot) but SHA1 matches,
-- the file can be skipped without making API calls
ALTER TABLE `file_state` ADD `content_sha1` text;
