'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Briefcase, MapPin, Clock, ArrowLeft, Share2, CheckCircle, Mail, Send, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch('/api/careers/jobs');
        const jobs = await res.json();
        const found = jobs.find(j => j.id === id);
        setJob(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-bg-primary flex items-center justify-center"><div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>;
  if (!job) return <div className="p-20 text-center">Job not found. <Link href="/careers" className="text-brand-blue font-bold">Back to listings</Link></div>;

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      
      {/* Job Header */}
      <section className="pt-40 pb-20 px-6 border-b border-border-primary grain-overlay overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
           <Link href="/careers" className="inline-flex items-center gap-2 text-text-muted hover:text-brand-blue transition-all text-xs font-bold uppercase tracking-widest mb-10 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Careers
           </Link>
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest rounded-full border border-brand-blue/20">{job.department}</span>
                    <span className="px-3 py-1 bg-bg-secondary text-text-muted text-xs font-bold uppercase tracking-widest rounded-full border border-border-primary">{job.type}</span>
                    {job.urgent && <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Urgent</span>}
                 </div>
                 <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-text-primary">{job.title}</h1>
                 <div className="flex flex-wrap gap-6 text-sm font-medium text-text-muted">
                    <span className="flex items-center gap-2"><MapPin size={18} className="text-brand-blue" /> {job.location}</span>
                    <span className="flex items-center gap-2"><Briefcase size={18} className="text-brand-purple" /> {job.salary}</span>
                    <span className="flex items-center gap-2"><Clock size={18} /> Posted {job.posted}</span>
                 </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                 <Link 
                   href={`/careers/${id}/apply`}
                   className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold text-center shadow-xl shadow-brand-blue/25 hover:scale-105 active:scale-95 transition-all"
                 >
                   Apply Now
                 </Link>
                 <button className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-brand-blue py-2">
                    <Share2 size={16} /> Share Job
                 </button>
              </div>
           </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Main Content */}
         <div className="lg:col-span-8 space-y-12">
            <div>
               <h3 className="text-2xl font-heading font-extrabold mb-8 pb-4 border-b border-border-primary">About the Role</h3>
               <div className="text-text-muted text-lg font-medium leading-relaxed space-y-6">
                 <p>As a {job.title} at ScalexDevs, you will be at the forefront of digital innovation. We are looking for an engineer who doesn&apos;t just write code, but builds architectures that can withstand global scale.</p>
                 <p>You will join a remote-first team of elite engineers, designers, and strategists. Our culture is built on transparency, extreme ownership, and a relentless pursuit of engineering excellence.</p>
               </div>
            </div>

            <div>
               <h3 className="text-2xl font-heading font-extrabold mb-8 pb-4 border-b border-border-primary">What You&apos;ll Do</h3>
               <ul className="grid grid-cols-1 gap-4">
                  {[
                    "Architect and implement high-performance, scalable systems using modern stacks.",
                    "Collaborate with international clients to translate business needs into technical reality.",
                    "Write clean, documented, and highly-performant code following industry best practices.",
                    "Review code and mentor junior developers to maintain our standard of quality.",
                    "Optimizing applications for maximum speed and scalability.",
                    "Design and implement secure database schemas and server-side logic."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-text-muted font-medium">
                       <CheckCircle size={20} className="text-brand-blue shrink-0 mt-1" />
                       <span>{item}</span>
                    </li>
                  ))}
               </ul>
            </div>

            <div>
               <h3 className="text-2xl font-heading font-extrabold mb-8 pb-4 border-b border-border-primary">Requirements</h3>
               <div className="space-y-8">
                  <div>
                    <h5 className="font-bold text-text-primary mb-4 uppercase tracking-widest text-xs">Must Have:</h5>
                    <ul className="grid grid-cols-1 gap-3">
                       {job.tags.map((tag, i) => (
                         <li key={i} className="flex gap-3 text-sm text-text-muted font-bold">
                            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2" /> 5+ years experience in {tag} ecosystem.
                         </li>
                       ))}
                       <li className="flex gap-3 text-sm text-text-muted font-bold">
                          <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2" /> Strong understanding of system design and cloud infrastructure.
                       </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-text-primary mb-4 uppercase tracking-widest text-xs">Nice to Have:</h5>
                    <ul className="grid grid-cols-1 gap-3">
                       <li className="flex gap-3 text-sm text-text-muted font-medium">
                          <span className="w-1.5 h-1.5 bg-brand-purple/50 rounded-full mt-2" /> Experience with AI/ML integrations (OpenAI SDKs, LangChain).
                       </li>
                       <li className="flex gap-3 text-sm text-text-muted font-medium">
                          <span className="w-1.5 h-1.5 bg-brand-purple/50 rounded-full mt-2" /> Open source contributions or technical blogging.
                       </li>
                    </ul>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <aside className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 border-brand-blue/10 sticky top-32">
               <h4 className="font-bold text-lg mb-6">Quick Apply</h4>
               <form className="space-y-4">
                  <input placeholder="Email Address" className="w-full bg-bg-secondary border border-border-primary p-4 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                  <button type="button" className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20">
                    Get Full Application <ArrowRight size={14} />
                  </button>
               </form>
               <p className="text-[10px] text-text-muted mt-4 text-center font-bold uppercase tracking-widest">Takes less than 2 minutes</p>
               
               <div className="border-t border-border-primary mt-8 pt-8 space-y-6">
                  <div>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3 px-1">Share this role</p>
                     <div className="flex gap-2">
                        <button className="flex-grow py-3 border border-border-primary rounded-xl flex items-center justify-center hover:bg-brand-blue/5 transition-colors">
                           <Linkedin size={18} className="text-text-muted" />
                        </button>
                        <button className="flex-grow py-3 border border-border-primary rounded-xl flex items-center justify-center hover:bg-brand-blue/5 transition-colors">
                           <Twitter size={18} className="text-text-muted" />
                        </button>
                        <button className="flex-grow py-3 border border-border-primary rounded-xl flex items-center justify-center hover:bg-brand-blue/5 transition-colors">
                           <Mail size={18} className="text-text-muted" />
                        </button>
                     </div>
                  </div>
                  <div className="p-6 bg-brand-purple/5 border border-brand-purple/10 rounded-2xl">
                     <p className="text-xs font-bold text-brand-purple mb-2">Referral Program</p>
                     <p className="text-[10px] text-brand-purple/70 leading-relaxed font-bold">Know someone perfect for this? Refer them and get <span className="text-brand-purple font-black">$500</span> if they are hired.</p>
                  </div>
               </div>
            </div>
         </aside>
      </section>

      <Footer />
    </main>
  );
}
