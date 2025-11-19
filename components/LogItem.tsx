import React from 'react';
import { LogEntry } from '../types';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export const LogItem: React.FC<LogEntry> = ({ timestamp, status, message, duration }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success': return { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500' };
      case 'warning': return { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500' };
      case 'error': return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500' };
      case 'info': return { icon: Info, color: 'text-winter-500', bg: 'bg-winter-500' };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 px-4 hover:bg-white/40 active:bg-white/50 rounded-lg transition-colors group relative overflow-hidden border-b border-transparent hover:border-winter-100 sm:border-b-0">
      {/* Left Status Indicator Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bg} opacity-0 group-hover:opacity-20 transition-opacity`}></div>

      {/* Mobile Header Row */}
      <div className="flex items-center justify-between sm:hidden w-full">
        <div className="flex items-center gap-2">
           <Icon size={16} className={config.color} />
           <span className="text-xs font-mono text-winter-400">{timestamp}</span>
        </div>
        <span className="text-xs text-winter-400">{duration}</span>
      </div>

      {/* Desktop Icon */}
      <div className="hidden sm:block shrink-0 pt-1 sm:pt-0">
         <Icon size={16} className={config.color} />
      </div>

      {/* Content Area */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-start sm:items-center min-w-0">
        <span className="hidden sm:block col-span-2 text-xs font-mono text-winter-400 whitespace-nowrap">{timestamp}</span>
        <span className="col-span-12 sm:col-span-8 text-sm text-winter-700 font-medium break-words leading-snug">{message}</span>
        <span className="hidden sm:block col-span-2 text-right text-xs text-winter-400 group-hover:text-winter-600 transition-colors">
          {duration && duration}
        </span>
      </div>
    </div>
  );
};