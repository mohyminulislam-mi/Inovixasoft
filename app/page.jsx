'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Plus, 
  ArrowRight, 
  Code, 
  Smartphone, 
  Cpu, 
  Shield, 
  ChevronRight, 
  Globe, 
  Zap, 
  Layers, 
  Users,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import { services, projects, blogPosts } from '@/lib/data';
import BlogCard from '@/components/BlogCard';
import SectionTitle from '@/components/SectionTitle';

const AnimatedCounter = ({ value, label, suffix = '' }) => {
  return (
    <div className="text-center group">
      <div className="text-4xl md:text-5xl font-heading font-black text-text-primary mb-2 flex justify-center items-baseline tabular-nums">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {value}
        </motion.span>
        <span className="text-brand-blue ml-1">{suffix}</span>
      </div>
      <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] group-hover:text-text-primary transition-colors">{label}</p>
    </div>
  );
};

export default function Home() {
  const techBadges = [
    { icon: <Code size={16} />, label: "React", top: "10%", left: "15%" },
    { icon: <Layers size={16} />, label: "Next.js", top: "65%", left: "10%" },
    { icon: <Cpu size={16} />, label: "AI", top: "20%", right: "12%" },
    { icon: <Database size={16} />, label: "Node.js", top: "75%", right: "15%" },
    { icon: <Shield size={16} />, label: "AWS", top: "45%", right: "5%" },
  ];

  const marqueeItems = ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Python", "TypeScript", "TensorFlow", "Docker", "Kubernetes", "Figma", "Stripe"];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grain-overlay">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 90, 0],
               opacity: [0.1, 0.2, 0.1]
             }}
             transition={{ duration: 20, repeat: Infinity }}
             className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-brand-blue rounded-full blur-[160px]" 
           />
           <motion.div 
             animate={{ 
               scale: [1.2, 1, 1.2],
               rotate: [180, 0, 180],
               opacity: [0.1, 0.2, 0.1]
             }}
             transition={{ duration: 25, repeat: Infinity }}
             className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-brand-purple rounded-full blur-[140px]" 
           />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest mb-10 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              Engineering at Scale
            </motion.div>
            
            <div className="text-6xl md:text-8xl xl:text-9xl font-heading font-extrabold leading-[0.85] tracking-tighter text-text-primary mb-8 select-none">
               <motion.span 
                 initial={{ opacity: 0, x: -30 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: 0.2 }}
                 className="block"
               >
                 We Build Digital
               </motion.span>
               <motion.span 
                 initial={{ opacity: 0, x: -30 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: 0.4 }}
                 className="block text-gradient mt-2 py-4"
               >
                 Products That Scale
               </motion.span>
               <motion.span 
                 initial={{ opacity: 0, x: -30 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: 0.6 }}
                 className="block text-4xl md:text-6xl text-text-muted mt-2"
               >
                 Globally.
               </motion.span>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-text-muted leading-relaxed mb-12 max-w-2xl font-medium"
            >
              ScalexDevs is an elite software agency helping startups and enterprises grow with high-performance web apps, mobile solutions, and hardened AI systems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-10 py-5 bg-brand-blue text-white font-bold rounded-2xl shadow-xl shadow-brand-blue/25 hover:scale-105 active:scale-95 transition-all text-center uppercase tracking-widest text-xs"
              >
                Start a Project
              </Link>
              <Link 
                href="/projects" 
                className="w-full sm:w-auto group flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-blue transition-colors"
              >
                View Our Work <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-12 xl:col-span-5 relative hidden xl:block h-[600px]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-border-primary/30 rounded-full flex items-center justify-center">
                <div className="w-[350px] h-[350px] border border-border-primary/50 rounded-full flex items-center justify-center">
                   <div className="w-[200px] h-[200px] bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 rounded-full flex items-center justify-center backdrop-blur-3xl border border-brand-blue/20 shadow-[0_0_100px_rgba(0,212,255,0.1)]">
                      <Zap size={80} className="text-brand-blue fill-brand-blue/20" />
                   </div>
                </div>
             </div>

             {techBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  style={{ top: badge.top, left: badge.left, right: badge.right }}
                  className="absolute bg-bg-card border border-border-primary p-3 rounded-xl flex items-center gap-2 shadow-2xl backdrop-blur-xl z-20 group hover:border-brand-blue/50 transition-colors cursor-default"
                >
                   <div className="w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      {badge.icon}
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest pr-2">{badge.label}</span>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 border-y border-border-primary relative overflow-hidden bg-bg-secondary/40">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-5 gap-12 text-center">
            <AnimatedCounter value="50" label="Projects Delivered" suffix="+" />
            <AnimatedCounter value="30" label="Happy Clients" suffix="+" />
            <AnimatedCounter value="5" label="Years Experience" suffix="+" />
            <AnimatedCounter value="15" label="Global Talent" suffix="+" />
            <AnimatedCounter value="99" label="Satisfaction" suffix="%" />
         </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter mb-4">Elite <span className="text-gradient">Solutions</span></h2>
                  <p className="text-text-muted max-w-xl font-medium">Bespoke engineering services designed for high-performance delivery.</p>
               </div>
               <Link href="/services" className="text-sm font-bold uppercase tracking-widest text-brand-blue flex items-center gap-2 group">
                 View All Services <ArrowRight className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {services.slice(0, 6).map((service, i) => (
                  <ServiceCard key={service.slug} service={service} index={i} />
               ))}
            </div>
         </div>
      </section>

      {/* featured section marquee */}
      <section className="py-20 bg-bg-primary overflow-hidden border-y border-border-primary">
         <div className="flex items-center gap-12 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-3xl md:text-5xl font-heading font-black text-text-muted/20 uppercase tracking-tighter hover:text-brand-blue transition-colors cursor-default select-none">
                {item}
              </span>
            ))}
         </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 px-6 bg-bg-secondary/30 relative">
         <div className="max-w-7xl mx-auto">
            <SectionTitle title="Built to Scale" subtitle="Case studies from digital products we've taken from concept to global platform." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
               {projects.slice(0, 3).map((project, i) => (
                 <ProjectCard key={project.slug} project={project} index={i} />
               ))}
            </div>
            <div className="text-center">
               <Link href="/projects" className="inline-flex items-center gap-4 px-12 py-5 bg-bg-card border border-border-primary rounded-2xl text-text-primary font-bold uppercase tracking-widest text-xs hover:bg-bg-secondary transition-all">
                  See More Projects <ChevronRight size={16} />
               </Link>
            </div>
         </div>
      </section>

      {/* Blog Preview */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto text-center mb-16">
             <SectionTitle title="Knowledge Hub" subtitle="Latest insights from our engineering team." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {blogPosts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
               ))}
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

const Database = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
