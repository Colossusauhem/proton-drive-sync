import type { FC } from 'hono/jsx';
import { Icon } from './Icon.js';

interface NoSyncDirsModalProps {
  redirectUrl?: string;
}

export const NoSyncDirsModal: FC<NoSyncDirsModalProps> = ({ redirectUrl }) => {
  const okAction = redirectUrl
    ? `window.location.href = '${redirectUrl}';`
    : `document.getElementById('no-sync-dirs-modal').remove();`;

  return (
    <div id="no-sync-dirs-modal" class="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div class="absolute inset-0 bg-black/60"></div>

      {/* Modal */}
      <div class="relative bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-xl">
        <div class="flex items-center gap-3 mb-4">
          <div class="flex items-center justify-center w-10 h-10 bg-yellow-500/20 rounded-full">
            <Icon name="alert-triangle" class="w-5 h-5 text-yellow-500" />
          </div>
          <h3 class="text-lg font-semibold text-white">No Sync Directories</h3>
        </div>

        <p class="text-gray-300 text-sm mb-6">
          No sync directories configured. Nothing will be synced until you add at least one
          directory.
        </p>

        {/* Button */}
        <div class="flex justify-end">
          <button
            type="button"
            onclick={okAction}
            class="px-4 py-2 bg-proton hover:bg-proton-dark text-white text-sm font-medium rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
