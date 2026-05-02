'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div className="glass-card p-8 h-full flex flex-col items-start transition-all duration-300 group-hover:border-brand-cyan/50 group-hover:bg-brand-blue/5 glow-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-cyan-500/10" />
          
          <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
            <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          
          <h3 className="font-heading text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
            {service.name}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
            {service.description}
          </p>
          
          <div className="flex items-center gap-2 text-brand-cyan font-bold text-xs uppercase tracking-widest mt-auto">
            Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
