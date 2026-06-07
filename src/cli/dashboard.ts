import { Command } from 'commander';
import { startDashboard } from '../dashboard/server.js';
import { logger } from '../logger.js';
import { getConfig } from '../config.js';

export function dashboardCommand(this: Command): void {
  logger.info('Starting dashboard...');

  const config = getConfig();
  startDashboard(config);

  // Keep process alive
  process.on('SIGINT', () => {
    logger.info('Stopping dashboard...');
    process.exit(0);
  });
}
