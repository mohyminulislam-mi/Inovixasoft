'use client';

import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Admin', href: '/admin/dashboard' },
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Mobile Apps', href: '/services/mobile-apps' },
      { name: 'AI Solutions', href: '/services/ai-solutions' },
      { name: 'SaaS Architecture', href: '/services/saas-architecture' },
    ],
    resources: [
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Blog', href: '/blog' },
      { name: 'Tech Stack', href: '/technologies' },
      { name: 'FAQ', href: '/faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Sitemap', href: '/sitemap' },
    ]
  };

  return (
    <footer className="relative bg-bg-secondary pt-24 pb-12 overflow-hidden border-t border-border-primary">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-purple rounded-lg flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                <Zap size={24} className="fill-white" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tighter text-text-primary">
                Scalex<span className="text-brand-blue">Devs</span>
              </span>
            </Link>
            <p className="text-text-muted leading-relaxed max-w-sm text-sm font-medium">
              ScalexDevs is an elite software agency focused on building high-performance, scalable digital products for global impact. From seed startups to enterprise giants.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 border border-border-primary rounded-xl flex items-center justify-center text-text-muted hover:text-brand-blue hover:bg-brand-blue/5 transition-all">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-border-primary rounded-xl flex items-center justify-center text-text-muted hover:text-brand-blue hover:bg-brand-blue/5 transition-all">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-border-primary rounded-xl flex items-center justify-center text-text-muted hover:text-brand-blue hover:bg-brand-blue/5 transition-all">
                <Github size={18} />
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
             <div>
                <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-text-primary">Company</h5>
                <ul className="space-y-4">
                  {links.company.map(link => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-text-muted hover:text-brand-blue transition-colors font-medium">{link.name}</Link>
                    </li>
                  ))}
                </ul>
             </div>
             <div>
                <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-text-primary">Services</h5>
                <ul className="space-y-4">
                  {links.services.map(link => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-text-muted hover:text-brand-blue transition-colors font-medium">{link.name}</Link>
                    </li>
                  ))}
                </ul>
             </div>
             <div>
                <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-text-primary">Resources</h5>
                <ul className="space-y-4">
                  {links.resources.map(link => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-text-muted hover:text-brand-blue transition-colors font-medium">{link.name}</Link>
                    </li>
                  ))}
                </ul>
             </div>
             <div>
                <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-text-primary">Legal</h5>
                <ul className="space-y-4">
                  {links.legal.map(link => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-text-muted hover:text-brand-blue transition-colors font-medium">{link.name}</Link>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>

        {/* Newsletter Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 border-y border-border-primary mb-12">
           <div className="flex flex-col justify-center">
              <h4 className="text-2xl font-heading font-extrabold mb-2 text-text-primary">Ready to Scale Your Business?</h4>
              <p className="text-text-muted text-sm font-medium">Subscribe to our newsletter for exclusive insights on AI and high-scale architecture.</p>
           </div>
           <NewsletterForm />
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-b border-border-primary/50 mb-12">
           <div className="flex items-center gap-6 text-xs font-bold text-text-muted uppercase tracking-widest">
              <span className="flex items-center gap-2"><Mail size={14} className="text-brand-blue" /> hello@scalexdevs.com</span>
              <span className="flex items-center gap-2"><Phone size={14} className="text-brand-purple" /> +1-555-SCALEX</span>
              <span className="flex items-center gap-2 hidden md:flex"><MapPin size={14} className="text-brand-blue" /> Remote Worldwide</span>
           </div>
           <Link href="/consultation" className="text-xs font-bold text-brand-blue flex items-center gap-2 hover:translate-x-1 transition-transform uppercase tracking-widest">
              Start a project now <ArrowRight size={14} />
           </Link>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold text-text-muted tracking-[0.3em]">
           <p>© {currentYear} ScalexDevs. All Rights Reserved.</p>
           <p className="mt-4 md:mt-0">Engineered with Passion for the Future</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
