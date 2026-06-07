import type { FC } from 'hono/jsx';
import type { DashboardJob } from './types.js';
import { formatPath } from './utils.js';
import { Icon } from './Icon.js';

type Props = {
  jobs: DashboardJob[];
  count: number;
  limit: number;
};

export const PendingQueue: FC<Props> = ({ jobs, count, limit }) => {
  const displayJobs = jobs.slice(0, limit);
  const isTruncated = jobs.length > limit;

  return (
    <>
      {/* Header */}
      <div class="px-5 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800/50 backdrop-blur rounded-t-xl">
        <h2 class="text-sm font-semibold text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          Pending
        </h2>
        <div class="flex items-center gap-3">
          <div class="h-7"></div>
          <span class="text-xs font-mono text-gray-500">{count} items</span>
        </div>
      </div>

      {/* List */}
      <div class="flex-1 overflow-y-auto custom-scrollbar p-2">
        {displayJobs.length === 0 ? (
          <div class="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
            <p class="text-sm">Queue empty</p>
          </div>
        ) : (
          <div class="space-y-1">
            {displayJobs.map((job) => (
              <div
                id={`pending-${job.id}`}
                class="px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors flex items-center gap-3"
              >
                <Icon name="clock" class="w-4 h-4 text-amber-500 shrink-0" />
                <div class="min-w-0 flex-1">
                  <span class="text-xs font-mono text-gray-300 truncate block">
                    {formatPath(job.localPath)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Truncation footer */}
      {isTruncated && (
        <div class="px-5 py-2 border-t border-gray-700 bg-gray-800/30">
          <span class="text-xs text-gray-500">
            Showing {displayJobs.length} of {count}
          </span>
        </div>
      )}
    </>
  );
};
