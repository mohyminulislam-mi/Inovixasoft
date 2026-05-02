'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, MessageSquare, Briefcase, Calendar, CheckCircle2, XCircle, Database, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-12">
      <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!data) return <div className="p-20 text-center">Failed to load stats. Check database connection.</div>;

  const statCards = [
    { label: 'Total Contacts', value: data.stats.contacts, icon: LayoutDashboard, color: 'text-blue-500' },
    { label: 'Consultations', value: data.stats.consultations, icon: Calendar, color: 'text-green-500' },
    { label: 'Job Applications', value: data.stats.applications, icon: Briefcase, color: 'text-purple-500' },
    { label: 'Chat Messages', value: data.stats.messages, icon: MessageSquare, color: 'text-orange-500' },
    { label: 'Newsletter', value: data.stats.subscribers, icon: Users, color: 'text-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-body">
      {/* Top Banner */}
      <div className="bg-red-500/10 border-b border-red-500/20 py-2 px-6 text-center text-xs font-bold text-red-500 uppercase tracking-[0.2em]">
        ⚠️ No authentication in this version. Secure this page before production.
      </div>

      {/* Header */}
      <header className="p-8 border-b border-border-primary flex justify-between items-center bg-bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-heading font-extrabold flex items-center gap-2">
            <LayoutDashboard className="text-brand-blue" /> ScalexDevs Admin
          </h1>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold">Manage your agency intelligence</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border-primary rounded-xl">
             <Database size={16} className="text-text-muted" />
             <span className="text-xs font-bold">{data.db.name}</span>
             <div className={`w-2 h-2 rounded-full ${data.db.status === 'connected' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 animate-pulse'}`} />
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <Clock size={16} />
            <span className="text-xs font-medium">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </header>
      
      <main className="p-8 max-w-7xl mx-auto space-y-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statCards.map((stat, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="glass-card p-6 border-brand-blue/5 hover:border-brand-blue/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-bg-secondary ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-green-500">+12%</span>
              </div>
              <h3 className="text-3xl font-heading font-black text-text-primary">{stat.value}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Recent Contacts */}
           <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-border-primary bg-bg-secondary/50 flex justify-between items-center">
                 <h4 className="font-bold text-sm uppercase tracking-widest">Recent Contacts</h4>
                 <Link href="#" className="text-xs font-bold text-brand-blue hover:underline">View All</Link>
              </div>
              <div className="p-6">
                 {data.recent.contacts.length > 0 ? (
                   <div className="space-y-4">
                     {data.recent.contacts.map((c, i) => (
                       <div key={i} className="p-4 rounded-xl border border-border-primary hover:bg-bg-secondary transition-colors">
                          <div className="flex justify-between mb-2">
                             <p className="font-bold text-sm text-text-primary">{c.name}</p>
                             <span className="text-[10px] px-2 py-0.5 bg-brand-blue/10 text-brand-blue rounded font-bold">{c.service}</span>
                          </div>
                          <p className="text-xs text-text-muted line-clamp-1 italic">&quot;{c.message}&quot;</p>
                       </div>
                     ))}
                   </div>
                 ) : (
                    <p className="text-center py-10 text-text-muted text-sm">No submissions yet.</p>
                 )}
              </div>
           </div>

           {/* Recent Consultations */}
           <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-border-primary bg-bg-secondary/50 flex justify-between items-center">
                 <h4 className="font-bold text-sm uppercase tracking-widest">Booked Consultations</h4>
                 <Link href="#" className="text-xs font-bold text-brand-blue hover:underline">View All</Link>
              </div>
              <div className="p-6">
                 {data.recent.consultations.length > 0 ? (
                   <div className="space-y-4">
                     {data.recent.consultations.map((c, i) => (
                       <div key={i} className="p-4 rounded-xl border border-border-primary hover:bg-bg-secondary transition-colors flex items-center justify-between">
                          <div>
                             <p className="font-bold text-sm text-text-primary">{c.name}</p>
                             <p className="text-[10px] text-text-muted">{c.preferredDate} @ {c.preferredTime}</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-500 rounded font-bold uppercase">{c.status}</span>
                       </div>
                     ))}
                   </div>
                 ) : (
                    <p className="text-center py-10 text-text-muted text-sm">No bookings yet.</p>
                 )}
              </div>
           </div>

           {/* Job Applications */}
           <div className="glass-card overflow-hidden lg:col-span-2">
              <div className="p-6 border-b border-border-primary bg-bg-secondary/50 flex justify-between items-center">
                 <h4 className="font-bold text-sm uppercase tracking-widest">Latest Job Applications</h4>
                 <Link href="#" className="text-xs font-bold text-brand-blue hover:underline">View All</Link>
              </div>
              <div className="p-0">
                 {data.recent.applications.length > 0 ? (
                   <table className="w-full text-left">
                     <thead className="bg-bg-secondary/30 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        <tr>
                           <th className="px-6 py-4">Name</th>
                           <th className="px-6 py-4">Position</th>
                           <th className="px-6 py-4">Experience</th>
                           <th className="px-6 py-4">Status</th>
                           <th className="px-6 py-4">Date</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border-primary">
                        {data.recent.applications.map((a, i) => (
                          <tr key={i} className="hover:bg-bg-secondary transition-colors text-sm">
                             <td className="px-6 py-4 font-bold">{a.firstName} {a.lastName}</td>
                             <td className="px-6 py-4 text-text-muted">{a.jobTitle}</td>
                             <td className="px-6 py-4 text-text-muted">{a.experience}</td>
                             <td className="px-6 py-4 italic text-brand-blue">{a.status}</td>
                             <td className="px-6 py-4 text-[10px] font-bold opacity-30">{new Date(a.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                 ) : (
                    <div className="p-20 text-center text-text-muted">No applications received yet.</div>
                 )}
              </div>
           </div>
        </div>

        {/* Footer info */}
        <div className="pt-20 pb-10 text-center border-t border-border-primary">
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">ScalexDevs Admin Infrastructure v1.0.4 - Built with Prisma & Next.js</p>
        </div>
      </main>
    </div>
  );
}
