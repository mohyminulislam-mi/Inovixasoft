'use client';

import { motion } from 'motion/react';

const PageHero = ({ title, subtitle, centered = true }) => {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden grain-overlay">
      <div className="absolute inset-0 z-0">
        <div className="dark:block hidden absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-[140px]" />
        <div className="dark:block hidden absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={centered ? 'text-center max-w-4xl mx-auto' : 'text-left max-w-5xl'}
        >
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold leading-[0.9] tracking-tighter text-text-primary mb-10">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i % 3 === 2 ? 'text-gradient' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-text-muted leading-relaxed max-w-3xl mx-auto font-medium">
            {subtitle}
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-primary to-transparent" />
    </section>
  );
};

export default PageHero;
