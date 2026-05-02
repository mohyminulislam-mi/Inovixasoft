'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-card overflow-hidden h-full flex flex-col border border-white/5 group-hover:border-white/20 transition-all duration-500">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          <div className="absolute top-4 left-4">
             <span className="bg-cyan-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
               {project.category}
             </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link 
              href={`/projects`}
              className="bg-white text-black p-4 rounded-full hover:scale-110 transition-transform"
            >
              <ExternalLink size={24} />
            </Link>
          </div>
        </div>

        <div className="p-8 flex-grow flex flex-col">
          <h3 className="font-heading text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2 mb-6">
            {project.description}
          </p>
          
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] text-slate-500 border border-white/5 bg-white/[0.02] px-2 py-0.5 rounded uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
