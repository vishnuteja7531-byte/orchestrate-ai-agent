import React from 'react';
import { WhyReason } from '../types';
import { ShieldCheck, Zap, Target, Lock } from 'lucide-react';

export const WhyReasonCard: React.FC<WhyReason> = ({ title, description, confidence, riskLevel }) => {
  const getIcon = () => {
    if (title.includes('Pattern')) return Target;
    if (title.includes('Security')) return Lock;
    if (title.includes('Resource')) return Zap;
    return ShieldCheck;
  };

  const Icon = getIcon();

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-winter-200 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300 w-full">
      <div className="flex items-start justify-between mb-4 gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-winter-100 rounded-lg text-winter-600 shrink-0">
            <Icon size={20} strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-winter-900 text-sm md:text-base">{title}</h3>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl md:text-2xl font-bold text-winter-500">{confidence}%</div>
          <div className="text-[10px] uppercase tracking-wider text-winter-400 font-medium">Confidence</div>
        </div>
      </div>
      
      <p className="text-sm text-winter-600 leading-relaxed mb-4 break-words">
        {description}
      </p>

      <div className="flex items-center gap-2 pt-4 border-t border-winter-100">
        <span className="text-xs text-winter-400 font-medium uppercase tracking-wider">Risk Level:</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full 
          ${riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-700' : 
            riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
          {riskLevel}
        </span>
      </div>
    </div>
  );
};