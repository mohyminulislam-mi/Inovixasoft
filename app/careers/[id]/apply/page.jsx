'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ArrowLeft, Send, Shield } from 'lucide-react';
import Link from 'next/link';

export default function JobApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [applicationId, setApplicationId] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch('/api/careers/jobs');
        const jobs = await res.json();
        const found = jobs.find(j => j.id === id);
        setJob(found);
      } catch (e) { console.error(e); }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.jobId = id;
    data.jobTitle = job?.title;

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        setApplicationId(result.applicationId.toString().padStart(5, '0'));
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-bg-primary">
        <Navbar />
        <div className="pt-48 pb-32 px-6 flex items-center justify-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="max-w-xl w-full glass-card p-12 text-center border-brand-blue/20"
           >
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                 <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-heading font-extrabold text-text-primary mb-4">Application Received! 🎉</h2>
              <p className="text-text-muted mb-8 font-medium">Thanks for applying. Your application ID is <span className="text-brand-blue font-bold">#APP-{applicationId}</span></p>
              <div className="p-6 bg-bg-secondary rounded-2xl text-left mb-8 space-y-4">
                 <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">What is next?</p>
                 <ul className="space-y-2 text-xs font-medium text-text-muted">
                    <li>• Our internal hiring team will review your profile.</li>
                    <li>• We aim to respond within 5 business days.</li>
                    <li>• Keep an eye on your inbox for interview invites.</li>
                 </ul>
              </div>
              <Link
                href="/careers"
                className="block w-full py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-widest text-sm"
              >
                View More Positions
              </Link>
           </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero 
        title={`Apply for ${job?.title || 'this role'}`} 
        subtitle="Take the next step in your engineering career. We hire people, not just degrees."
      />

      <section className="py-20 px-6 max-w-4xl mx-auto relative z-10">
         <Link href={`/careers/${id}`} className="inline-flex items-center gap-2 text-text-muted hover:text-brand-blue transition-all text-xs font-bold uppercase tracking-widest mb-10 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Job Details
         </Link>

         <div className="glass-card p-10 border-brand-blue/10">
            <form onSubmit={handleSubmit} className="space-y-12">
               {/* Personal Info */}
               <div className="space-y-8">
                  <h3 className="text-xl font-heading font-extrabold pb-3 border-b border-border-primary">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">First Name *</label>
                        <input name="firstName" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Last Name *</label>
                        <input name="lastName" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Email Address *</label>
                        <input name="email" type="email" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Phone Number *</label>
                        <input name="phone" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Current Location *</label>
                        <input name="location" required placeholder="City, Country" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                  </div>
               </div>

               {/* Links */}
               <div className="space-y-8">
                  <h3 className="text-xl font-heading font-extrabold pb-3 border-b border-border-primary">Online Presence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Portfolio URL</label>
                        <input name="portfolioUrl" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">GitHub Profile</label>
                        <input name="githubUrl" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">LinkedIn Profile</label>
                        <input name="linkedinUrl" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                  </div>
               </div>

               {/* Experience */}
               <div className="space-y-8">
                  <h3 className="text-xl font-heading font-extrabold pb-3 border-b border-border-primary">Experience & Fit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Years of Experience *</label>
                        <select name="experience" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all appearance-none">
                           <option value="0-1">0-1 Year</option>
                           <option value="1-2">1-2 Years</option>
                           <option value="2-5">2-5 Years</option>
                           <option value="5-10">5-10 Years</option>
                           <option value="10+">10+ Years</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Availability *</label>
                        <select name="availability" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all appearance-none">
                           <option value="Immediately">Immediately</option>
                           <option value="2 weeks">2 Weeks</option>
                           <option value="1 month">1 Month</option>
                           <option value="3 months">3 Months</option>
                        </select>
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Key Skills * (Comma separated)</label>
                        <input name="skills" required placeholder="React, Node.js, AWS..." className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Expected Salary (Optional)</label>
                        <input name="salary" placeholder="e.g. $4000/mo" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                     </div>
                  </div>
               </div>

               {/* Cover Letter */}
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Cover Letter * (Min 100 characters)</label>
                  <textarea name="coverLetter" required minLength="100" rows="8" placeholder="Tell us why you are the perfect fit for ScalexDevs..." className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all ring-offset-bg-primary" />
               </div>

               {/* Agreement */}
               <div className="flex items-start gap-3 px-1">
                  <input type="checkbox" required className="mt-1 accent-brand-blue w-4 h-4" />
                  <label className="text-xs text-text-muted leading-tight">I agree to ScalexDevs processing my personal data according to the <Link href="/privacy-policy" className="text-brand-blue underline">Privacy Policy</Link>.</label>
               </div>

               <button 
                 type="submit" 
                 disabled={status === 'loading'}
                 className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-brand-blue/25 hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
               >
                 {status === 'loading' ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <>Submit Application <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                 )}
               </button>
            </form>
         </div>
      </section>

      <Footer />
    </main>
  );
}
