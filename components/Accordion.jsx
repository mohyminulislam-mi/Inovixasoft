'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-border-primary last:border-none overflow-hidden">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand-blue transition-colors outline-none"
      >
        <span className="text-lg font-bold text-text-primary">{title}</span>
        <ChevronDown 
          size={20} 
          className={`text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="pb-6 text-text-muted leading-relaxed text-sm font-medium">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="glass-card px-8 border-brand-blue/5">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
