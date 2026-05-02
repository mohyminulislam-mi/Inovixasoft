'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden group border-brand-blue/5 hover:border-brand-blue/20 transition-all flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">
          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-blue" /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-purple" /> {post.readTime}</span>
        </div>
        <h3 className="text-xl font-heading font-extrabold mb-4 group-hover:text-brand-blue transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-text-muted mb-8 line-clamp-3 font-medium flex-grow">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-xs font-bold uppercase tracking-widest text-text-primary group-hover:text-brand-blue transition-colors flex items-center gap-2"
        >
          Read Article <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
