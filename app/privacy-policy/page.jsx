'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero title="Privacy Policy" subtitle="Last updated: October 2023" />
      <section className="py-24 px-6 max-w-4xl mx-auto prose prose-invert prose-brand font-medium text-text-muted/80 leading-relaxed">
         <h2>1. Introduction</h2>
         <p>At ScalexDevs, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website scalexdevs.com.</p>
         
         <h2>2. Information We Collect</h2>
         <p>We collect several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline.</p>
         
         <h2>3. How We Use Your Information</h2>
         <p>We use information that we collect about you or that you provide to us, including any personal information: To present our Website and its contents to you; To provide you with information, products, or services that you request from us; To fulfill any other purpose for which you provide it.</p>
         
         <h2>4. Data Security</h2>
         <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.</p>
         
         <h2>5. Changes to Our Privacy Policy</h2>
         <p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users&apos; personal information, we will notify you through a notice on the Website home page.</p>
      </section>
      <Footer />
    </main>
  );
}
