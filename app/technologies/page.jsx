'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { Code, Server, Smartphone, Cloud, Cpu, Database, Figma as FigmaIcon, Terminal, Layers, Globe, Shield, Activity, Zap } from 'lucide-react';

export default function TechnologiesPage() {
  const techCategories = [
    {
      name: "Frontend",
      icon: Terminal,
      items: [
        { name: "React", level: "Expert", desc: "Our core library for high-performance reactive UIs." },
        { name: "Next.js", level: "Expert", desc: "Production-grade framework for SEO and scale." },
        { name: "Tailwind CSS", level: "Expert", desc: "Utility-first CSS for bespoke visual delivery." },
        { name: "Framer Motion", level: "Advanced", desc: "Smooth, fluid interactions and animations." },
        { name: "TypeScript", level: "Advanced", desc: "Type-safe development for enterprise stability." }
      ]
    },
    {
      name: "Backend & Systems",
      icon: Server,
      items: [
        { name: "Node.js", level: "Expert", desc: "Scalable server-side JavaScript environments." },
        { name: "Python", level: "Advanced", desc: "Core language for AI, data, and robust backends." },
        { name: "FastAPI", level: "Advanced", desc: "High-performance API gateways and microservices." },
        { name: "Express", level: "Expert", desc: "Lightweight, flexible Node.js web frameworks." },
        { name: "GraphQL", level: "Intermediate", desc: "Efficient, flexible data fetching for complex apps." }
      ]
    },
    {
      name: "Mobile",
      icon: Smartphone,
      items: [
        { name: "React Native", level: "Expert", desc: "Single codebase, native performance for iOS/Android." },
        { name: "Expo", level: "Expert", desc: "Rapid deployment and scaling for mobile apps." },
        { name: "Flutter", level: "Advanced", desc: "Bespoke, high-fidelity native mobile experiences." },
        { name: "Firebase", level: "Expert", desc: "Real-time sync and easy scaling for mobile infra." }
      ]
    },
    {
      name: "AI & Data",
      icon: Cpu,
      items: [
        { name: "OpenAI / LLMs", level: "Advanced", desc: "Integrating GPT and custom models into workflows." },
        { name: "LangChain", level: "Advanced", desc: "Building complex AI agentic flows and RAG." },
        { name: "TensorFlow", level: "Intermediate", desc: "Training and deploying custom machine learning models." },
        { name: "Pinecone", level: "Advanced", desc: "Vector databases for AI-powered search and context." }
      ]
    },
    {
      name: "Infrastructure",
      icon: Cloud,
      items: [
        { name: "AWS", level: "Advanced", desc: "Global infrastructure for maximum uptime and scale." },
        { name: "Docker", level: "Advanced", desc: "Containerized environments for consistent delivery." },
        { name: "Vercel", level: "Expert", desc: "Next-gen deployment platform for frontend scale." },
        { name: "Kubernetes", level: "Intermediate", desc: "Orchestrating complex microservice architectures." }
      ]
    },
    {
      name: "Database",
      icon: Database,
      items: [
        { name: "PostgreSQL", level: "Expert", desc: "Reliable RDBMS for complex relational data." },
        { name: "MongoDB", level: "Advanced", desc: "Flexible NoSQL for rapid iteration and document storage." },
        { name: "Redis", level: "Advanced", desc: "Ultra-fast caching and real-time data handling." },
        { name: "Prisma", level: "Expert", desc: "Modern ORM for type-safe database interactions." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Our Elite Tech Arsenal" 
        subtitle="We don&apos;t just use tools; we master them to build software that scales globally."
      />

      <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
         {techCategories.map((cat, i) => (
           <div key={i}>
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-12 h-12 bg-brand-blue text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
                    <cat.icon size={24} />
                 </div>
                 <h2 className="text-3xl font-heading font-extrabold">{cat.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {cat.items.map((tech, j) => (
                   <motion.div 
                     key={j}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: j * 0.05 }}
                     className="glass-card p-6 border-brand-blue/5 hover:border-brand-blue/15 transition-all group"
                   >
                      <div className="flex justify-between items-start mb-4">
                         <h4 className="text-lg font-bold group-hover:text-brand-blue transition-colors">{tech.name}</h4>
                         <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-border-primary ${
                           tech.level === 'Expert' ? 'text-brand-blue bg-brand-blue/5' : 
                           tech.level === 'Advanced' ? 'text-brand-purple bg-brand-purple/5' : 
                           'text-text-muted bg-bg-secondary'
                         }`}>
                           {tech.level}
                         </span>
                      </div>
                      <p className="text-xs text-text-muted font-medium mb-6">{tech.desc}</p>
                      
                      <div className="relative h-1 bg-bg-secondary rounded-full overflow-hidden">
                         <div 
                           className={`absolute top-0 left-0 h-full rounded-full ${
                             tech.level === 'Expert' ? 'bg-brand-blue w-[100%]' : 
                             tech.level === 'Advanced' ? 'bg-brand-purple w-[80%]' : 
                             'bg-text-muted/30 w-[60%]'
                           }`} 
                         />
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
         ))}
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 bg-bg-card relative overflow-hidden border-y border-border-primary">
         <div className="absolute inset-0 grid-bg opacity-10" />
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="text-center">
               <Shield size={48} className="text-brand-blue mx-auto mb-6" />
               <h3 className="text-5xl font-heading font-black mb-2">100%</h3>
               <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Secure Architecture</p>
            </div>
            <div className="text-center">
               <Zap size={48} className="text-brand-purple mx-auto mb-6" />
               <h3 className="text-5xl font-heading font-black mb-2">99.9%</h3>
               <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Uptime Optimization</p>
            </div>
            <div className="text-center">
               <Activity size={48} className="text-brand-blue mx-auto mb-6" />
               <h3 className="text-5xl font-heading font-black mb-2">60+</h3>
               <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Completed Projects</p>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
