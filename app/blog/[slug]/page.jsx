'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'motion/react';
import { blogPosts } from '@/lib/data';
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1] || null;
  const prevPost = blogPosts[currentIndex - 1] || null;

  if (!post) return <div className="p-20 text-center">Article not found.</div>;

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden grain-overlay border-b border-border-primary">
         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue rounded-full blur-[150px] -mr-48 -mt-48" />
         </div>

         <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-brand-blue transition-all text-xs font-bold uppercase tracking-widest mb-4 group">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Center
            </Link>
            
            <div className="flex items-center justify-center gap-3">
               <span className="px-3 py-1 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">{post.category}</span>
               <span className="px-3 py-1 bg-bg-secondary text-text-muted text-[10px] font-bold uppercase tracking-widest rounded-lg border border-border-primary">Expert Insight</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-heading font-extrabold tracking-tighter text-text-primary leading-[1.1]">{post.title}</h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bg-secondary rounded-full border border-border-primary" />
                  <div className="text-left">
                     <p className="text-xs font-bold text-text-primary">Devin Carter</p>
                     <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest">Head of Engineering</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-blue" /> {post.date}</span>
                  <span className="flex items-center gap-2"><Clock size={14} className="text-brand-purple" /> {post.readTime}</span>
               </div>
            </div>
         </div>
      </section>

      {/* Article Content */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Share Sidebar */}
         <aside className="lg:col-span-1 border-r border-border-primary hidden lg:block pr-8 sticky top-32 h-[300px]">
             <div className="flex flex-col gap-6 items-center">
                <button className="text-text-muted hover:text-brand-blue transition-all"><Twitter size={20} /></button>
                <button className="text-text-muted hover:text-brand-blue transition-all"><Linkedin size={20} /></button>
                <button className="text-text-muted hover:text-brand-blue transition-all"><Facebook size={20} /></button>
                <button className="text-text-muted hover:text-brand-blue transition-all"><LinkIcon size={20} /></button>
                <div className="w-[1px] h-20 bg-border-primary" />
                <button className="text-text-muted hover:text-brand-blue transition-all"><Bookmark size={20} /></button>
             </div>
         </aside>

         {/* Content Area */}
         <div className="lg:col-span-7">
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden glass-card border-brand-blue/10 p-2 shadow-2xl mb-16">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <article className="prose prose-invert prose-brand max-w-none prose-headings:font-heading prose-headings:font-extrabold prose-p:text-text-muted/80 prose-p:font-medium prose-p:leading-relaxed prose-li:text-text-muted/80 prose-strong:text-text-primary">
               <p className="text-xl leading-relaxed text-text-primary/90 font-bold mb-10">In the rapidly evolving landscape of {post.category === 'AI' ? 'artificial intelligence' : 'digital architecture'}, scaling isn&apos;t just about adding more servers—it&apos;s about architectural resilience and engineering foresight.</p>
               
               <h2>The Core Challenge</h2>
               <p>As applications grow from a few thousand to millions of concurrent users, the small bottlenecks you once ignored become catastrophic failures. Our research shows that 70% of scaling failures happen at the data access layer, not the frontend.</p>
               
               <div className="p-8 my-12 bg-bg-secondary border-l-4 border-brand-blue rounded-r-3xl italic font-bold text-text-primary">
                  &quot;You don&apos;t build for scale once. You architect for change, which allows scale to happen organically.&quot;
               </div>

               <h2>Implementing Resilience</h2>
               <p>The first step in any high-scale architecture is decoupling. When you separate your critical services into independent pods, you gain the ability to scale vertically where it counts.</p>
               <ul>
                  <li><strong>Horizontal Auto-scaling:</strong> Never hardcode your resource limits.</li>
                  <li><strong>Edge Caching:</strong> Offload 80% of your static read requests to the browser edge.</li>
                  <li><strong>Database Sharding:</strong> Transition from a single RDBMS to a distributed cluster.</li>
               </ul>

               <h2>Conclusion</h2>
               <p>Scaling {post.title} requires a mindset of extreme ownership. Every engineer on your team must understand how their code affects the global infrastructure. At ScalexDevs, we bake these principles into every project we ship.</p>
            </article>

            {/* Pagination */}
            <div className="mt-24 pt-12 border-t border-border-primary flex flex-col sm:flex-row justify-between gap-12">
               {prevPost ? (
                 <Link href={`/blog/${prevPost.slug}`} className="flex flex-col gap-4 group max-w-xs">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2"><ChevronLeft size={16} /> Previous Article</p>
                    <p className="text-lg font-bold group-hover:text-brand-blue transition-colors">{prevPost.title}</p>
                 </Link>
               ) : <div />}
               {nextPost ? (
                 <Link href={`/blog/${nextPost.slug}`} className="flex flex-col gap-4 items-end group text-right max-w-xs">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">Next Article <ChevronRight size={16} /></p>
                    <p className="text-lg font-bold group-hover:text-brand-blue transition-colors">{nextPost.title}</p>
                 </Link>
               ) : <div />}
            </div>
         </div>

         {/* Right Sidebar: Related etc */}
         <aside className="lg:col-span-4 space-y-12">
            <div className="glass-card p-10 border-brand-blue/10 sticky top-32">
               <h4 className="font-bold text-lg mb-8 pb-4 border-b border-border-primary">Key Takeaways</h4>
               <ul className="space-y-4">
                  {[
                    "Architect for change, not just capacity.",
                    "Decouple state from logic for horizontal scaling.",
                    "Optimize data access layers first.",
                    "Leverage edge computing wherever possible."
                  ].map((t, i) => (
                    <li key={i} className="flex gap-4 text-xs font-bold text-text-muted">
                       <span className="text-brand-blue mt-1">•</span> {t}
                    </li>
                  ))}
               </ul>
               <div className="mt-12 p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl">
                  <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2">Hire the Experts</p>
                  <p className="text-xs font-medium text-text-muted leading-relaxed mb-6">Need help scaling your Next.js application to millions of users?</p>
                  <Link href="/consultation" className="block text-center py-3 bg-brand-blue text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-brand-blue/20">Talk to Strategy</Link>
               </div>
            </div>
         </aside>
      </section>

      <Footer />
    </main>
  );
}
