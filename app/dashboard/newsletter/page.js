'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  Trash2, 
  Download, 
  RefreshCw,
  Mail,
  CheckSquare,
  Square,
  AlertCircle
} from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { useToast } from '@/components/dashboard/Toast';

const cn = (...classes) => classes.filter(Boolean).join(' ');

function Stats({ subTitle, value, icon: Icon, color }) {
  const colors = {
    orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  };
  return (
    <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-4 rounded-2xl flex items-center gap-4">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors[color])}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#8888aa] uppercase tracking-widest">{subTitle}</p>
        <p className="text-xl font-black text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

export default function NewsletterPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/newsletter');
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Remove this subscriber?')) return;
    try {
      const res = await fetch(`/api/dashboard/newsletter?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        toast.success('Subscriber removed');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} subscribers?`)) return;
    try {
      const res = await fetch(`/api/dashboard/newsletter?ids=${selectedIds.join(',')}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        toast.success('Subscribers deleted');
        setSelectedIds([]);
        fetchData();
      }
    } catch (error) {
      toast.error('Bulk delete failed');
    }
  };

  const exportCSV = () => {
    if (data.length === 0) return;
    
    const headers = ['Email', 'Subscription Date'];
    const rows = data.map(sub => [
      sub.email,
      new Date(sub.createdAt).toISOString()
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Exporting CSV...');
  };

  const filteredData = data.filter(sub => 
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const columns = [
    { 
      header: 'Selection', 
      className: 'w-10',
      render: (row) => (
        <button onClick={() => toggleSelect(row._id)}>
          {selectedIds.includes(row._id) ? <CheckSquare className="text-accent" size={18} /> : <Square className="text-[#555577]" size={18} />}
        </button>
      )
    },
    { 
      header: 'Email', 
      accessorKey: 'email',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Mail size={14} />
          </div>
          <span className="font-bold">{row.email}</span>
        </div>
      )
    },
    { 
      header: 'Date Subscribed', 
      accessorKey: 'createdAt',
      render: (row) => (
        <span className="text-[11px] text-[#8888aa]">
          {new Date(row.createdAt).toLocaleString()}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Newsletter Subscribers</h2>
          <p className="text-sm text-[#8888aa]">Manage your email marketing audience.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={exportCSV}
            disabled={data.length === 0}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stats subTitle="Total Subscribers" value={data.length} icon={Zap} color="orange" />
        <Stats subTitle="This Month" value={data.filter(s => new Date(s.createdAt) > new Date(new Date().setMonth(new Date().getMonth() - 1))).length} icon={RefreshCw} color="blue" />
        <Stats subTitle="Selection" value={selectedIds.length} icon={CheckSquare} color="purple" />
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#13131f] border border-[#d0d0e8] dark:border-[#1e1e3a] p-3 rounded-2xl flex items-center gap-3">
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555577]" size={16} />
          <input 
            type="text" 
            placeholder="Search by email..."
            className="w-full pl-10 pr-4 py-2 bg-[#f4f6fb] dark:bg-[#0a0a0f] border border-[#d0d0e8] dark:border-[#1e1e3a] rounded-xl text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {selectedIds.length > 0 && (
          <button 
            onClick={handleBulkDelete}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
          >
            <Trash2 size={14} />
            <span>Delete Selected ({selectedIds.length})</span>
          </button>
        )}
      </div>

      <DataTable 
        columns={columns}
        data={filteredData}
        loading={loading}
        onView={() => {}}
        onDelete={handleDelete}
      />

      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-3">
        <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-500 leading-normal">
          Always ensure you have permission from users before sending marketing emails. Exported data should be handled according to GDPR and local privacy laws.
        </p>
      </div>
    </div>
  );
}
