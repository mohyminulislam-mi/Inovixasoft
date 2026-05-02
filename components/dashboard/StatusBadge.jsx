'use client';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function StatusBadge({ status, type = 'default' }) {
  const getColors = (s) => {
    const lowStatus = s?.toLowerCase();
    
    // Contacts/Global
    if (['new', 'pending', 'active'].includes(lowStatus)) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    if (['read', 'archived', 'draft', 'inactive'].includes(lowStatus)) return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    if (['replied', 'confirmed', 'completed', 'published', 'hired'].includes(lowStatus)) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (['cancelled', 'rejected'].includes(lowStatus)) return 'bg-red-500/10 text-red-500 border-red-500/20';
    if (['ongoing', 'reviewing', 'shortlisted'].includes(lowStatus)) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    
    return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
      getColors(status)
    )}>
      {status}
    </span>
  );
}
