'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ArrowRight, Zap } from 'lucide-react';
import { services } from '@/lib/data';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300",
        scrolled ? "nav-glass py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-purple rounded-lg flex items-center justify-center text-white shadow-xl shadow-brand-blue/20 group-hover:rotate-12 transition-transform duration-300">
            <Zap size={24} className="fill-white" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tighter text-text-primary">
            Scalex<span className="text-brand-blue font-extrabold">Devs</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.slice(0, 1).map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-sm font-bold uppercase tracking-widest hover:text-brand-blue transition-colors relative group",
                pathname === link.href ? "text-brand-blue" : "text-text-muted"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          
          {/* Services with Hover */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link 
               href="/services"
               className={cn(
                "flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-brand-blue transition-colors",
                pathname.startsWith('/services') ? "text-brand-blue" : "text-text-muted"
              )}
            >
              Services <ChevronDown size={14} className={cn("transition-transform", servicesOpen && "rotate-180")} />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] z-50"
                >
                  <div className="glass-card shadow-2xl p-6 grid grid-cols-2 gap-4 border-brand-blue/10">
                    {services.map((service) => (
                      <Link 
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-brand-blue/5 transition-colors group/item"
                      >
                        <div className="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center shrink-0 border border-border-primary shadow-sm group-hover/item:border-brand-blue/30 transition-colors">
                          <service.icon size={18} className="text-brand-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary group-hover/item:text-brand-blue transition-colors">{service.name}</p>
                          <p className="text-[10px] text-text-muted line-clamp-1 mt-0.5">{service.description}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 border-t border-border-primary mt-2 pt-4 flex justify-between items-center px-2">
                       <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Crafted for high scale delivery</p>
                       <Link href="/services" className="text-xs font-bold text-brand-blue flex items-center gap-1 hover:underline">
                         All Solutions <ArrowRight size={12} />
                       </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-sm font-bold uppercase tracking-widest hover:text-brand-blue transition-colors relative group",
                pathname === link.href ? "text-brand-blue" : "text-text-muted"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 lg:gap-6">
          <ThemeToggle />
          
          <Link 
            href="/consultation" 
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-blue/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-blue/20"
          >
            Get Quote
          </Link>
          
          <button 
            className="xl:hidden p-2 text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 top-[70px] bg-bg-primary xl:hidden z-50 overflow-y-auto"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                   key={link.name}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    className={cn(
                      "text-3xl font-heading font-extrabold py-2 block",
                      pathname === link.href ? "text-brand-blue" : "text-text-primary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-8 border-t border-border-primary mt-4">
                <p className="text-xs font-bold uppercase text-text-muted tracking-[0.3em] mb-8 text-center shrink-0">Connect With Us</p>
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/consultation"
                    className="w-full bg-brand-blue text-white py-5 rounded-2xl text-center font-bold text-lg shadow-xl shadow-brand-blue/20"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a Consultation
                  </Link>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 text-center">
                       <p className="text-[10px] uppercase font-bold text-text-muted mb-1">Email</p>
                       <p className="text-sm font-bold">hello@scalexdevs.com</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                       <p className="text-[10px] uppercase font-bold text-text-muted mb-1">WhatsApp</p>
                       <p className="text-sm font-bold">+1-555-SD-DEV</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
