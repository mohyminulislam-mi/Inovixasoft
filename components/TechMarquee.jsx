'use client';

import { motion } from 'motion/react';

const TechMarquee = () => {
  const techs = [
    'React', 'Next.js', 'Node.js', 'Python', 'React Native', 'PostgreSQL', 
    'MongoDB', 'AWS', 'Docker', 'Figma', 'Stripe', 'Firebase', 'Redis', 
    'GraphQL', 'Tailwind CSS', 'Google Cloud', 'TypeScript', 'WebRTC'
  ];

  return (
    <div className="w-full overflow-hidden bg-white/5 py-10 relative">
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-dark-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-dark-bg to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...techs, ...techs].map((tech, index) => (
          <div 
            key={index} 
            className="mx-8 text-xl font-heading font-bold text-white/30 hover:text-brand-cyan transition-colors cursor-default select-none uppercase tracking-widest"
          >
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
