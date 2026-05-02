'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  Building2, 
  Briefcase, 
  CreditCard, 
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Save,
  Trash
} from 'lucide-react';
import { motion } from 'motion/react';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { useToast } from '@/components/dashboard/Toast';
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function ContactDetailPage({ params }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/contacts/${id}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        setNotes(result.data.notes || '');
      }
    } catch (error) {
      toast.error('Failed to load detail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 0);
    return () => clearTimeout(timer);
  }, [id]);

  const updateStatus = async (status) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dashboard/contacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      const result = await res.json();
      if (result.success) {
        setData(prev => ({ ...prev, status }));
        toast.success(`Status updated to ${status}`);
      }
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const saveNotes = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dashboard/contacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ notes })
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Notes saved');
      }
    } catch (error) {
      toast.error('Failed to save notes');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      const res = await fetch(`/api/dashboard/contacts/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        toast.success('Submission deleted');
        router.push('/dashboard/contacts');
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-8 w-48 bg-white/5 rounded" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[500px] bg-white/5 rounded-2xl" />
        <div className="h-[400px] bg-white/5 rounded-2xl" />
      </div>
    </div>
  );

  if (!data) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-bold text-white mb-2">Submission Not Found</h2>
      <button onClick={() => router.back()} className="text-accent underline">Go back</button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Detail Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-white dark:bg-[#131325] border border-[#d0d0e8] dark:border-[#1e1e3a] text-[#8888aa] hover:text-white transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{data.name}</h2>
            <StatusBadge status={data.status} />
          </div>
          <p className="text-sm text-[#8888aa]">Submission ID: {data._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-[#d0d0e8] dark:border-[#1e1e3a] bg-[#f8fafc] dark:bg-[#0a0a0f]">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                Contact Information
              </h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <DetailField label="Full Name" value={data.name} icon={User} />
              <DetailField label="Email Address" value={data.email} icon={Mail} isLink={`mailto:${data.email}`} />
              <DetailField label="Company" value={data.company || 'Not provided'} icon={Building2} />
              <DetailField label="Service Requested" value={data.service} icon={Briefcase} />
              <DetailField label="Project Budget" value={data.budget || 'Not specified'} icon={CreditCard} />
              <DetailField label="Submission Date" value={new Date(data.createdAt).toLocaleString()} icon={Calendar} />
            </div>

            <div className="p-8 pt-0">
              <h4 className="text-[10px] font-bold text-[#8888aa] uppercase tracking-widest mb-3">Message</h4>
              <div className="p-6 bg-[#f4f6fb] dark:bg-[#0a0a0f]/50 border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-2xl text-slate-700 dark:text-[#f0f0ff] leading-relaxed whitespace-pre-wrap italic">
                &quot;{data.message}&quot;
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Management */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Management</h3>
            
            <div className="space-y-6">
              {/* Status Update */}
              <div>
                <label className="text-[10px] font-bold text-[#8888aa] uppercase tracking-widest mb-3 block">Update Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {['new', 'read', 'replied', 'archived'].map((s) => (
                    <button 
                      key={s}
                      disabled={isUpdating}
                      onClick={() => updateStatus(s)}
                      className={cn(
                        "py-2 px-3 rounded-xl text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-2",
                        data.status === s 
                          ? "bg-accent text-[#0a0a0f]" 
                          : "bg-[#f4f6fb] dark:bg-[#0a0a0f] text-[#555577] border border-[#d0d0e8] dark:border-[#1e1e3a] hover:text-white"
                      )}
                    >
                      {data.status === s && <CheckCircle2 size={12} />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="text-[10px] font-bold text-[#8888aa] uppercase tracking-widest mb-3 block">Internal Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add private notes about this submission..."
                  className="w-full h-32 bg-[#f4f6fb] dark:bg-[#0a0a0f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-xl p-3 text-xs outline-none focus:border-accent resize-none text-white transition-all"
                />
                <button 
                  disabled={isUpdating}
                  onClick={saveNotes}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-[#131325] hover:bg-accent hover:text-[#0a0a0f] text-accent border border-[#1e1e3a] py-2 rounded-xl text-xs font-bold transition-all"
                >
                  <Save size={14} />
                  <span>{isUpdating ? 'Saving...' : 'Save Notes'}</span>
                </button>
              </div>

              {/* Quick Action: Reply */}
              <div className="pt-4 border-t border-[#1e1e3a]">
                <a 
                  href={`mailto:${data.email}?subject=Re: Your inquiry regarding ${data.service}`}
                  className="w-full flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent text-accent hover:text-[#0a0a0f] py-3 rounded-xl text-xs font-bold transition-all group"
                >
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>Reply via Email</span>
                </a>
              </div>

              {/* Danger Zone */}
              <div className="pt-4 border-t border-[#1e1e3a]">
                <button 
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center gap-2 text-[#ef4444] hover:bg-red-500/10 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  <Trash size={14} />
                  <span>Delete Submission</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value, icon: Icon, isLink }) {
  return (
    <div className="flex gap-4 group">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-[#f4f6fb] dark:bg-[#0a0a0f] border border-[#d0d0e8] dark:border-[#1e1e3a] flex items-center justify-center text-[#555577] group-hover:text-accent group-hover:border-accent/40 transition-all">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-[#8888aa] uppercase tracking-widest mb-0.5">{label}</p>
        {isLink ? (
          <a href={isLink} className="text-sm font-bold text-accent hover:underline block truncate">{value}</a>
        ) : (
          <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

function User(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
