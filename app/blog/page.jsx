'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, Mail } from 'lucide-react';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';

export default function BlogListingPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Engineering', 'AI', 'Security', 'Design', 'Growth'];

  const filteredPosts = blogPosts.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Knowledge Center" 
        subtitle="Insights, engineering deep-dives, and updates from the ScalexDevs team."
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
         {/* Top Grid: Featured Post & Newsletter */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-8 group relative overflow-hidden rounded-3xl glass-card border-brand-blue/10 min-h-[500px] flex flex-col justify-end p-8 md:p-16"
            >
               <img src={blogPosts[0].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60" alt="Featured" />
               <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent z-0" />
               <div className="relative z-10 space-y-6">
                  <span className="px-3 py-1 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">Featured Article</span>
                  <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-text-primary leading-[0.9]">{blogPosts[0].title}</h2>
                  <p className="text-lg text-text-muted font-medium max-w-2xl">{blogPosts[0].excerpt}</p>
                  <Link href={`/blog/${blogPosts[0].slug}`} className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-brand-blue/20 inline-flex items-center gap-2 group/btn">
                    Read Featured <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </motion.div>

            <div className="lg:col-span-4 flex flex-col gap-8">
               <div className="glass-card p-10 border-brand-purple/10 flex-grow flex flex-col justify-center">
                  <Mail size={40} className="text-brand-purple mb-6" />
                  <h3 className="text-2xl font-heading font-extrabold mb-4">Engineering Weekly</h3>
                  <p className="text-xs text-text-muted font-medium mb-8 leading-relaxed">Join 5,000+ developers getting our secret sauce on high-performance architecture.</p>
                  <NewsletterForm />
                  <p className="text-[10px] text-text-muted mt-4 font-bold uppercase tracking-widest italic text-center">Zero spam, total technical focus.</p>
               </div>
            </div>
         </div>

         {/* Filters */}
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-8 border-b border-border-primary">
            <div className="flex flex-wrap items-center justify-center gap-2">
               {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-bg-secondary text-text-muted hover:text-text-primary border border-border-primary'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
            <div className="relative w-full md:w-80">
               <input 
                 type="text" 
                 placeholder="Search articles..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-bg-secondary border border-border-primary rounded-xl py-4 pl-12 pr-4 text-xs font-medium focus:outline-none focus:border-brand-blue transition-all"
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            </div>
         </div>

         {/* Grid */}
         <AnimatePresence mode='wait'>
            {filteredPosts.length > 0 ? (
               <motion.div 
                 key={filter + search}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               >
                  {filteredPosts.map((post, i) => (
                    <BlogCard key={post.slug} post={post} index={i} />
                  ))}
               </motion.div>
            ) : (
               <div className="py-40 text-center text-text-muted font-medium">No articles found matching your criteria.</div>
            )}
         </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
