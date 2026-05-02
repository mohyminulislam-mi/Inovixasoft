'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="p-2 w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-xl bg-bg-secondary border border-border-primary text-text-primary hover:scale-110 active:scale-95 transition-all outline-none"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {theme === 'dark' ? <Moon size={20} className="text-brand-blue" /> : <Sun size={20} className="text-brand-purple" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
