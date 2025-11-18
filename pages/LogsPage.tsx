import React from 'react';
import { LogItem } from '../components/LogItem';
import { logsData } from '../lib/mockData';
import { Filter } from 'lucide-react';

export const LogsPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-light text-winter-900">System Logs</h2>
          <p className="text-winter-600 text-sm mt-1">Real-time telemetry and execution traces</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-winter-200 text-winter-600 text-sm font-medium hover:bg-winter-50 transition-colors w-full sm:w-auto">
          <Filter size={16} />
          Filter Logs
        </button>
      </div>

      <div className="bg-white/40 backdrop-blur-xl border border-winter-200 rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Header Row - Hidden on Mobile */}
        <div className="hidden sm:flex items-center px-4 py-3 border-b border-winter-200/50 bg-winter-50/50 text-xs font-medium text-winter-400 uppercase tracking-wider">
          <div className="w-8"></div> {/* Icon placeholder */}
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-8">Event Detail</div>
            <div className="col-span-2 text-right">Latency</div>
          </div>
        </div>

        <div className="divide-y divide-winter-100">
          {logsData.map((log) => (
            <LogItem key={log.id} {...log} />
          ))}
        </div>
        <div className="p-4 text-center text-xs text-winter-400 border-t border-winter-200/50 hover:bg-white/50 cursor-pointer transition-colors">
          Load older logs
        </div>
      </div>
    </div>
  );
};