'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  Zap, 
  Briefcase, 
  FileText, 
  Layers, 
  MessageSquare,
  Plus,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Megaphone,
  Database
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import Link from 'next/link';
import { motion } from 'motion/react';

const COLORS = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b'];

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('7d');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/stats/overview');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchStats, 0);
    return () => clearTimeout(timer);
  }, []);

  const chartData = [
    { name: 'Mon', contacts: 4, applications: 2, consultations: 1 },
    { name: 'Tue', contacts: 3, applications: 4, consultations: 2 },
    { name: 'Wed', contacts: 2, applications: 3, consultations: 1 },
    { name: 'Thu', contacts: 6, applications: 5, consultations: 3 },
    { name: 'Fri', contacts: 8, applications: 4, consultations: 2 },
    { name: 'Sat', contacts: 5, applications: 2, consultations: 1 },
    { name: 'Sun', contacts: 7, applications: 3, consultations: 2 },
  ];

  const pieData = stats ? [
    { name: 'Contacts', value: stats.contacts.total },
    { name: 'Consultations', value: stats.consultations.total },
    { name: 'Applications', value: stats.applications.total },
    { name: 'Newsletter', value: stats.newsletter.total },
  ] : [];

  const mainStats = [
    { title: "Total Contacts", value: stats?.contacts.total || 0, icon: Users, color: "blue", trend: "+12%" },
    { title: "Consultations", value: stats?.consultations.total || 0, icon: Calendar, color: "purple", trend: "+5%" },
    { title: "Applications", value: stats?.applications.total || 0, icon: UserCheck, color: "green", trend: "+8%" },
    { title: "Newsletter", value: stats?.newsletter.total || 0, icon: Zap, color: "orange", trend: "+15%" },
  ];

  const secondaryStats = [
    { label: "Active Jobs", value: stats?.jobs.active || 0, icon: Briefcase },
    { label: "Published Posts", value: stats?.blog.published || 0, icon: FileText },
    { label: "Live Projects", value: stats?.projects.total || 0, icon: Layers },
    { label: "Chat Sessions", value: stats?.chat.totalSessions || 0, icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Welcome back, Admin</h2>
          <p className="text-sm text-[#8888aa]">Here&apos;s what is happening with ScalexDevs today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchStats}
            className="p-2 rounded-xl bg-white dark:bg-[#131325] border border-[#d0d0e8] dark:border-[#1e1e3a] text-[#8888aa] hover:text-white transition-all"
            title="Refresh statistics"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <Link href="/dashboard/careers/new" className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-[#0a0a0f] px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shadow-accent/20">
            <Plus size={18} />
            <span>New Job Post</span>
          </Link>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat, i) => (
          <StatsCard key={i} {...stat} loading={loading} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-1">Activity Over Time</h3>
              <p className="text-[10px] text-[#8888aa] font-medium uppercase tracking-widest">Submissions tracking</p>
            </div>
            <div className="flex bg-[#f4f6fb] dark:bg-[#0a0a0f] p-1 rounded-lg border border-[#d0d0e8] dark:border-[#1e1e3a]">
              {['7d', '30d', '90d'].map((r) => (
                <button 
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${range === r ? 'bg-white dark:bg-[#131325] text-accent shadow-sm' : 'text-[#555577] hover:text-white'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e1e3a" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8888aa', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8888aa', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131325', border: '1px solid #1e1e3a', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="contacts" stroke="#00d4ff" fillOpacity={1} fill="url(#colorContacts)" strokeWidth={3} />
                <Area type="monotone" dataKey="applications" stroke="#10b981" fillOpacity={1} fill="url(#colorApps)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Pie Chart */}
        <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-6 rounded-2xl flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-1">Submissions Breakdown</h3>
          <p className="text-[10px] text-[#8888aa] font-medium uppercase tracking-widest mb-6">Volume per category</p>
          
          <div className="flex-1 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131325', border: '1px solid #1e1e3a', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryStats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-4 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 dark:bg-[#1e1e3a] flex items-center justify-center text-[#8888aa]">
              <stat.icon size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#8888aa] uppercase tracking-wider">{stat.label}</p>
              <p className="text-base font-black text-slate-900 dark:text-white">{loading ? '...' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "New Project", icon: Plus, href: "/dashboard/projects/new" },
          { label: "Blog Post", icon: FileText, href: "/dashboard/blog/new" },
          { label: "Testimonial", icon: Megaphone, href: "/dashboard/testimonials/new" },
          { label: "Database", icon: Database, href: "/dashboard/settings/database" },
          { label: "Live Site", icon: ExternalLink, href: "/" },
          { label: "Export CSV", icon: FileText, href: "#" },
        ].map((action, i) => (
          <Link 
            key={i}
            href={action.href}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-[#131325] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-2xl hover:border-accent/40 group transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <action.icon size={16} />
            </div>
            <span className="text-[10px] font-bold text-[#8888aa] group-hover:text-white transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
