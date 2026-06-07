import { basename } from 'node:path';

export function formatPath(path: string): string {
  return basename(path);
}

export function formatTime(date: Date | string | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString();
}
