"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search, PanelLeftOpen } from 'lucide-react';

interface FrostHeaderProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const FrostHeader: React.FC<FrostHeaderProps> = ({ isSidebarOpen = true, onToggleSidebar }) => {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    const pageName = pathname.substring(1);
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 px-4 md:px-8 flex items-center justify-between bg-[#F5F7FA]/80 backdrop-blur-xl border-b border-winter-200/60 transition-all duration-300">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        {/* Toggle Button */}
        <button 
          onClick={onToggleSidebar}
          className={`
            p-2 -ml-2 rounded-lg text-winter-600 hover:bg-winter-100 hover:text-winter-900 transition-all shrink-0
            ${isSidebarOpen ? 'md:hidden' : 'flex'} 
          `}
          aria-label="Open Sidebar"
        >
          <PanelLeftOpen size={22} strokeWidth={1.5} />
        </button>
        
        <h1 className="text-lg md:text-xl font-medium text-winter-900 tracking-tight truncate">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-winter-500/10 border border-winter-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-winter-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-winter-500"></span>
          </span>
          <span className="text-xs font-medium text-winter-600">Connected</span>
        </div>
        
        <div className="hidden md:block h-8 w-px bg-winter-200"></div>

        <button className="text-winter-600 hover:text-winter-900 transition-colors p-2 rounded-full hover:bg-winter-100">
          <Search size={18} strokeWidth={1.5} />
        </button>
        <button className="text-winter-600 hover:text-winter-900 transition-colors relative p-2 rounded-full hover:bg-winter-100">
          <Bell size={18} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-red-400 ring-1 ring-white"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-winter-300 to-winter-400 border border-white shadow-sm cursor-pointer hover:ring-2 ring-winter-200 transition-all shrink-0"></div>
      </div>
    </header>
  );
};