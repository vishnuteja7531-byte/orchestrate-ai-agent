"use client";
import React, { useState, useEffect } from 'react';
import { WinterSidebar } from '@/components/WinterSidebar';
import { FrostHeader } from '@/components/FrostHeader';
import { AnimatePresence, motion } from 'framer-motion';

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-winter-100 to-[#E8F1F8] overflow-x-hidden text-winter-900">
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-winter-900/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {(isSidebarOpen || !isMobile) && (
          <WinterSidebar 
            onToggle={() => setIsSidebarOpen(false)}
            isOpen={isSidebarOpen}
          />
        )}
      </AnimatePresence>

      <div className={`
        flex-1 flex flex-col min-h-screen transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full max-w-[100vw]
        ${isSidebarOpen && !isMobile ? 'md:ml-64' : 'ml-0'}
      `}>
        <FrostHeader 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};