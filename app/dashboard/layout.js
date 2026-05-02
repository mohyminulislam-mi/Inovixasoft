'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import { ToastProvider } from '@/components/dashboard/Toast';
import { ThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('sidebar_collapsed');
      if (saved !== null) setIsCollapsed(JSON.parse(saved));
    }, 0);
    
    // Listen for storage events (if changed in another tab or component)
    const handleStorage = () => {
      const savedNew = localStorage.getItem('sidebar_collapsed');
      if (savedNew !== null) setIsCollapsed(JSON.parse(savedNew));
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ToastProvider>
        <div className="min-h-screen bg-[#f4f6fb] dark:bg-[#0a0a0f] transition-colors duration-300">
          <Sidebar />
          
          <div className="flex flex-col min-h-screen">
            <TopBar isCollapsed={isCollapsed} />
            
            <main 
              className="flex-1 pt-20 pb-10 px-6 transition-all duration-300"
              style={{ paddingLeft: isCollapsed ? 'calc(70px + 1.5rem)' : 'calc(260px + 1.5rem)' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
