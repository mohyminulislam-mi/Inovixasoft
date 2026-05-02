'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  BellRing,
  LogOut,
  User,
  Settings,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
const cn = (...classes) => classes.filter(Boolean).join(' ');

const titles = {
  '/dashboard': 'Overview',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/contacts': 'Contact Submissions',
  '/dashboard/consultations': 'Consultations',
  '/dashboard/applications': 'Job Applications',
  '/dashboard/careers': 'Careers Manager',
  '/dashboard/projects': 'Projects Portfolio',
  '/dashboard/blog': 'Blog Posts',
  '/dashboard/newsletter': 'Newsletter Subscribers',
  '/dashboard/chat': 'Live Chat',
  '/dashboard/settings': 'Site Settings',
  '/dashboard/settings/database': 'Database Health',
  '/dashboard/profile': 'Admin Profile',
};

export default function TopBar({ isCollapsed }) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = () => {
    // Check direct matches
    if (titles[pathname]) return titles[pathname];
    
    // Check dynamic routes
    if (pathname.includes('/dashboard/contacts/')) return 'Contact Detail';
    if (pathname.includes('/dashboard/consultations/')) return 'Booking Detail';
    if (pathname.includes('/dashboard/applications/')) return 'Application Detail';
    if (pathname.includes('/dashboard/careers/new')) return 'New Job Posting';
    if (pathname.includes('/dashboard/careers/') && pathname.includes('/edit')) return 'Edit Job Posting';
    
    return 'Dashboard';
  };

  const breadcrumbs = pathname.split('/').filter(x => x).map((v, i, a) => ({
    label: v.charAt(0).toUpperCase() + v.slice(1),
    href: '/' + a.slice(0, i + 1).join('/')
  }));

  return (
    <header className="h-16 fixed top-0 right-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1e1e3a] px-6 flex items-center justify-between transition-all duration-300" 
      style={{ left: isCollapsed ? '70px' : '260px' }}>
      
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-white tracking-tight leading-none mb-1">
          {getPageTitle()}
        </h1>
        <div className="flex items-center gap-1.5 text-[10px] text-[#8888aa] font-medium">
          {breadcrumbs.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className={i === breadcrumbs.length - 1 ? "text-accent" : "hover:text-white"}>
                {b.label}
              </span>
              {i < breadcrumbs.length - 1 && <span className="opacity-50">/</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-[#131325] border border-[#1e1e3a] rounded-full px-3 py-1.5 w-64 transition-focus focus-within:border-accent group">
          <Search size={16} className="text-[#8888aa] group-focus-within:text-accent" />
          <input 
            type="text" 
            placeholder="Search dashboard..."
            className="bg-transparent border-none outline-none text-xs text-white placeholder-[#555577] ml-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#555577] hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-2 rounded-xl bg-[#131325] border border-[#1e1e3a] text-[#8888aa] hover:text-white transition-all relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#131325]" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-3 w-80 bg-[#131325] border border-[#1e1e3a] rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-[#1e1e3a] flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Notifications</h3>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">3 NEW</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 hover:bg-white/5 border-b border-[#1e1e3a]/50 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <BellRing size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-white font-medium mb-0.5 group-hover:text-accent transition-colors">New contact submission</p>
                          <p className="text-[10px] text-[#8888aa] mb-1">John Doe wants Web Development services.</p>
                          <p className="text-[9px] text-[#555577]">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-center text-xs text-[#8888aa] hover:text-white font-medium bg-white/5 transition-colors">
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full bg-[#131325] border border-[#1e1e3a] hover:border-accent/40 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-accent-purple flex items-center justify-center font-bold text-[#0a0a0f] text-xs">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[11px] font-bold text-white leading-tight">Admin User</p>
              <p className="text-[9px] text-[#8888aa] leading-tight">Super Admin</p>
            </div>
            <ChevronDown size={14} className={cn("text-[#555577] transition-transform", showProfile && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-3 w-56 bg-[#131325] border border-[#1e1e3a] rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
              >
                <Link href="/dashboard/profile" className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors text-[#8888aa] hover:text-white">
                  <User size={16} />
                  <span className="text-xs font-medium">My Profile</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors text-[#8888aa] hover:text-white">
                  <Settings size={16} />
                  <span className="text-xs font-medium">Settings</span>
                </Link>
                <div className="my-2 border-t border-[#1e1e3a]" />
                <button className="w-full flex items-center gap-3 p-2 hover:bg-red-500/10 rounded-xl transition-colors text-[#ef4444]">
                  <LogOut size={16} />
                  <span className="text-xs font-medium">Log out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
