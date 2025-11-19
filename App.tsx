import React, { useState, useEffect } from 'react';
import { WinterSidebar } from './components/WinterSidebar';
import { FrostHeader } from './components/FrostHeader';
import { Dashboard } from './pages/Dashboard';
import { ExecutionStream } from './pages/ExecutionStream';
import { LogsPage } from './pages/LogsPage';
import { WhyPage } from './pages/WhyPage';
import { AnimatePresence, motion } from 'framer-motion';

// Simple routing types since we are in an SPA environment simulating Next.js
export type PageRoute = 'dashboard' | 'execute' | 'logs' | 'why';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive states
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, start closed. On desktop, start open.
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'execute':
        return <ExecutionStream />;
      case 'logs':
        return <LogsPage />;
      case 'why':
        return <WhyPage />;
      default:
        return <Dashboard />;
    }
  };

  const closeSidebarMobile = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-winter-100 to-[#E8F1F8] overflow-x-hidden text-winter-900">
      {/* Mobile Backdrop Overlay */}
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

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(isSidebarOpen || !isMobile) && (
          <WinterSidebar 
            activePage={currentPage} 
            onNavigate={(page) => {
              setCurrentPage(page);
              closeSidebarMobile();
            }} 
            onToggle={() => setIsSidebarOpen(false)}
            isOpen={isSidebarOpen}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`
        flex-1 flex flex-col min-h-screen transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full max-w-[100vw]
        ${isSidebarOpen && !isMobile ? 'md:ml-64' : 'ml-0'}
      `}>
        <FrostHeader 
          pageTitle={currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;