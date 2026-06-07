import type { FC } from 'hono/jsx';
import { Icon } from './Icon.js';

type Props = {
  enabled: boolean;
};

export const StartOnLoginSection: FC<Props> = ({ enabled }) => {
  const bgClass = enabled ? 'bg-proton' : 'bg-gray-600';
  const knobClass = enabled ? 'translate-x-6' : 'translate-x-1';
  const ariaChecked = enabled ? 'true' : 'false';

  return (
    <div
      id="start-on-login-section"
      class="bg-gray-800 rounded-xl border border-gray-700 p-6 h-[88px] flex items-center"
    >
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-white">Start on Login</h3>
          <div class="relative group flex items-center">
            <Icon name="info" class="w-4 h-4 text-gray-500 cursor-help" />
            <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-xs text-gray-300 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              When enabled, Proton Drive Sync will automatically start when you log in.
            </div>
          </div>
        </div>
        <button
          onclick="toggleService(this)"
          class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-proton focus:ring-offset-2 focus:ring-offset-gray-800 ${bgClass}`}
          role="switch"
          aria-checked={ariaChecked}
        >
          <span
            class={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${knobClass}`}
          ></span>
        </button>
      </div>
    </div>
  );
};
