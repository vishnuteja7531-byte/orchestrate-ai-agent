import React from 'react';
import { WhyReasonCard } from '../components/WhyReasonCard';
import { whyReasons } from '../lib/mockData';
import { Lightbulb } from 'lucide-react';

export const WhyPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-start justify-between mb-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-light text-winter-900 mb-2 flex items-center gap-3">
            Why Engine
            <Lightbulb className="text-winter-500" size={24} />
          </h2>
          <p className="text-winter-600 leading-relaxed text-sm md:text-base">
            Transparent reasoning for autonomous decisions. The system evaluates context, resource availability, and security policies to optimize workflow paths.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {whyReasons.map((reason) => (
          <WhyReasonCard key={reason.id} {...reason} />
        ))}
      </div>

      <div className="mt-8 p-4 md:p-6 rounded-xl bg-gradient-to-r from-winter-500/10 to-transparent border border-winter-200">
        <h4 className="text-sm font-semibold text-winter-800 mb-2">System Confidence Metrics</h4>
        <div className="h-2 w-full bg-winter-200 rounded-full overflow-hidden">
            <div className="h-full w-[94%] bg-winter-500 rounded-full"></div>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mt-2 text-xs text-winter-500 font-medium gap-1">
            <span>Global Accuracy: 94.2%</span>
            <span>Last Updated: Just now</span>
        </div>
      </div>
    </div>
  );
};