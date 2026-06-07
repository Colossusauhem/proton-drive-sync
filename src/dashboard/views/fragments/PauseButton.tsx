import type { FC } from 'hono/jsx';
import type { SyncStatus } from './types.js';
import { Icon } from './Icon.js';

type Props = {
  syncStatus: SyncStatus;
};

export const PauseButton: FC<Props> = ({ syncStatus }) => {
  if (syncStatus === 'disconnected') {
    return <div id="pause-button" class="h-7"></div>;
  }

  if (syncStatus === 'paused') {
    return (
      <button
        id="pause-button"
        hx-post="/api/toggle-pause"
        hx-swap="outerHTML"
        class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-green-500/30 hover:border-green-500/50 hover:bg-green-500/10 transition-colors cursor-pointer"
      >
        <Icon name="circle-play" class="h-3 w-3 text-green-400" />
        <span class="text-xs font-medium text-green-400">Resume Sync</span>
      </button>
    );
  }

  // syncing state
  return (
    <button
      id="pause-button"
      hx-post="/api/toggle-pause"
      hx-swap="outerHTML"
      class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-600 hover:border-amber-500/50 hover:bg-amber-500/10 transition-colors cursor-pointer"
    >
      <Icon name="circle-pause" class="h-3 w-3 text-gray-400 hover:text-amber-400" />
      <span class="text-xs font-medium text-gray-400">Pause Sync</span>
    </button>
  );
};
