import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mic, Paperclip, Globe, ScanEye, ChevronDown, Square, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerplexityInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

// Add type definition for SpeechRecognition if not available globally
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const PerplexityInput: React.FC<PerplexityInputProps> = ({ onSubmit, placeholder = "Ask anything...", isLoading = false }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value);
      setValue('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
      if (isListening) stopListening();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Voice Recognition Logic
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => setIsListening(true);
    
    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
           // Optional: Handle interim results
        }
      }
      if (finalTranscript) {
        setValue(prev => prev + (prev ? ' ' : '') + finalTranscript);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      stopListening();
    };

    recognitionRef.current.onend = () => {
      // If we didn't manually stop, restart or just end based on logic.
      // For now, let's just let it end to be safe.
      if (isListening) setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <motion.div 
      className={`
        relative w-full max-w-3xl mx-auto transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${isFocused ? 'scale-[1.01]' : ''}
      `}
    >
      <div 
        className={`
          relative flex flex-col w-full bg-[#F5F7FA] border transition-all duration-300 rounded-[32px] overflow-hidden
          ${isFocused || isListening 
            ? 'border-winter-300 shadow-[0_8px_30px_rgba(168,199,231,0.15)] bg-white' 
            : 'border-[#E3EAF0] shadow-sm hover:shadow-md hover:border-winter-200'}
        `}
      >
        {/* Top Area: Focus Badge & Input */}
        <div className="flex items-start gap-3 p-4">
          {/* Left Focus Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-winter-200 text-xs font-medium text-winter-600 hover:bg-winter-50 hover:border-winter-300 cursor-pointer transition-colors shrink-0 mt-1">
            <ScanEye size={14} className="text-winter-500" />
            <span>Focus</span>
            <ChevronDown size={12} className="text-winter-400" />
          </div>

          {/* Center Input */}
          <div className="flex-1 min-w-0 relative">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent border-none outline-none text-base md:text-lg text-winter-900 placeholder-[#A0BEDC] resize-none overflow-hidden py-1 px-1 leading-relaxed"
              placeholder={isListening ? "Listening..." : placeholder}
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
            />
            {isListening && (
              <motion.div 
                className="absolute -left-8 top-1/2 -translate-y-1/2 flex gap-1 h-6 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                 {/* Animated Waveform */}
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-winter-500 rounded-full"
                    animate={{ height: [8, 16, 6, 12, 8] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-winter-400 hover:text-winter-600 hover:bg-winter-100/50 transition-all" title="Attach file">
              <Paperclip size={18} strokeWidth={2} />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-winter-500 bg-winter-50 hover:bg-winter-100 transition-all">
              <Globe size={14} />
              <span>Search Web</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Voice Button */}
            <button 
              onClick={toggleListening}
              className={`
                p-2 rounded-full transition-all duration-300 relative group
                ${isListening ? 'bg-red-50 text-red-500' : 'text-winter-400 hover:text-winter-600 hover:bg-winter-100/50'}
              `}
              title="Voice Mode"
            >
              {isListening ? (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Square size={18} fill="currentColor" strokeWidth={0} />
                </motion.div>
              ) : (
                 <Mic size={20} strokeWidth={2} />
              )}
              {isListening && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Separator */}
            <div className="w-px h-5 bg-winter-200" />

            {/* Submit Button */}
            <button
              onClick={() => handleSubmit()}
              disabled={!value.trim() || isLoading}
              className={`
                w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                ${value.trim() && !isLoading
                  ? 'bg-winter-500 text-white hover:bg-winter-600 hover:scale-105 hover:shadow-md' 
                  : 'bg-winter-100 text-winter-300 cursor-not-allowed'}
              `}
            >
              {isLoading ? (
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Sparkles size={16} />
                 </motion.div>
              ) : (
                 <ArrowRight size={18} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <AnimatePresence>
        {isFocused && !value && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-8 left-6 text-xs font-medium text-winter-400 flex items-center gap-2"
          >
            <span>Pro Tip:</span>
            <span className="opacity-70">Try "Analyze Q3 reports" or "Create invoice workflow"</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};