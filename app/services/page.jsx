'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/data';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Users, Shield } from 'lucide-react';

export default function ServicesPage() {
  const categories = [...new Set(services.map(s => s.category))];

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Our Elite Services" 
        subtitle="End-to-end engineering, design, and strategy solutions for high-performance scale."
      />

      {/* Value Prop */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
         {[
           { icon: Zap, title: "Rapid Delivery", text: "Ship MVPs and features at record speed without technical debt." },
           { icon: Shield, title: "Zero Compromise", text: "Military-grade security and testing baked into every line of code." },
           { icon: Target, title: "Scalable DNA", text: "Systems designed from day one to handle millions of requests." },
           { icon: Users, title: "True Partners", text: "We work as your internal team, sharing the burden of growth." }
         ].map((item, i) => (
           <div key={i} className="text-center group">
              <div className="w-14 h-14 bg-bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border-primary group-hover:bg-brand-blue group-hover:text-white transition-all group-hover:-translate-y-2">
                 <item.icon size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-xs text-text-muted font-medium">{item.text}</p>
           </div>
         ))}
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-bg-secondary/30">
         <div className="max-w-7xl mx-auto">
            {categories.map(category => (
              <div key={category} className="mb-32 last:mb-0">
                 <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter">{category} <span className="text-brand-blue">Solutions</span></h2>
                    <div className="h-[1px] flex-grow bg-border-primary" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.filter(s => s.category === category).map((service, i) => (
                       <ServiceCard key={service.slug} service={service} index={i} />
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6">
         <div className="max-w-4xl mx-auto glass-card p-12 text-center border-brand-purple/10">
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">Need a <span className="text-gradient">Custom Solution?</span></h3>
            <p className="text-text-muted text-lg mb-10 font-medium">Bespoke requirements? Our strategy team specializes in unique enterprise architectures.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link href="/consultation" className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest text-xs">Book Strategy Call</Link>
               <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-text-primary hover:text-brand-blue transition-colors flex items-center gap-2 group">
                 Drop a Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
