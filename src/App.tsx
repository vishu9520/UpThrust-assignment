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
import { ArrowLeft, Compass } from 'lucide-react';

const isKnownRoute = (pathname: string) => pathname === '/' || pathname === '';

const NotFoundPage: React.FC = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] px-6 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between">
        <a
          href="/"
          className="w-fit text-sm font-bold uppercase tracking-[0.25em] text-orange-400 transition-colors hover:text-white"
        >
          UPTHRUST.DESIGN
        </a>

        <section className="relative py-20" aria-labelledby="not-found-title">
          <div className="pointer-events-none absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-600/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.35em] text-orange-400">
              <Compass size={18} aria-hidden="true" />
              Navigation error / 404
            </p>
            <h1
              id="not-found-title"
              className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.78] tracking-[-0.08em]"
            >
              LOST<span className="text-orange-500">.</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-neutral-300">
              This route does not exist. Let&apos;s get you back to something that performs.
            </p>
            <button
              type="button"
              onClick={handleBack}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-[#050507]"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Go back
            </button>
          </div>
        </section>

        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          Error code: 404 / Page not found
        </p>
      </div>
    </main>
  );
};

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
  if (!isKnownRoute(window.location.pathname)) {
    return <NotFoundPage />;
  }

  return (
    <GTMProvider>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </GTMProvider>
  );
};

export default App;
