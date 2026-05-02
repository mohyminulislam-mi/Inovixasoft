'use client';

import { motion } from 'motion/react';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-text-primary mb-6">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i % 3 === 2 ? 'text-gradient' : ''}>
              {word}{' '}
            </span>
          ))}
        </h2>
        {subtitle && (
          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SectionTitle;
