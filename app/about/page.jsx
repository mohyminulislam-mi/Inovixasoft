'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Award, Target, Users, Zap, Search, Shield, Cpu, Code } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Shield, title: "Integrity First", text: "We prioritize security and transparent code above all else." },
    { icon: Zap, title: "Extreme Speed", text: "We ship at the speed of thought without compromising stability." },
    { icon: Target, title: "Global Impact", text: "Our products are built for world-class scale and millions of users." },
    { icon: Users, title: "Radical Candor", text: "We work as true partners, giving honest engineering feedback." }
  ];

  const milestones = [
    { year: "2020", title: "ScaleX Foundation", text: "Founded in SF with a team of 3 elite engineers." },
    { year: "2021", title: "Series A Support", text: "Helped 12 startups reach their Series A funding with our MVPs." },
    { year: "2022", title: "Global Expansion", text: "Expanded reached to 5 continents with a remote-first hub." },
    { year: "2023", title: "AI Revolution", text: "Launched dedicated AI engineering department for enterprise automation." }
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title="Engineering Excellence" 
        subtitle="We are a global agency of elite engineers, designers, and strategists obsessed with high-performance digital scale."
      />

      {/* Vision Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
         <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
         >
            <SectionTitle title="Our Mission" subtitle="Beyond typical code." centered={false} />
            <div className="space-y-6 text-text-muted text-lg font-medium leading-relaxed">
               <p>At ScalexDevs, we believe that software should be an asset, not a burden. Many agencies build for the paycheck—we build for the performance.</p>
               <p>Our mission is to empower visionaries with the technical infrastructure they need to change the world. From seed-stage disruptors to Fortune 500 giants, we provide the engineering muscle to handle extreme growth.</p>
            </div>
            <div className="mt-12 p-8 border border-brand-blue/20 bg-brand-blue/5 rounded-3xl">
               <p className="text-brand-blue font-bold tracking-tighter text-2xl italic">&quot;We don&apos;t just build apps; we architect legacies.&quot;</p>
            </div>
         </motion.div>
         <div className="grid grid-cols-2 gap-4 relative">
            <div className="aspect-square bg-bg-secondary rounded-3xl overflow-hidden border border-border-primary flex items-center justify-center">
               <Cpu size={80} className="text-brand-blue/20" />
            </div>
            <div className="aspect-square bg-brand-blue/10 rounded-3xl overflow-hidden border border-brand-blue/20 flex items-center justify-center translate-y-12">
               <Code size={80} className="text-brand-blue/40" />
            </div>
            <div className="aspect-square bg-brand-purple/10 rounded-3xl overflow-hidden border border-brand-purple/20 flex items-center justify-center -translate-y-8">
               <Shield size={80} className="text-brand-purple/40" />
            </div>
            <div className="aspect-square bg-bg-secondary rounded-3xl overflow-hidden border border-border-primary flex items-center justify-center translate-y-4">
               <Users size={80} className="text-text-muted/20" />
            </div>
         </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-bg-secondary/30 px-6">
         <div className="max-w-7xl mx-auto">
            <SectionTitle title="The Scalex Way" subtitle="Our core values drive every pull request." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {values.map((v, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="glass-card p-10 border-brand-blue/5 hover:border-brand-blue/20 transition-all group"
                 >
                    <div className="w-14 h-14 bg-bg-card border border-border-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all group-hover:rotate-6">
                       <v.icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">{v.title}</h4>
                    <p className="text-xs text-text-muted font-medium leading-relaxed">{v.text}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <SectionTitle title="Our Journey" subtitle="From a home office to global scale." />
         <div className="relative border-l border-border-primary ml-4 md:ml-0 md:border-none">
            <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[1px] bg-border-primary z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
               {milestones.map((m, i) => (
                 <div key={i} className="relative pt-16 md:pt-24 px-8 md:px-0">
                    <div className="absolute top-0 left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_15px_rgba(0,212,255,1)]" />
                    <div className="text-center md:text-center">
                       <span className="text-4xl md:text-6xl font-heading font-black text-gradient block mb-4">{m.year}</span>
                       <h5 className="text-lg font-bold mb-2">{m.title}</h5>
                       <p className="text-xs text-text-muted font-medium leading-relaxed">{m.text}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Team CTA */}
      <section className="py-32 px-6">
         <div className="max-w-4xl mx-auto glass-card p-12 text-center border-brand-blue/10 overflow-hidden relative">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px]" />
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">Want to Join Us?</h3>
            <p className="text-text-muted text-lg mb-10 font-medium">We are always hiring elite designers and world-class engineers.</p>
            <Link href="/careers" className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest text-xs inline-block hover:scale-105 transition-transform">Explore Careers</Link>
         </div>
      </section>

      <Footer />
    </main>
  );
}
