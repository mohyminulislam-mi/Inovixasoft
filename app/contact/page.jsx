'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Linkedin, Twitter, Github, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Let's Build the Future" 
        subtitle="Have a project in mind? Our elite engineering team is ready to build your next-gen digital solution."
      />

      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
           <div className="glass-card p-10 border-brand-blue/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 py-2 px-6 bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl">
                 Response within 24h
              </div>
              
              <AnimatePresence mode='wait'>
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-20 text-center"
                  >
                     <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                     </div>
                     <h3 className="text-3xl font-heading font-extrabold mb-4">Message Sent!</h3>
                     <p className="text-text-muted mb-8 font-medium">Thanks for reaching out. Our strategy team will review your project and get back to you within 24 hours.</p>
                     <button 
                       onClick={() => setStatus('idle')}
                       className="text-brand-blue font-bold text-sm uppercase tracking-widest hover:underline"
                     >
                       Send Another Message
                     </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Full Name *</label>
                           <input name="name" required placeholder="John Doe" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-5 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Email Address *</label>
                           <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-5 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Company Name</label>
                           <input name="company" placeholder="Acme Corp" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-5 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Service Type *</label>
                           <select name="service" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-5 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all appearance-none cursor-pointer">
                              <option value="Web Development">Web Development</option>
                              <option value="Mobile App">Mobile App</option>
                              <option value="AI & Automation">AI & Automation</option>
                              <option value="SaaS Architecture">SaaS Architecture</option>
                              <option value="DevOps & Security">DevOps & Security</option>
                              <option value="Other">Other</option>
                           </select>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Project Budget Range</label>
                        <select name="budget" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-5 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all appearance-none cursor-pointer">
                           <option value="$1k - $5k">$1,000 - $5,000</option>
                           <option value="$5k - $20k">$5,000 - $20,000</option>
                           <option value="$20k - $50k">$20,000 - $50,000</option>
                           <option value="$50k+">$50,000+</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Your Message *</label>
                        <textarea name="message" required rows="6" placeholder="Tell us about your project goals, timeline, and requirements..." className="w-full bg-bg-secondary border border-border-primary rounded-xl p-5 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all resize-none" />
                     </div>
                     <button 
                       type="submit" 
                       disabled={status === 'loading'}
                       className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-blue/30 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                     >
                       {status === 'loading' ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       ) : (
                         <>Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                       )}
                     </button>
                  </motion.form>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-5 space-y-12">
           <div className="space-y-8">
              <SectionTitle title="Contact Information" subtitle="Direct channels to our global engineering hub." centered={false} />
              <div className="space-y-6">
                 {[
                   { icon: Mail, label: 'Email Us', value: 'hello@scalexdevs.com', color: 'text-brand-blue' },
                   { icon: Phone, label: 'Call/WhatsApp', value: '+1 (555) SCALEX-DEV', color: 'text-brand-purple' },
                   { icon: MapPin, label: 'Offices', value: 'Remote-First Worldwide', color: 'text-brand-blue' },
                   { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7 on site', color: 'text-cyan-500' }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="flex items-center gap-6 p-6 rounded-2xl border border-border-primary bg-bg-secondary/50 group hover:border-brand-blue/30 transition-all"
                   >
                      <div className={cn("w-14 h-14 rounded-xl bg-bg-card flex items-center justify-center shrink-0 border border-border-primary shadow-sm group-hover:scale-110 transition-transform", item.color)}>
                         <item.icon size={24} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-1">{item.label}</p>
                         <p className="text-lg font-bold text-text-primary">{item.value}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           <div className="pt-12 border-t border-border-primary">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-8 italic">Follow our journey</p>
              <div className="flex gap-4">
                 {[
                   { icon: Twitter, href: '#' },
                   { icon: Linkedin, href: '#' },
                   { icon: Github, href: '#' }
                 ].map((social, i) => (
                   <Link key={i} href={social.href} className="w-12 h-12 glass-card flex items-center justify-center text-text-muted hover:text-brand-blue hover:border-brand-blue/50 transition-all">
                      <social.icon size={20} />
                   </Link>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto h-[400px] glass-card grayscale opacity-50 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="relative z-10 text-center">
               <Globe size={48} className="mx-auto mb-4 text-text-muted" />
               <p className="text-xs font-bold uppercase tracking-[0.4em] text-text-muted">Global Operations Hub</p>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
