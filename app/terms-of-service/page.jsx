'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <PageHero title="Terms of Service" subtitle="Last updated: October 2023" />
      <section className="py-24 px-6 max-w-4xl mx-auto prose prose-invert prose-brand font-medium text-text-muted/80 leading-relaxed">
         <h2>1. Acceptance of the Terms of Service</h2>
         <p>These terms of service are entered into by and between You and ScalexDevs. The following terms and conditions govern your access to and use of scalexdevs.com, including any content, functionality, and services offered on or through the website.</p>
         
         <h2>2. Changes to the Terms of Service</h2>
         <p>We may revise and update these Terms of Service from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Website thereafter.</p>
         
         <h2>3. Accessing the Website and Account Security</h2>
         <p>We reserve the right to withdraw or amend this Website, and any service or material we provide on the Website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website is unavailable at any time or for any period.</p>
         
         <h2>4. Intellectual Property Rights</h2>
         <p>The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by ScalexDevs, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
         
         <h2>5. Governing Law and Jurisdiction</h2>
         <p>All matters relating to the Website and these Terms of Service, and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of the State of Delaware without giving effect to any choice or conflict of law provision or rule.</p>
      </section>
      <Footer />
    </main>
  );
}
