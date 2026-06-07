/**
 * Environment Detection Helpers
 *
 * Detects runtime environments like Flatpak sandbox and Docker containers.
 * Used across the codebase to adapt behavior for sandboxed or containerized contexts.
 */

import { existsSync } from 'fs';

// ============================================================================
// Flatpak Detection
// ============================================================================

/**
 * Whether the process is running inside a Flatpak sandbox.
 *
 * Detection uses two signals:
 * - `FLATPAK_ID` environment variable (set by Flatpak runtime)
 * - `/.flatpak-info` file (present in all Flatpak sandboxes)
 */
export function isFlatpak(): boolean {
  return !!process.env.FLATPAK_ID || existsSync('/.flatpak-info');
}

// ============================================================================
// Docker Detection
// ============================================================================

/**
 * Whether the process is running inside a Docker container.
 *
 * Checks the `DOCKER` environment variable (set to '1' in the project's Docker config).
 */
export function isDocker(): boolean {
  return process.env.DOCKER === '1';
}
