import React, { useState, useRef, useEffect } from 'react';
import { LogItem } from '../components/LogItem';
import { logsData } from '../lib/mockData';
import { Filter, Search, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogsPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLogs = logsData.filter(log => {
    const matchesStatus = activeStatus ? log.status === activeStatus : true;
    const matchesSearch = 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-20">
        <div>
          <h2 className="text-2xl font-light text-winter-900">System Logs</h2>
          <p className="text-winter-600 text-sm mt-1">Real-time telemetry and execution traces</p>
        </div>
        
        <div className="relative w-full md:w-auto" ref={filterRef}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`
              flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all w-full md:w-auto
              ${isFilterOpen || activeStatus || searchQuery 
                ? 'bg-winter-100 border-winter-300 text-winter-900 shadow-sm' 
                : 'bg-white border-winter-200 text-winter-600 hover:bg-winter-50'}
            `}
          >
            <Filter size={16} />
            Filter Logs
            {(activeStatus || searchQuery) && (
              <span className="flex h-2 w-2 rounded-full bg-winter-500 ml-1 animate-pulse"></span>
            )}
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 left-0 md:left-auto top-full mt-3 w-full md:w-72 bg-white/95 backdrop-blur-xl border border-winter-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-xl p-4 z-50"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-winter-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-winter-50 border border-winter-200 rounded-lg text-sm text-winter-800 placeholder-winter-400 focus:outline-none focus:ring-2 focus:ring-winter-200 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-winter-500 uppercase tracking-wider mb-2 block">Status</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['success', 'warning', 'error', 'info'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setActiveStatus(activeStatus === status ? null : status)}
                          className={`
                            flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border transition-all
                            ${activeStatus === status 
                              ? 'bg-winter-100 border-winter-300 text-winter-900 shadow-sm' 
                              : 'bg-transparent border-transparent hover:bg-winter-50 text-winter-600'}
                          `}
                        >
                          <div className={`w-2 h-2 rounded-full 
                            ${status === 'success' ? 'bg-emerald-500' :
                              status === 'warning' ? 'bg-amber-500' :
                              status === 'error' ? 'bg-red-500' : 'bg-winter-500'
                            }
                          `} />
                          <span className="capitalize">{status}</span>
                          {activeStatus === status && <CheckCircle2 size={12} className="ml-auto text-winter-400" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-winter-100 flex justify-between items-center">
                    <button 
                      onClick={() => { setActiveStatus(null); setSearchQuery(''); }}
                      className={`text-xs font-medium transition-colors ${activeStatus || searchQuery ? 'text-winter-600 hover:text-winter-900' : 'text-winter-300 cursor-default'}`}
                      disabled={!activeStatus && !searchQuery}
                    >
                      Reset Defaults
                    </button>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="px-3 py-1.5 bg-winter-900 text-white text-xs font-medium rounded-lg hover:bg-winter-800 transition-colors shadow-sm"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl border border-winter-200 rounded-xl shadow-sm overflow-hidden min-h-[400px] w-full">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center px-4 py-3 border-b border-winter-200/50 bg-winter-50/50 text-xs font-medium text-winter-400 uppercase tracking-wider">
          <div className="w-8"></div>
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-8">Event Detail</div>
            <div className="col-span-2 text-right">Latency</div>
          </div>
        </div>

        <div className="divide-y divide-winter-100">
          <AnimatePresence mode='popLayout'>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LogItem {...log} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="p-12 text-center flex flex-col items-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-winter-50 mb-3">
                  <Search className="text-winter-300" size={20} />
                </div>
                <p className="text-winter-500 text-sm font-medium">No logs found matching your filters.</p>
                <button 
                    onClick={() => { setActiveStatus(null); setSearchQuery(''); }}
                    className="mt-2 text-winter-400 hover:text-winter-600 text-xs underline underline-offset-4 transition-colors"
                >
                    Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};