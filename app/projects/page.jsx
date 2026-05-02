'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'SaaS', 'Fintech', 'Health', 'AI', 'Ecommerce', 'Mobile'];

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'All' || p.category.includes(filter);
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Our Engineering Portfolio" 
        subtitle="A showcase of digital products we've conceptualized, architected, and scaled."
      />

      <section className="py-20 px-6 max-w-7xl mx-auto">
         {/* Filters & Search */}
         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
               {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-bg-secondary text-text-muted hover:text-text-primary border border-border-primary'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
            
            <div className="w-full lg:w-80 relative">
               <input 
                 type="text" 
                 placeholder="Search projects..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-bg-secondary border border-border-primary rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all"
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            </div>
         </div>

         {/* Projects Grid */}
         <AnimatePresence mode='wait'>
            {filteredProjects.length > 0 ? (
               <motion.div 
                 key={filter + search}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.4 }}
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               >
                  {filteredProjects.map((project, i) => (
                     <ProjectCard key={project.slug} project={project} index={i} />
                  ))}
               </motion.div>
            ) : (
               <div className="text-center py-40 text-text-muted font-medium">
                  No projects found matching your criteria.
               </div>
            )}
         </AnimatePresence>

         {/* Tech Marquee */}
         <div className="mt-40 p-12 glass-card text-center border-brand-blue/10 overflow-hidden relative">
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
            <div className="relative z-10">
               <h3 className="text-2xl font-heading font-extrabold mb-4">Want to See Your Product Here?</h3>
               <p className="text-text-muted mb-8 font-medium">We deliver production-ready code in 4-10 weeks.</p>
               <Link href="/consultation" className="px-10 py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-widest text-xs inline-block">Start Your Success Story</Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
