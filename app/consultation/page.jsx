'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { Mail, Phone, MapPin, CheckCircle2, Calendar, Shield, Zap } from 'lucide-react';

export default function ConsultationPage() {
  const [status, setStatus] = useState('idle');
  const [bookingId, setBookingId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        setBookingId(result.bookingId.toString().padStart(4, '0'));
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
              <h2 className="text-4xl font-heading font-extrabold text-text-primary mb-4">Booking Confirmed! 🎉</h2>
              <p className="text-text-muted mb-8 font-medium">Your strategy session is scheduled. Reference ID: <span className="text-brand-blue font-bold">#SCX-{bookingId}</span></p>
              <div className="p-6 bg-bg-secondary rounded-2xl text-left mb-8 space-y-4">
                 <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">What happens next?</p>
                 <ul className="space-y-2 text-xs font-medium text-text-muted">
                    <li>• You will receive a calendar invite within 2 hours.</li>
                    <li>• Our expert will review your company beforehand.</li>
                    <li>• Prepare any technical requirements or mockups.</li>
                 </ul>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-widest text-sm"
              >
                Book Another Call
              </button>
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
        title="Book a Free Consultation" 
        subtitle="30-minute strategy call with our elite engineering team. Zero obligation, total focus on your scale."
      />

      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-12">
           <div>
              <h3 className="text-2xl font-heading font-extrabold mb-6">What to Expect</h3>
              <div className="space-y-6">
                 {[
                   { icon: Shield, title: 'Technical Review', text: 'We review your architecture and suggest optimizations.' },
                   { icon: Zap, title: 'MVP Strategy', text: 'We help you define the core features needed to ship fast.' },
                   { icon: Calendar, title: 'Transparent Quote', text: 'Receive a detailed project breakdown within 24 hours.' }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-bg-secondary transition-colors group">
                      <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all">
                         <item.icon size={20} />
                      </div>
                      <div>
                         <h5 className="font-bold text-text-primary mb-1">{item.title}</h5>
                         <p className="text-xs text-text-muted font-medium">{item.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-8 border-brand-purple/10">
              <p className="italic text-text-muted text-sm leading-relaxed mb-6">
                &quot;The ScalexDevs team helped us architect our SaaS from 0 to 100k users. Their consultation was a turning point for our engineering strategy.&quot;
              </p>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-bg-secondary rounded-full border border-border-primary" />
                 <div>
                    <p className="text-xs font-bold">James Thompson</p>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">CTO, CloudScale</p>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">Direct Connect</p>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 text-sm font-bold"><Mail size={16} className="text-brand-blue" /> consultations@scalexdevs.com</div>
                 <div className="flex items-center gap-3 text-sm font-bold"><Phone size={16} className="text-brand-purple" /> +1 (555) SCALEX-CALL</div>
              </div>
           </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
           <div className="glass-card p-10 border-brand-blue/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Full Name *</label>
                       <input name="name" required placeholder="John Doe" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Email Address *</label>
                       <input name="email" type="email" required placeholder="john@company.com" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Phone Number</label>
                       <input name="phone" placeholder="+1 (555) 000-0000" className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Company Name</label>
                       <input name="company" placeholder="Acme Inc." className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Consultation Topic *</label>
                    <select name="topic" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all appearance-none">
                       <option value="">Select a topic</option>
                       <option value="Web Development">Web Development</option>
                       <option value="Mobile App">Mobile App</option>
                       <option value="AI Integration">AI Integration</option>
                       <option value="SaaS Product">SaaS Product</option>
                       <option value="DevOps & Cloud">DevOps & Cloud</option>
                       <option value="General Inquiry">General Inquiry</option>
                    </select>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Preferred Date *</label>
                       <input name="preferredDate" type="date" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Preferred Time *</label>
                       <select name="preferredTime" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all appearance-none">
                          {Array.from({ length: 10 }).map((_, i) => (
                             <option key={i} value={`${9 + i}:00`}>{9 + i}:00 AM/PM</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Timezone *</label>
                    <select name="timezone" required className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all appearance-none">
                       <option value="UTC-5 (EST)">UTC-5 (EST)</option>
                       <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                       <option value="UTC+5:30 (IST)">UTC+5:30 (IST)</option>
                       <option value="UTC+8 (PHT/CN)">UTC+8 (PHT/CN)</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Additional Notes</label>
                    <textarea name="notes" rows="4" placeholder="Tell us a bit about your project..." className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-brand-blue transition-all" />
                 </div>

                 <button 
                   type="submit" 
                   disabled={status === 'loading'}
                   className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-brand-blue/25 hover:bg-brand-blue/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                 >
                   {status === 'loading' ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <>Book My Consultation <Calendar size={18} /></>
                   )}
                 </button>
              </form>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
