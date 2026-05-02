'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PricingCard = ({ tier }) => {
  const isGrowth = tier.name === 'Growth';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass-card p-10 flex flex-col h-full border-t-4 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group ${
        isGrowth 
          ? 'border-brand-blue bg-bg-card z-10 shadow-[0_20px_50px_rgba(0,212,255,0.1)]' 
          : 'border-border-primary'
      }`}
    >
      {isGrowth && (
        <div className="absolute top-0 right-0 py-2 px-6 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-bl-2xl">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className="font-heading text-2xl font-extrabold mb-2 text-text-primary group-hover:text-brand-blue transition-colors">{tier.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-heading font-black text-gradient">{tier.price}</span>
          {tier.price !== 'Custom' && <span className="text-sm text-text-muted font-bold uppercase tracking-tighter">/ start</span>}
        </div>
        <p className="text-xs text-text-muted mt-4 font-medium leading-relaxed">{tier.description}</p>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-primary/80 font-medium">
            <Check size={18} className="text-brand-blue shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs text-center transition-all ${
          isGrowth 
            ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/25 hover:bg-brand-blue/90' 
            : 'bg-bg-secondary text-text-primary border border-border-primary hover:bg-bg-card hover:border-brand-blue/30'
        }`}
      >
        Choose {tier.name}
      </Link>
    </motion.div>
  );
};

export default PricingCard;
