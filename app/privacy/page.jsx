'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <PageHero title="Privacy Policy" subtitle="Your data privacy is our top priority." />
      <div className="max-w-4xl mx-auto px-6 py-20 text-white/60 leading-relaxed space-y-8">
        <p>This Privacy Policy describes how Inovixasoft (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares your personal information when you visit or make a purchase from our website.</p>
        <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
        <p>We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>
        <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account and our products.</p>
      </div>
      <Footer />
    </main>
  );
}
