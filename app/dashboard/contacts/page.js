'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  Plus,
  ShieldCheck,
  MoreVertical,
  X
} from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { useToast } from '@/components/dashboard/Toast';

export default function ContactsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const router = useRouter();
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        status: statusFilter,
        search: search
      });
      const res = await fetch(`/api/dashboard/contacts?${query}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      const res = await fetch(`/api/dashboard/contacts/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        toast.success('Submission deleted');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      const res = await fetch(`/api/dashboard/contacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'read' })
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Marked as read');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    { 
      header: 'Name', 
      accessorKey: 'name',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900 dark:text-white font-bold">{row.name}</span>
          <span className="text-[10px] text-[#8888aa]">{row.email}</span>
        </div>
      )
    },
    { header: 'Service', accessorKey: 'service' },
    { header: 'Budget', accessorKey: 'budget' },
    { 
      header: 'Date', 
      accessorKey: 'createdAt',
      render: (row) => (
        <span className="text-[11px] text-[#8888aa]">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Contact Submissions</h2>
          <p className="text-sm text-[#8888aa]">Manage inquiries from potential clients and partners.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchData}
            className="p-2 rounded-xl bg-white dark:bg-[#131325] border border-[#d0d0e8] dark:border-[#1e1e3a] text-[#8888aa] hover:text-white transition-all"
          >
            <RefreshCw size={18} className={loading && search === '' ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-3 rounded-2xl flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555577] group-focus-within:text-accent transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-[#f4f6fb] dark:bg-[#0a0a0f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-xl text-sm outline-none transition-focus focus:border-accent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555577] hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[#f4f6fb] dark:bg-[#0a0a0f] p-1 rounded-xl border border-[#d0d0e8] dark:border-[#1e1e3a]">
            {['All', 'new', 'read', 'replied'].map((s) => (
              <button 
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${statusFilter === s ? 'bg-white dark:bg-[#131325] text-accent shadow-sm' : 'text-[#555577] hover:text-white'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <button 
            onClick={() => {setSearch(''); setStatusFilter('All');}}
            className="p-2.5 rounded-xl text-[#ef4444] hover:bg-red-500/10 transition-all font-medium text-xs"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns} 
        data={data} 
        loading={loading}
        onView={(id) => router.push(`/dashboard/contacts/${id}`)}
        onDelete={handleDelete}
        onMarkRead={handleMarkRead}
      />
    </div>
  );
}
