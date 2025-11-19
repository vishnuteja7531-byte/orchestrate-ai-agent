"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlayCircle, ScrollText, HelpCircle, Settings, PanelLeftClose } from 'lucide-react';
import { motion } from 'framer-motion';

interface WinterSidebarProps {
  onToggle: () => void;
  isOpen: boolean;
}

export const WinterSidebar: React.FC<WinterSidebarProps> = ({ onToggle, isOpen }) => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/execute', label: 'Execution', icon: PlayCircle },
    { href: '/logs', label: 'System Logs', icon: ScrollText },
    { href: '/why', label: 'Why Engine', icon: HelpCircle },
  ];

  const sidebarVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      variants={sidebarVariants}
      transition={{ 
        duration: 0.35, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={`
        fixed left-0 top-0 h-full w-64 bg-[#F5F7FA]/95 backdrop-blur-xl border-r border-winter-200 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.04)] flex flex-col
      `}
    >
      <div className="p-5 md:p-6 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-winter-900 font-semibold text-xl tracking-tight">
          <div className="w-3 h-3 rounded-full bg-winter-500 shadow-[0_0_10px_rgba(168,199,231,0.6)]"></div>
          Orchestrate
        </div>
        <button 
          onClick={onToggle}
          className="p-2 rounded-md text-winter-600 hover:bg-winter-200/50 hover:text-winter-900 transition-colors focus:outline-none focus:ring-2 focus:ring-winter-200"
          aria-label="Close Sidebar"
        >
          <PanelLeftClose size={18} strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium 
                transition-all duration-200 ease-out group overflow-hidden select-none
                ${isActive 
                  ? 'bg-white/70 text-winter-900 shadow-sm ring-1 ring-black/5' 
                  : 'text-winter-600 hover:bg-white/50 hover:text-winter-900 hover:shadow-sm hover:scale-[1.02]'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-winter-500 rounded-r-full" />
              )}
              <Icon 
                size={18} 
                className={`transition-colors duration-200 shrink-0 ${isActive ? 'text-winter-500' : 'text-winter-400 group-hover:text-winter-600'}`} 
                strokeWidth={1.8}
              />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-winter-200/50 bg-winter-50/30">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-winter-600 hover:bg-white/60 hover:text-winter-900 hover:scale-[1.02] transition-all duration-200 select-none">
            <Settings size={18} strokeWidth={1.8} className="text-winter-400 shrink-0" />
            Settings
        </button>
      </div>
    </motion.aside>
  );
};