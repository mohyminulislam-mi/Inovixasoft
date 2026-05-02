'use client';

import { motion } from 'motion/react';
const cn = (...classes) => classes.filter(Boolean).join(' ');
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = "blue", 
  trend, 
  loading = false 
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (loading) return;
    
    const timer = setTimeout(() => {
      const target = parseInt(value) || 0;
      if (target === 0) {
        setDisplayValue(0);
        return;
      }

      const duration = 1000;
      const steps = 30;
      const increment = target / steps;
      const stepTime = duration / steps;
      
      let current = 0;
      const intervalTimer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayValue(target);
          clearInterval(intervalTimer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, stepTime);
    }, 0);

    return () => clearTimeout(timer);
  }, [value, loading]);

  const colorMap = {
    blue: "border-blue-500 text-blue-500 bg-blue-500/10",
    purple: "border-purple-500 text-purple-500 bg-purple-500/10",
    green: "border-emerald-500 text-emerald-500 bg-emerald-500/10",
    orange: "border-orange-500 text-orange-500 bg-orange-500/10",
    red: "border-red-500 text-red-500 bg-red-500/10",
  };

  if (loading) {
    return (
      <div className="bg-[#13131f] border border-[#1e1e3a] p-5 rounded-2xl animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-white/5 rounded-xl" />
          <div className="w-16 h-4 bg-white/5 rounded" />
        </div>
        <div className="w-24 h-8 bg-white/5 rounded mb-2" />
        <div className="w-32 h-4 bg-white/5 rounded" />
      </div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-5 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md transition-all border-l-4",
        colorMap[color].split(' ')[0] // Get border color
      )}
    >
      <div className="flex justify-between items-start mb-4 text-slate-900 dark:text-white">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colorMap[color].split(' ').slice(1).join(' '))}>
          <Icon size={20} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            trend.startsWith('+') ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
          )}>
            {trend.startsWith('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trend}
          </div>
        )}
      </div>
      
      <h3 className="text-[11px] font-bold text-[#8888aa] tracking-widest uppercase mb-1">{title}</h3>
      <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
        {typeof value === 'number' ? displayValue.toLocaleString() : value}
      </div>
      
      <p className="text-[10px] text-[#555577] mt-1 font-medium">Total submissions recorded</p>
    </motion.div>
  );
}
