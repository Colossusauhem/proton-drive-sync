import type { FC } from 'hono/jsx';
import type { DashboardJob } from './types.js';
import { formatPath } from './utils.js';
import { Icon } from './Icon.js';

type Props = {
  jobs: DashboardJob[];
  count: number;
  limit: number;
};

export const BlockedQueue: FC<Props> = ({ jobs, count, limit }) => {
  const displayJobs = jobs.slice(0, limit);
  const isTruncated = jobs.length > limit;

  return (
    <>
      {/* Header */}
      <div class="px-5 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800/50 backdrop-blur rounded-t-xl min-h-[56px]">
        <h2 class="text-sm font-semibold text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          Failed Transfers
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
            <Icon name="circle-check" class="w-10 h-10 opacity-20" />
            <p class="text-sm">All systems nominal</p>
          </div>
        ) : (
          <div class="space-y-1">
            {displayJobs.map((job) => (
              <div
                id={`blocked-${job.id}`}
                class="px-3 py-2.5 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors group"
              >
                <div class="flex items-start gap-3">
                  <Icon name="triangle-alert" class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div class="min-w-0 flex-1">
                    <div class="text-xs font-mono text-red-200 truncate">
                      {formatPath(job.localPath)}
                    </div>
                    <div class="text-[10px] text-red-400/70 mt-1 line-clamp-2">
                      {job.lastError || ''}
                    </div>
                  </div>
                  <div class="shrink-0 text-[10px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                    Retry: {job.nRetries || 0}
                  </div>
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
