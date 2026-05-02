'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import { motion } from 'motion/react';
import { services } from '@/lib/data';
import { CheckCircle2, ArrowRight, Zap, Shield, Target, Cpu, MessageSquare } from 'lucide-react';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);

  if (!service) return <div className="p-20 text-center">Service not found.</div>;

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title={service.name} 
        subtitle={service.description}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Sidebar Left */}
         <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 border-brand-blue/10">
               <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted mb-8">All Services</h4>
               <ul className="space-y-4">
                  {services.map(s => (
                    <li key={s.slug}>
                       <Link 
                         href={`/services/${s.slug}`}
                         className={`flex items-center justify-between p-4 rounded-xl text-sm font-bold transition-all border ${s.slug === slug ? 'bg-brand-blue text-white border-brand-blue' : 'bg-bg-secondary text-text-muted border-border-primary hover:border-brand-blue/30'}`}
                       >
                          {s.name} <ChevronRight size={14} />
                       </Link>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="p-8 bg-brand-purple/5 border border-brand-purple/10 rounded-3xl text-center">
               <Zap size={40} className="text-brand-purple mx-auto mb-6" />
               <h5 className="text-xl font-bold mb-4 text-brand-purple">Need a custom quote?</h5>
               <p className="text-xs text-brand-purple/70 font-bold leading-relaxed mb-8 italic">Every project has unique requirements. We provide detailed quotes within 24 hours.</p>
               <Link href="/consultation" className="block w-full py-4 bg-brand-purple text-white rounded-xl font-bold uppercase tracking-widest text-xs">Request Quote</Link>
            </div>
         </div>

         {/* Main Content */}
         <div className="lg:col-span-8 space-y-16">
            <div>
               <SectionTitle title="The ScaleX Approach" subtitle={service.fullDescription} centered={false} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-primary rounded-xl font-medium text-sm text-text-primary/80">
                       <CheckCircle2 size={18} className="text-brand-blue shrink-0" />
                       {feature}
                    </div>
                  ))}
               </div>
            </div>

            {/* Pricing Tiers */}
            <div>
               <h3 className="text-3xl font-heading font-extrabold mb-10">Transparent <span className="text-gradient">Pricing</span></h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.pricing.map((tier, i) => (
                    <div key={i} className={`glass-card p-8 border-t-2 ${i === 1 ? 'border-brand-blue' : 'border-border-primary'}`}>
                       <h5 className="font-bold text-lg mb-2">{tier.name}</h5>
                       <p className="text-3xl font-black text-brand-blue mb-6">{tier.price}</p>
                       <ul className="space-y-3 mb-8">
                          {tier.features.map((f, j) => (
                             <li key={j} className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-2">
                                <span className="w-1 h-1 bg-brand-blue rounded-full" /> {f}
                             </li>
                          ))}
                       </ul>
                       <Link href="/contact" className="block w-full py-3 bg-bg-secondary border border-border-primary text-center rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-brand-blue/30 transition-all">Get Started</Link>
                    </div>
                  ))}
               </div>
            </div>

            {/* CTA */}
            <div className="p-12 glass-card border-brand-blue/10 relative overflow-hidden text-center md:text-left">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px]" />
               <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-4">Have specific needs for {service.name}?</h4>
                  <p className="text-text-muted text-sm mb-8 font-medium">Join 60+ global clients who trust us with their critical digital infrastructure.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Link href="/contact" className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/20">Let&apos;s Connect</Link>
                     <Link href="/faq" className="px-8 py-4 bg-bg-secondary border border-border-primary rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-bg-card transition-all">Common Questions</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

const ChevronRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
