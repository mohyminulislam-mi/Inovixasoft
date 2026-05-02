'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Accordion from '@/components/Accordion';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['General', 'Services', 'Pricing', 'Process', 'Technical', 'Careers'];

  const allFaqs = {
    'General': [
      { title: "Who is ScalexDevs?", content: "ScalexDevs is a global software engineering agency specializing in high-performance digital products, AI solutions, and enterprise architecture." },
      { title: "Where are you located?", content: "We are a remote-first company with talent distributed across 15+ countries. Our core engineering team works asynchronously to ensure 24/7 delivery." },
      { title: "How long have you been in business?", content: "We started in 2020 with a mission to help high-growth startups scale their technology without compromise." }
    ],
    'Services': [
      { title: "What services do you offer?", content: "Our core services include Web Application Development, Native Mobile Apps (React Native/iOS/Android), AI & Automation, SaaS Product Architecture, and DevOps." },
      { title: "Do you offer SEO services?", content: "Yes, we provide Technical SEO and Performance Optimization to ensure your apps and websites rank at the top of search results." }
    ],
    'Pricing': [
      { title: "How much does a project cost?", content: "Every project is unique. Starter presence begins at $999, while custom enterprise solutions are quoted based on specific architecture and team requirements." },
      { title: "Do you have monthly retainers?", content: "Yes, we offer Growth and Enterprise monthly plans for ongoing development, maintenance, and priority support." }
    ],
    'Process': [
      { title: "How do we get started?", content: "The best way is to book a free 30-minute consultation. We review your requirements and provide a detailed roadmap and quote within 24 hours." },
      { title: "What is your typical project timeline?", content: "Most MVPs and standard projects take 4 to 10 weeks to ship. Enterprise-level systems may take longer based on milestones." }
    ],
    'Technical': [
      { title: "What is your main tech stack?", content: "We primarily build with Next.js, React, Node.js, PostgreSQL, and AWS. However, our team is proficient in a wide arsenal including AI tools and mobile frameworks." },
      { title: "Do you provide code ownership?", content: "Absolutely. Once the project is finalized and paid for, you have full ownership of the intellectual property and source code." }
    ],
    'Careers': [
      { title: "Are you hiring?", content: "We are always looking for world-class engineers and designers. Check our /careers page for current open positions." }
    ]
  };

  const filteredFaqs = allFaqs[activeTab].filter(faq => 
    faq.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Frequently Asked Questions" 
        subtitle="Transparent answers for forward-thinking businesses. If you don't find what you need, our team is just a call away."
      />

      <section className="py-20 px-6 max-w-5xl mx-auto">
         {/* Search & Tabs */}
         <div className="mb-16 space-y-8">
            <div className="relative max-w-xl mx-auto">
               <input 
                 type="text" 
                 placeholder="Search questions..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-bg-secondary border border-border-primary rounded-2xl py-5 px-14 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all"
               />
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
               {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setActiveTab(cat)}
                   className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-bg-secondary text-text-muted hover:text-text-primary border border-border-primary'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
         </div>

         {/* Content */}
         <div className="min-h-[400px]">
            <AnimatePresence mode='wait'>
               <motion.div
                 key={activeTab + searchQuery}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.3 }}
               >
                 {filteredFaqs.length > 0 ? (
                   <Accordion items={filteredFaqs} />
                 ) : (
                   <div className="text-center py-20 text-text-muted">
                      No results found for &quot;{searchQuery}&quot;. Try another category.
                   </div>
                 )}
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="mt-32 p-12 glass-card text-center border-brand-purple/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            <h3 className="text-3xl font-heading font-extrabold mb-4">Still have <span className="text-gradient">questions?</span></h3>
            <p className="text-text-muted mb-8 font-medium">We thrive on complex inquiries. Book a free discovery call today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/consultation" className="px-10 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm shadow-xl shadow-brand-blue/20 hover:scale-105 active:scale-95 transition-all">Book Consultation</Link>
               <Link href="/contact" className="px-10 py-4 bg-bg-secondary border border-border-primary rounded-xl font-bold text-sm hover:bg-bg-card transition-all">Contact Support</Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
