import React from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle2, Code2, Database, Loader2 } from 'lucide-react';
import { ExecutionStep as IExecutionStep } from '../types';

export const ExecutionStep: React.FC<IExecutionStep> = ({ title, description, status, iconType }) => {
  const getIcon = () => {
    const props = { size: 18, strokeWidth: 1.5 };
    switch (iconType) {
      case 'brain': return <Brain {...props} />;
      case 'database': return <Database {...props} />;
      case 'code': return <Code2 {...props} />;
      case 'check': return <CheckCircle2 {...props} />;
      default: return <Brain {...props} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 group w-full"
    >
      <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-500 shrink-0
          ${status === 'completed' ? 'bg-winter-300 border-winter-400 text-winter-900' : 
            status === 'running' ? 'bg-white border-winter-500 text-winter-500 shadow-[0_0_15px_rgba(168,199,231,0.4)]' : 
            'bg-white/50 border-winter-200 text-winter-300'}
        `}>
          {status === 'running' ? <Loader2 size={16} className="animate-spin" /> : getIcon()}
        </div>
        {/* Line connects steps only on desktop or if we adjusted layout, but simpler is to hide line on mobile or adjust */}
        <div className={`hidden sm:block w-0.5 flex-1 my-2 rounded-full transition-colors duration-500 min-h-[20px] ${status === 'completed' ? 'bg-winter-200' : 'bg-winter-100'}`}></div>
      </div>

      <div className={`
        flex-1 p-4 mb-2 sm:mb-4 rounded-xl border backdrop-blur-sm transition-all duration-300 w-full
        ${status === 'running' ? 'bg-white/80 border-winter-300 shadow-sm' : 'bg-white/40 border-winter-100'}
      `}>
        <h4 className={`text-sm font-semibold mb-1 ${status === 'pending' ? 'text-winter-400' : 'text-winter-900'}`}>
          {title}
        </h4>
        <p className={`text-sm leading-relaxed ${status === 'pending' ? 'text-winter-300' : 'text-winter-600'}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};