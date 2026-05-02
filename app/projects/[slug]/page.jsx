'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import { motion } from 'motion/react';
import { projects } from '@/lib/data';
import { ArrowLeft, ExternalLink, Github, Code, Layout, Database, CheckCircle2, Zap } from 'lucide-react';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) return <div className="p-20 text-center">Project not found.</div>;

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      
      {/* Project Header */}
      <section className="pt-40 pb-20 px-6 border-b border-border-primary grain-overlay overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
           <Link href="/projects" className="inline-flex items-center gap-2 text-text-muted hover:text-brand-blue transition-all text-xs font-bold uppercase tracking-widest mb-10 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
           </Link>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest rounded-full border border-brand-blue/20">{project.category}</span>
                    <span className="px-3 py-1 bg-bg-secondary text-text-muted text-xs font-bold uppercase tracking-widest rounded-full border border-border-primary">Live Product</span>
                 </div>
                 <h1 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter text-text-primary leading-[0.9]">{project.name}</h1>
                 <p className="text-xl text-text-muted font-medium max-w-xl">{project.description}</p>
                 <div className="flex flex-wrap gap-3 pt-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-bg-secondary/50 border border-border-primary text-xs font-bold text-text-muted rounded-full uppercase tracking-widest">#{tag}</span>
                    ))}
                 </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="flex-grow sm:flex-none px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-blue/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                    Visit Website <ExternalLink size={18} />
                 </button>
                 <button className="flex-grow sm:flex-none px-10 py-5 bg-bg-card border border-border-primary text-text-primary rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-bg-secondary transition-all flex items-center justify-center gap-3">
                    View Repo <Github size={18} />
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Info Strip */}
         <div className="lg:col-span-8 space-y-16">
            <div className="aspect-video w-full rounded-3xl overflow-hidden glass-card border-brand-blue/10 p-2 shadow-2xl">
               <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div>
               <h3 className="text-3xl font-heading font-extrabold mb-8">The Challenge</h3>
               <p className="text-text-muted text-lg font-medium leading-relaxed mb-6">Building a production-ready application that can handle high-velocity growth requires more than just code. For {project.name}, our primary challenge was ensuring horizontal scalability while maintaining sub-second response times across global regions.</p>
               <p className="text-text-muted text-lg font-medium leading-relaxed">The legacy infrastructure was struggling with high latency during peak hours, and the database architecture lacked the relational integrity needed for complex data analytics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-bg-secondary rounded-3xl border border-border-primary">
                  <Layout size={32} className="text-brand-blue mb-6" />
                  <h4 className="text-xl font-bold mb-4 text-text-primary">Architecture Design</h4>
                  <p className="text-sm text-text-muted leading-relaxed font-medium">We implemented a micro-frontend architecture using Next.js, allowing independent scaling of critical modules.</p>
               </div>
               <div className="p-8 bg-bg-secondary rounded-3xl border border-border-primary">
                  <Database size={32} className="text-brand-purple mb-6" />
                  <h4 className="text-xl font-bold mb-4 text-text-primary">Database Scaling</h4>
                  <p className="text-sm text-text-muted leading-relaxed font-medium">Migrated to a distributed PostgreSQL cluster with automated failover and read replicas.</p>
               </div>
            </div>

            <div>
               <h3 className="text-3xl font-heading font-extrabold mb-8">Key Features</h3>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Real-time data synchronization across multi-region clusters.",
                    "Hardened RBAC security with automated audit logging.",
                    "Advanced analytics dashboard with D3.js visualization.",
                    "Mobile-responsive design optimized for touch-latency.",
                    "CI/CD pipeline with 100% automated test coverage.",
                    "Cloud-native deployment using Kubernetes (K8s)."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 p-4 glass-card border-brand-blue/5">
                       <CheckCircle2 size={24} className="text-brand-blue shrink-0" />
                       <span className="text-sm font-medium text-text-muted">{item}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </div>

         {/* Stats Sidebar */}
         <aside className="lg:col-span-4 space-y-8">
            <div className="glass-card p-10 border-brand-blue/10 sticky top-32">
               <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted mb-8">Project Stats</h4>
               <div className="space-y-12">
                  <div>
                     <p className="text-4xl font-heading font-black text-gradient block mb-1">45ms</p>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Avg Response Time</p>
                  </div>
                  <div>
                     <p className="text-4xl font-heading font-black text-gradient block mb-1">99.99%</p>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Uptime Reliability</p>
                  </div>
                  <div>
                     <p className="text-4xl font-heading font-black text-gradient block mb-1">2M+</p>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Daily Requests</p>
                  </div>
                  <div>
                     <p className="text-4xl font-heading font-black text-gradient block mb-1">0</p>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Critical Vulnerabilities</p>
                  </div>
               </div>

               <div className="mt-12 pt-12 border-t border-border-primary">
                  <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Teck Stack</h5>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                     {project.tags.map(t => (
                       <span key={t} className="px-2 py-1 bg-bg-secondary rounded border border-border-primary">{t}</span>
                     ))}
                  </div>
               </div>
            </div>
         </aside>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6">
         <div className="max-w-4xl mx-auto glass-card p-12 text-center border-brand-blue/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px]" />
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">Ready to scale like <span className="text-gradient">{project.name}?</span></h3>
            <p className="text-text-muted text-lg mb-10 font-medium italic">&quot;This project redefined how we handle real-time architecture.&quot;</p>
            <Link href="/consultation" className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest text-xs inline-block">Work with our team</Link>
         </div>
      </section>

      <Footer />
    </main>
  );
}
