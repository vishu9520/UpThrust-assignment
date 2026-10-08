import React, { useState } from 'react';
import { GTMProvider } from './context/GTMContext';
import { CMSProvider } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { CMSAdminModal } from './components/CMSAdminModal';
import { GTMDebugger } from './components/GTMDebugger';
import { CMSFloatingBadge } from './components/CMSFloatingBadge';

export const AppContent: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactService, setContactService] = useState<string | undefined>(undefined);

  const handleOpenContact = (serviceName?: string) => {
    setContactService(serviceName);
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Primary Navigation */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      {/* Main Landmark */}
      <main className="flex-1">
        {/* Hero Section matching Image 3 */}
        <Hero />

        {/* Services & Capabilities matching Image 1 */}
        <Services onOpenContact={handleOpenContact} />

        {/* Proven Results / Testimonials */}
        <Testimonials />

        {/* Accessible FAQ Accordion */}
        <FAQ />
      </main>

      {/* Site Footer & Newsletter matching Image 2 */}
      <Footer />

      {/* Interactive Contact Lead Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        initialService={contactService}
      />

      {/* CMS Live Admin Modal */}
      <CMSAdminModal />

      {/* Real-time Google Tag Manager dataLayer Inspector */}
      <GTMDebugger />

      {/* Quick Launch CMS Admin Badge */}
      <CMSFloatingBadge />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GTMProvider>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </GTMProvider>
  );
};

export default App;
