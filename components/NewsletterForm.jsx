'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-bg-secondary border border-border-primary rounded-2xl py-5 px-6 pr-16 focus:outline-none focus:border-brand-blue transition-all text-text-primary text-sm font-medium"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="absolute right-2 top-2 bottom-2 w-12 bg-brand-blue text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
      
      <AnimatePresence>
        {status === 'success' && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-xs font-bold text-green-500 mt-4 px-2"
          >
            <CheckCircle2 size={14} /> Subscribed successfully!
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs font-bold text-red-500 mt-4 px-2"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsletterForm;
