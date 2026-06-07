import type { FC } from 'hono/jsx';
import type { DashboardJob } from './types.js';
import { formatPath } from './utils.js';
import { Icon } from './Icon.js';

type Props = {
  jobs: DashboardJob[];
  count: number;
  limit: number;
};

export const RetryQueue: FC<Props> = ({ jobs, count, limit }) => {
  const displayJobs = jobs.slice(0, limit);
  const isTruncated = jobs.length > limit;

  return (
    <>
      {/* Header */}
      <div class="px-5 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800/50 backdrop-blur rounded-t-xl min-h-[56px]">
        <h2 class="text-sm font-semibold text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-orange-500"></span>
          Retry Queue
        </h2>
        <div class="flex items-center gap-3">
          {jobs.length > 0 ? (
            <button
              hx-post="/api/signal/retry-all-now"
              hx-target="#retry-queue"
              hx-swap="innerHTML"
              class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors cursor-pointer"
            >
              <Icon name="refresh-cw" class="h-3 w-3 text-orange-400" />
              <span class="text-xs font-medium text-orange-400">Retry All Now</span>
            </button>
          ) : (
            <div class="h-7"></div>
          )}
          <span class="text-xs font-mono text-gray-500">{count} items</span>
        </div>
      </div>

      {/* List */}
      <div class="flex-1 overflow-y-auto custom-scrollbar p-2">
        {displayJobs.length === 0 ? (
          <div class="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
            <Icon name="circle-check" class="w-10 h-10 opacity-20" />
            <p class="text-sm">No scheduled retries</p>
          </div>
        ) : (
          <div class="space-y-1">
            {displayJobs.map((job) => {
              const retryAtIso = job.retryAt
                ? typeof job.retryAt === 'string'
                  ? job.retryAt
                  : job.retryAt.toISOString()
                : '';
              return (
                <div
                  id={`retry-${job.id}`}
                  class="px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors flex items-center gap-3"
                >
                  <Icon name="refresh-cw" class="w-4 h-4 text-orange-500 shrink-0" />
                  <div class="min-w-0 flex-1 flex items-center justify-between gap-4">
                    <span class="text-xs font-mono text-gray-300 truncate">
                      {formatPath(job.localPath)}
                    </span>
                    <span
                      class="text-[10px] text-orange-400 font-mono whitespace-nowrap retry-countdown"
                      data-retry-at={retryAtIso}
                    ></span>
                  </div>
                </div>
              );
            })}
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
