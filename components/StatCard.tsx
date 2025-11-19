import React from 'react';
import { KpiData } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard: React.FC<KpiData> = ({ label, value, trend, change }) => {
  return (
    <div className="bg-white/40 backdrop-blur-md border border-winter-100 p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] w-full min-w-0">
      <h3 className="text-sm font-medium text-winter-600 mb-2 truncate">{label}</h3>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl md:text-3xl font-semibold text-winter-900 tracking-tight truncate max-w-[70%]">{value}</span>
        <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full border shrink-0
          ${trend === 'up' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100' : 
            trend === 'down' ? 'bg-red-50/50 text-red-600 border-red-100' : 
            'bg-winter-100 text-winter-600 border-winter-200'}
        `}>
          {trend === 'up' && <TrendingUp size={12} />}
          {trend === 'down' && <TrendingDown size={12} />}
          {trend === 'neutral' && <Minus size={12} />}
          {change}
        </div>
      </div>
    </div>
  );
};