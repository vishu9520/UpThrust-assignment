import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsCMSModalOpen } = useCMS();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/60 transition-all">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
            aria-label="Upthrust home"
          >
            {/* Rocket Icon matching design */}
            <svg
              className="w-7 h-7 text-black transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.13 2.21a1 1 0 0 0-1.07.13L8.35 5.25a1 1 0 0 0-.29.56l-.5 3.32-3.23 3.23a1 1 0 0 0-.29.7v3.54a1 1 0 0 0 1.25.97l3.54-.88a1 1 0 0 0 .52-.3l3.23-3.23 3.32-.5a1 1 0 0 0 .56-.29l2.91-3.71a1 1 0 0 0 .13-1.07L16.5 4.5l-3.37-2.29zm-1.84 4.52l2.36 2.36-2.58 2.58-2.36-2.36 2.58-2.58z" />
              <path d="M5.5 18.5a2.5 2.5 0 0 1-2.5 2.5c0-1.38 1.12-2.5 2.5-2.5z" fill="#FF4500" />
            </svg>
            <span className="font-extrabold text-2xl tracking-tight text-neutral-900 font-sans">
              Upthrust
            </span>
          </a>

          {/* Desktop quick links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-700">
            <a href="#services" className="hover:text-orange-600 transition-colors">
              Services
            </a>
            <a href="#testimonials" className="hover:text-orange-600 transition-colors">
              Case Studies
            </a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">
              FAQ
            </a>
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 transition-all font-semibold text-xs tracking-wider uppercase"
            >
              Start Project
            </button>
          </nav>

          {/* Hamburger Menu Trigger matching Image 3 with three thick orange bars */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-lg hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <span
              className={`block w-7 h-1 bg-[#FF4500] rounded-full transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-2.5' : ''
              }`}
            />
            <span
              className={`block w-7 h-1 bg-[#FF4500] rounded-full transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-7 h-1 bg-[#FF4500] rounded-full transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Navigation Overlay / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-xl flex flex-col justify-between p-8 md:p-16 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white font-sans">
                Upthrust
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-500 p-2 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-3xl md:text-5xl font-black uppercase tracking-tight text-white my-auto">
            <a
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500 hover:translate-x-3 transition-all"
            >
              01. Home
            </a>
            <a
              href="#services"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500 hover:translate-x-3 transition-all"
            >
              02. Services
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500 hover:translate-x-3 transition-all"
            >
              03. Proof & Impact
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500 hover:translate-x-3 transition-all"
            >
              04. FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500 hover:translate-x-3 transition-all"
            >
              05. Newsletter
            </a>
          </nav>

          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenContact();
                }}
                className="px-8 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-600/30"
              >
                Start a Project
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsCMSModalOpen(true);
                }}
                className="px-5 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold tracking-wide uppercase transition-all"
              >
                🛠️ CMS Admin
              </button>
            </div>
            <div className="text-neutral-400 text-xs">
              hello@upthrust.agency • upthrust.design
            </div>
          </div>
        </div>
      )}
    </>
  );
};
