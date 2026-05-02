'use client';

import { useState, useEffect } from 'react';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Terminal, 
  Server, 
  Layers,
  Cpu,
  Monitor,
  ShieldCheck,
  Copy,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { useToast } from '@/components/dashboard/Toast';

export default function DatabaseHealthPage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const toast = useToast();

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/database/health');
      const data = await res.json();
      if (data.success) {
        setHealth(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch database health');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchHealth, 0);
    
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchHealth, 30000);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [autoRefresh]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const envVars = [
    { name: 'MONGODB_URI', required: true },
    { name: 'NEXT_PUBLIC_SITE_URL', required: true },
    { name: 'NEXT_PUBLIC_SITE_NAME', required: false },
    { name: 'NEXT_PUBLIC_COMPANY_EMAIL', required: false },
  ];

  if (loading && !health) {
    return <div className="animate-pulse space-y-6">
      <div className="h-64 bg-white/5 rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl" />)}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Database Health</h2>
          <p className="text-sm text-[#8888aa]">Monitor your MongoDB connection and collection statistics.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#131325] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-xl">
            <span className="text-[10px] font-bold text-[#8888aa] uppercase tracking-widest">Auto-refresh</span>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`w-8 h-4 rounded-full transition-all relative ${autoRefresh ? 'bg-accent' : 'bg-[#1e1e3a]'}`}
            >
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${autoRefresh ? 'left-4.5' : 'left-0.5'}`} />
            </button>
          </div>
          <button 
            onClick={fetchHealth}
            className="flex items-center gap-2 bg-white dark:bg-[#131325] border border-[#d0d0e8] dark:border-[#1e1e3a] px-4 py-2 rounded-xl text-xs font-bold text-[#8888aa] hover:text-white transition-all"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {health && (
        <>
          {/* Connection Status Card */}
          <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-3xl p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database size={200} />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex flex-col items-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${health.status === 'connected' ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)]' : 'border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.2)]'}`}>
                  {health.status === 'connected' ? <CheckCircle2 size={48} className="text-emerald-500" /> : <XCircle size={48} className="text-red-500" />}
                </div>
                <p className={`mt-4 font-black uppercase tracking-widest text-sm ${health.status === 'connected' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {health.status.toUpperCase()}
                </p>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                <InfoItem label="Database Name" value={health.dbName} icon={Database} />
                <InfoItem label="Engine" value={`${health.dbType} / ${health.odm}`} icon={Layers} />
                <InfoItem label="Mongoose Version" value={health.mongooseVersion} icon={ShieldCheck} />
                <InfoItem label="Node.js Version" value={health.nodeVersion} icon={Terminal} />
                <InfoItem label="Environment" value={health.environment} icon={Server} />
                <InfoItem label="System Uptime" value={health.uptime} icon={Clock} />
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-[#d0d0e8] dark:border-[#1e1e3a] flex items-center justify-between">
              <p className="text-[10px] text-[#8888aa] font-medium tracking-widest uppercase">Last checked: {new Date(health.lastChecked).toLocaleString()}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Real-time monitoring active</span>
              </div>
            </div>
          </div>

          {/* Collections Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest flex items-center gap-2">
              <Layers size={16} className="text-accent" />
              Collections Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {health.collections.map((col, i) => (
                <div key={i} className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-4 rounded-2xl hover:border-accent/40 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#8888aa] uppercase tracking-widest group-hover:text-white transition-colors">{col.name}</span>
                    <Database size={14} className="text-[#555577] group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{col.count}</span>
                    <span className="text-[10px] text-[#555577]">docs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environment Variables & Commands */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Env Vars */}
            <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={16} className="text-accent" />
                  Environment Config
                </h3>
                <span className="text-[10px] text-[#555577] font-bold">VALUES HIDDEN FOR SECURITY</span>
              </div>
              <div className="space-y-2">
                {envVars.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#f4f6fb] dark:bg-[#0a0a0f] rounded-xl border border-[#d0d0e8] dark:border-[#1e1e3a]">
                    <span className="text-xs font-mono text-[#8888aa]">{v.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-emerald-500 uppercase px-1.5 py-0.5 bg-emerald-500/10 rounded">SET</span>
                      <ShieldCheck size={14} className="text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-500 leading-normal">
                  Never share your <code className="bg-black/20 px-1 rounded">.env.local</code> file or connection strings with anyone. These are highly sensitive credentials.
                </p>
              </div>
            </div>

            {/* Useful Commands */}
            <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-6 rounded-3xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={16} className="text-accent" />
                Quick Commands
              </h3>
              <div className="space-y-4">
                <CommandBlock 
                  title="Check connection manually"
                  code={`node -e "require('./lib/mongodb.js')"`}
                  onCopy={() => copyToClipboard(`node -e "require('./lib/mongodb.js')"`)}
                />
                <CommandBlock 
                  title="Reset and reseed database"
                  code="npm run seed"
                  onCopy={() => copyToClipboard("npm run seed")}
                />
                <CommandBlock 
                  title="Force reconnect"
                  code="npx kill-port 3000 && npm run dev"
                  onCopy={() => copyToClipboard("npx kill-port 3000 && npm run dev")}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function InfoItem({ label, value, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[#8888aa] mb-1">
        <Icon size={12} />
        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{label}</span>
      </div>
      <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
    </div>
  );
}

function CommandBlock({ title, code, onCopy }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#555577] mb-2 px-1">{title}</p>
      <div className="group relative">
        <div className="bg-[#0a0a0f] p-3 pl-4 rounded-xl border border-[#1e1e3a] font-mono text-[11px] text-[#00d4ff] overflow-x-auto whitespace-nowrap">
          {code}
        </div>
        <button 
          onClick={onCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#1e1e3a] text-[#8888aa] hover:text-white opacity-0 group-hover:opacity-100 transition-all"
        >
          <Copy size={12} />
        </button>
      </div>
    </div>
  );
}
