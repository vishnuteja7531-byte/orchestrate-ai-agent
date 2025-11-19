import React, { useState, useEffect, useRef } from 'react';
import { PerplexityInput } from '../components/PerplexityInput';
import { ExecutionStep } from '../components/ExecutionStep';
import { ExecutionStep as IExecutionStep } from '../types';
import { motion } from 'framer-motion';

export const ExecutionStream: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [steps, setSteps] = useState<IExecutionStep[]>([]);
  const stepsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
       stepsEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    if (steps.length > 0) scrollToBottom();
  }, [steps]);

  const handleExecute = (task: string) => {
    setIsProcessing(true);
    setSteps([]);

    const timeline = [
      { id: '1', title: 'Analyzing Intent', description: `Deconstructing request: "${task}"`, iconType: 'brain' as const, delay: 800 },
      { id: '2', title: 'Context Retrieval', description: 'Querying vector database for relevant enterprise protocols...', iconType: 'database' as const, delay: 2400 },
      { id: '3', title: 'Formulating Plan', description: 'Identified 3 sub-tasks. Selecting optimized agents.', iconType: 'code' as const, delay: 4500 },
      { id: '4', title: 'Execution', description: 'Running specialized modules via secure sandbox...', iconType: 'brain' as const, delay: 7000 },
      { id: '5', title: 'Finalizing', description: 'Validating output against compliance policies.', iconType: 'check' as const, delay: 9500 },
    ];

    let currentStepIndex = 0;

    const processNextStep = () => {
      if (currentStepIndex >= timeline.length) {
        setIsProcessing(false);
        return;
      }

      const stepData = timeline[currentStepIndex];
      
      setSteps(prev => [
        ...prev.map(s => ({ ...s, status: 'completed' as const })), 
        { ...stepData, status: 'running' as const }
      ]);

      currentStepIndex++;
      
      if (currentStepIndex <= timeline.length) {
        setTimeout(processNextStep, stepData.delay - (timeline[currentStepIndex - 2]?.delay || 0));
      }
    };

    setTimeout(processNextStep, 400);
  };

  return (
    <div className="flex flex-col items-center min-h-[85vh] relative w-full px-2 md:px-0">
      {/* Input Container */}
      <div className={`
        w-full flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${steps.length > 0 ? 'mt-2 md:mt-6 scale-100 opacity-100' : 'mt-[20vh] md:mt-[30vh] scale-100'}
      `}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`
            text-2xl md:text-4xl font-medium text-winter-900 mb-6 md:mb-8 text-center tracking-tight px-4
            ${steps.length > 0 ? 'hidden' : 'block'}
          `}
        >
          Where workflow begins
        </motion.h2>
        
        <motion.div 
          className="w-full z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <PerplexityInput onSubmit={handleExecute} isLoading={isProcessing} />
        </motion.div>
      </div>

      {/* Steps Output Stream */}
      <div className="w-full max-w-3xl mt-6 md:mt-10 space-y-3 md:space-y-4 pb-24">
        {steps.map((step) => (
          <ExecutionStep key={step.id} {...step} />
        ))}
        <div ref={stepsEndRef} className="h-4" />
      </div>
    </div>
  );
};