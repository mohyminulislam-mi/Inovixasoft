'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Target, BookOpen, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/careers/jobs');
        const data = await res.json();
        setJobs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const perks = [
    { icon: Globe, title: "Remote First", text: "Work from anywhere in the world. We hire talent, not location." },
    { icon: Clock, title: "Flexible Flow", text: "As long as results are delivered, we don't care about your hours." },
    { icon: Target, title: "Growth Budget", text: "Annual stipend for courses, books, and professional scaling." },
    { icon: Zap, title: "Modern Stack", text: "Build with the latest technologies. No legacy baggage here." }
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Join the ScalexDevs Team" 
        subtitle="Build the future of high-scale engineering with us. We're a world-class remote-first team passionate about code quality."
      />

      {/* Perks Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <SectionTitle title="Engineering Culture" subtitle="How we scale people along with our software." centered={true} />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 border-brand-blue/5 hover:border-brand-blue/20 transition-all text-center group"
              >
                 <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <perk.icon size={28} />
                 </div>
                 <h4 className="text-lg font-bold mb-3">{perk.title}</h4>
                 <p className="text-xs text-text-muted font-medium leading-relaxed">{perk.text}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-32 px-6 bg-bg-secondary/30 relative">
         <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="text-4xl font-heading font-extrabold mb-4">Open <span className="text-gradient">Positions</span></h2>
                  <p className="text-text-muted font-medium">Think you have what it takes? Apply to our open roles below.</p>
               </div>
               <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Actively Hiring
               </div>
            </div>

            {loading ? (
              <div className="flex justify-center p-20">
                 <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-6">
                 {jobs.map((job) => (
                   <motion.div 
                     key={job.id}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="glass-card hover:bg-bg-card transition-all group relative overflow-hidden"
                   >
                      {job.urgent && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold uppercase px-3 py-1 tracking-widest">
                          Urgent
                        </div>
                      )}
                      <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                         <div className="space-y-4">
                            <div className="flex items-center gap-3">
                               <span className="px-2 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest rounded">{job.department}</span>
                               <span className="px-2 py-1 bg-bg-secondary text-text-muted text-[10px] font-bold uppercase tracking-widest rounded">{job.type}</span>
                            </div>
                            <h3 className="text-2xl font-bold group-hover:text-brand-blue transition-colors">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 text-xs font-medium text-text-muted">
                               <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-blue" /> {job.location}</span>
                               <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-brand-purple" /> {job.salary}</span>
                               <span className="flex items-center gap-1.5"><Clock size={14} /> Posted {job.posted}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                               {job.tags.map(tag => (
                                 <span key={tag} className="px-2 py-0.5 bg-bg-secondary text-[10px] font-bold text-text-muted lowercase border border-border-primary rounded">#{tag}</span>
                               ))}
                            </div>
                         </div>
                         <Link 
                           href={`/careers/${job.id}`}
                           className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                         >
                           View Details <ArrowRight size={18} />
                         </Link>
                      </div>
                   </motion.div>
                 ))}
              </div>
            )}
         </div>
      </section>

      <Footer />
    </main>
  );
}

// Re-using Globe icon
const Globe = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
