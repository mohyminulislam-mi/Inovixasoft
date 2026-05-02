'use client';

import { useState } from 'react';
const cn = (...classes) => classes.filter(Boolean).join(' ');

import { 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  Eye, 
  Trash2, 
  CheckCircle2,
  FileSearch
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import StatusBadge from './StatusBadge';

export default function DataTable({ 
  columns, 
  data, 
  loading = false, 
  onView, 
  onDelete, 
  onMarkRead,
  pagination = true
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = pagination ? data.slice(startIndex, startIndex + itemsPerPage) : data;

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f4f6fb] dark:bg-[#0a0a0f] border-b border-[#d0d0e8] dark:border-[#1e1e3a]">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-4 text-[10px] font-bold text-[#8888aa] uppercase tracking-widest">
                    <div className="h-2 w-16 bg-white/5 animate-pulse rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="border-b border-[#d0d0e8] dark:border-[#1e1e3a]">
                  {columns.map((col, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-3 w-full bg-white/5 animate-pulse rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#555577] mb-4">
          <FileSearch size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No data found</h3>
        <p className="text-sm text-[#8888aa] max-w-xs">We couldn&apos;t find any records matching your criteria. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f4f6fb] dark:bg-[#0a0a0f] border-b border-[#d0d0e8] dark:border-[#1e1e3a]">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={cn(
                  "px-6 py-4 text-[10px] font-bold text-[#8888aa] uppercase tracking-widest",
                  col.className
                )}>
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-[10px] font-bold text-[#8888aa] uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-[#f0f0ff]">
            <AnimatePresence mode="popLayout">
              {currentData.map((row, idx) => (
                <motion.tr 
                  key={row._id || idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group hover:bg-[#f8fafc] dark:hover:bg-white/5 border-b border-[#d0d0e8] dark:border-[#1e1e3a] transition-all cursor-pointer"
                  onClick={() => onView(row._id)}
                >
                  {columns.map((col, j) => (
                    <td key={j} className={cn("px-6 py-4 text-sm font-medium", col.cellClassName)}>
                      {col.render ? col.render(row) : row[col.accessorKey]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onView(row._id)}
                        className="p-1.5 rounded-lg hover:bg-accent/10 text-[#8888aa] hover:text-accent transition-all"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {onMarkRead && row.status === 'new' && (
                        <button 
                          onClick={() => onMarkRead(row._id)}
                          className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-[#8888aa] hover:text-emerald-500 transition-all font-medium"
                          title="Mark as Read"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => onDelete(row._id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#8888aa] hover:text-red-500 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 bg-[#f4f6fb] dark:bg-[#0a0a0f] border-t border-[#d0d0e8] dark:border-[#1e1e3a] flex items-center justify-between">
          <p className="text-xs text-[#8888aa]">
            Showing <span className="font-bold text-slate-900 dark:text-white">{startIndex + 1}</span> to <span className="font-bold text-slate-900 dark:text-white">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{data.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1.5 rounded-lg border border-[#d0d0e8] dark:border-[#1e1e3a] text-[#8888aa] hover:bg-white/5 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-bold transition-all transition-colors",
                  currentPage === i + 1 
                    ? "bg-accent text-[#0a0a0f]" 
                    : "text-[#8888aa] hover:bg-white/5"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 rounded-lg border border-[#d0d0e8] dark:border-[#1e1e3a] text-[#8888aa] hover:bg-white/5 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
