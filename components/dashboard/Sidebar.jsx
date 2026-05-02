'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Mail, 
  Calendar, 
  Briefcase, 
  MessageSquare, 
  BriefcaseBusiness,
  Layers,
  FileText,
  UserCheck,
  Megaphone,
  Settings,
  Database,
  User,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Zap,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from 'next-themes';
const cn = (...classes) => classes.filter(Boolean).join(' ');

const SidebarItem = ({ item, isCollapsed, isActive }) => {
  return (
    <Link 
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
        isActive 
          ? "bg-accent/10 text-accent border-l-2 border-accent" 
          : "text-slate-400 hover:text-white hover:bg-white/5"
      )}
    >
      <item.icon size={20} className={cn("shrink-0", isActive ? "text-accent" : "group-hover:text-white")} />
      {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
      {item.badge && !isCollapsed && (
        <span className="ml-auto bg-accent text-[10px] font-bold px-1.5 py-0.5 rounded-full text-[#0a0a0f]">
          {item.badge}
        </span>
      )}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
          {item.label}
        </div>
      )}
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const saved = localStorage.getItem('sidebar_collapsed');
      if (saved !== null) setIsCollapsed(JSON.parse(saved));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar_collapsed', JSON.stringify(newState));
  };

  if (!mounted) return null;

  const sections = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
      ]
    },
    {
      title: "SUBMISSIONS",
      items: [
        { label: "Contacts", icon: Mail, href: "/dashboard/contacts", badge: "New" },
        { label: "Consultations", icon: Calendar, href: "/dashboard/consultations" },
        { label: "Applications", icon: UserCheck, href: "/dashboard/applications" },
        { label: "Chat Messages", icon: MessageSquare, href: "/dashboard/chat" },
      ]
    },
    {
      title: "CONTENT",
      items: [
        { label: "Projects", icon: Layers, href: "/dashboard/projects" },
        { label: "Blog Posts", icon: FileText, href: "/dashboard/blog" },
        { label: "Testimonials", icon: Megaphone, href: "/dashboard/testimonials" },
      ]
    },
    {
      title: "JOBS",
      items: [
        { label: "Job Postings", icon: BriefcaseBusiness, href: "/dashboard/careers" },
      ]
    },
    {
      title: "MARKETING",
      items: [
        { label: "Newsletter", icon: Zap, href: "/dashboard/newsletter" },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { label: "Site Settings", icon: Settings, href: "/dashboard/settings" },
        { label: "Database Health", icon: Database, href: "/dashboard/settings/database" },
        { label: "Admin Profile", icon: User, href: "/dashboard/profile" },
      ]
    }
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 70 : 260 }}
      className="fixed left-0 top-0 h-screen bg-[#0d0d1a] border-r border-[#1e1e3a] z-50 flex flex-col transition-all duration-300"
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-[#1e1e3a]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap size={20} className="text-[#0a0a0f]" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-white tracking-tight"
            >
              Scalex<span className="text-accent">Devs</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 custom-scrollbar">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold text-[#8888aa] mb-2 tracking-widest uppercase">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <SidebarItem 
                  key={itemIdx} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Toggle */}
      <div className="p-3 border-t border-[#1e1e3a]">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-[#131325] rounded-xl">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-bold text-accent text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-white truncate">Admin User</p>
              <p className="text-[9px] text-[#8888aa] truncate uppercase tracking-tighter">Super Admin</p>
            </div>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#8888aa] hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        )}

        <button 
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center py-2 text-[#8888aa] hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        
        {!isCollapsed && (
          <p className="text-[9px] text-center text-[#555577] mt-2">v1.0.0 Stable</p>
        )}
      </div>
    </motion.aside>
  );
}
