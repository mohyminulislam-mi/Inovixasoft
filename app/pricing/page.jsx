'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PricingCard from '@/components/PricingCard';
import SectionTitle from '@/components/SectionTitle';
import { Check, Info, Shield, Zap, Scale } from 'lucide-react';
import Accordion from '@/components/Accordion';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? '$199' : '$299',
      oneTime: '$999',
      features: [
        'Premium Web Presence',
        'Up to 5 Pages',
        'Technical SEO Basics',
        'Mobile Responsive Design',
        '1 Month Post-launch Support',
        'Secure SSL Integration'
      ],
      description: 'Ideal for early-stage startups and portfolios.'
    },
    {
      name: 'Growth',
      price: isAnnual ? '$599' : '$799',
      oneTime: '$3,999',
      popular: true,
      features: [
        'Full SaaS / Web Application',
        'Native Mobile App (1 Platform)',
        'Advanced Analytics Dashboard',
        'Stripe / Payments Integration',
        '3 Months Priority Support',
        'Custom Design System',
        'Multi-region Deployment'
      ],
      description: 'Perfect for scaling digital products.'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      oneTime: 'Custom',
      features: [
        'Complex Multi-platform Solution',
        'Dedicated Engineering Team',
        '24/7 Priority SLA Support',
        'Legacy System Migration',
        'Advanced AI/ML Integration',
        'Hardened Security Audit',
        'White-label Infrastructure'
      ],
      description: 'For organizations with high-scale needs.'
    }
  ];

  const faqs = [
    { title: "What defines a project 'Start'?", content: "Our 'project start' fee covers the core architecture, initial UI/UX designs, and setting up the production-ready infrastructure for your specific product." },
    { title: "Do you offer flexible monthly plans?", content: "Yes! Our monthly maintenance and growth plans ensure your software stays updated, secure, and evolves as your user base grows." },
    { title: "Can I upgrade my plan later?", content: "Absolutely. Most of our clients start with a Growth MVP and move to an Enterprise model as they clear their seed or Series A rounds." },
    { title: "Is there a long-term commitment?", content: "For monthly plans, we offer month-to-month flexibility. For one-time projects, we work in milestones to ensure transparency." },
    { title: "How do you handle custom feature requests?", content: "We provide detailed estimates for any features outside the original scope. Our goal is to be your long-term technology partner." }
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      
      <PageHero 
        title="Simple Transparent Pricing" 
        subtitle="No hidden fees. No complex contracts. Just high-performance engineering tailored to your scale."
      />

      {/* Toggle */}
      <section className="pb-12 text-center relative z-20">
         <div className="inline-flex items-center p-1 bg-bg-secondary border border-border-primary rounded-2xl">
            <button 
               onClick={() => setIsAnnual(false)}
               className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${!isAnnual ? 'bg-brand-blue text-white shadow-lg' : 'text-text-muted hover:text-text-primary'}`}
            >
               One-time
            </button>
            <button 
               onClick={() => setIsAnnual(true)}
               className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${isAnnual ? 'bg-brand-purple text-white shadow-lg' : 'text-text-muted hover:text-text-primary'}`}
            >
               Monthly
            </button>
         </div>
         <p className="text-[10px] font-bold text-brand-blue mt-4 uppercase tracking-[0.3em]">Save up to 20% on annual commitments</p>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {plans.map((plan, i) => (
                <PricingCard 
                  key={i} 
                  tier={{
                    ...plan,
                    price: isAnnual ? plan.price : (plan.name === 'Enterprise' ? 'Custom' : plan.oneTime)
                  }} 
                  index={i} 
                />
             ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-32 px-6 bg-bg-secondary/30 border-y border-border-primary">
         <div className="max-w-7xl mx-auto">
            <SectionTitle title="Compare Features" subtitle="Everything you need to ship world-class software." centered={false} />
            
            <div className="mt-16 overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-border-primary">
                        <th className="px-4 py-6 text-sm font-bold uppercase tracking-widest text-text-muted">Core Capabilities</th>
                        <th className="px-4 py-6 text-sm font-bold uppercase tracking-widest text-center">Starter</th>
                        <th className="px-4 py-6 text-sm font-bold uppercase tracking-widest text-center text-brand-blue">Growth</th>
                        <th className="px-4 py-6 text-sm font-bold uppercase tracking-widest text-center">Enterprise</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border-primary">
                     {[
                       { name: 'Architecture Review', s: true, g: true, e: true },
                       { name: 'Custom UI/UX Design', s: 'Limited', g: 'Advanced', e: 'Full System' },
                       { name: 'API Integrations', s: '1-2', g: 'Up to 5', e: 'Unlimited' },
                       { name: 'AI/ML Implementation', s: false, g: 'Optional', e: true },
                       { name: 'White-labeling', s: false, g: true, e: true },
                       { name: 'Response Time SLA', s: '48 Hours', g: '12 Hours', e: '1 Hour' },
                     ].map((row, i) => (
                       <tr key={i} className="hover:bg-bg-card transition-colors">
                          <td className="px-4 py-6 text-sm font-medium">{row.name}</td>
                          <td className="px-4 py-6 text-center text-sm font-bold">
                            {typeof row.s === 'boolean' ? (row.s ? <Check size={16} className="inline text-green-500" /> : '—') : row.s}
                          </td>
                          <td className="px-4 py-6 text-center text-sm font-bold text-brand-blue">
                             {typeof row.g === 'boolean' ? (row.g ? <Check size={16} className="inline text-brand-blue" /> : '—') : row.g}
                          </td>
                          <td className="px-4 py-6 text-center text-sm font-bold">
                             {typeof row.e === 'boolean' ? (row.e ? <Check size={16} className="inline text-brand-purple" /> : '—') : row.e}
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-heading font-extrabold mb-4">Pricing <span className="text-gradient">Questions</span></h2>
               <p className="text-text-muted">Everything you need to know about our billing and process.</p>
            </div>
            <Accordion items={faqs} />
         </div>
      </section>

      <Footer />
    </main>
  );
}
