import React from 'react';
import { StatCard } from '../components/StatCard';
import { kpiStats, recentActivity } from '../lib/mockData';
import { Activity } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <section>
        <h2 className="text-2xl font-light text-winter-900 mb-1 px-1">Overview</h2>
        <p className="text-winter-600 text-sm mb-6 px-1">Enterprise Workflow Intelligence</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiStats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      <section className="bg-white/30 backdrop-blur-md border border-winter-200 rounded-2xl p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Activity size={20} className="text-winter-500" />
          <h3 className="text-lg font-medium text-winter-900">Recent Activity</h3>
        </div>
        
        <div className="space-y-1">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-white/50 rounded-lg transition-colors cursor-default group gap-2 sm:gap-4">
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden min-w-0">
                <div className="w-2 h-2 rounded-full bg-winter-300 group-hover:bg-winter-500 transition-colors shrink-0"></div>
                <span className="text-sm font-medium text-winter-900 truncate">{item.target}</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-winter-100 text-winter-600 border border-winter-200 shrink-0">
                  {item.action}
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pl-5 sm:pl-0">
                <span className="text-xs text-winter-500 font-medium">{item.user}</span>
                <span className="text-xs text-winter-400 w-auto sm:w-16 text-right whitespace-nowrap">{item.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};