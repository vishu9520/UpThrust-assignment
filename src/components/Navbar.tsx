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
      <header className="absolute top-0 left-0 right-0 z-40 w-full bg-transparent">
        <div className="w-full px-6 md:px-12 h-24 flex items-center justify-between">
          {/* Logo matching Image 1 */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF3500] rounded-lg p-1"
            aria-label="Upthrust home"
          >
            {/* Rocket Icon with orange flame matching Image 1 */}
            <svg
              className="w-7 h-7 text-black transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rocket body */}
              <path
                d="M13.5 2.5C13.5 2.5 17 4 19 8C20 10 20.5 12 20.5 12C20.5 12 18.5 12.5 16.5 13.5C14.5 14.5 14 16.5 14 16.5C14 16.5 12 16 10 15C6 13 4.5 9.5 4.5 9.5C4.5 9.5 7.5 8.5 9.5 6.5C11.5 4.5 13.5 2.5 13.5 2.5Z"
                fill="currentColor"
              />
              {/* Wings */}
              <path d="M4.5 9.5L2 12L6 14L8 12.5" fill="currentColor" />
              <path d="M14 16.5L12.5 18L14.5 22L17 19.5" fill="currentColor" />
              {/* Flame in orange */}
              <circle cx="5" cy="18" r="2.5" fill="#FF3500" />
            </svg>
            <span className="font-extrabold text-2xl tracking-tight text-neutral-950 font-sans">
              Upthrust
            </span>
          </a>

          {/* Three-Bar Orange Hamburger Menu Trigger matching Image 1 exactly */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center gap-1.5 w-12 h-12 rounded-lg hover:bg-orange-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3500]"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <span
              className={`block w-8 h-[4px] bg-[#FF3500] rounded-sm transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-2.5' : ''
              }`}
            />
            <span
              className={`block w-8 h-[4px] bg-[#FF3500] rounded-sm transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-8 h-[4px] bg-[#FF3500] rounded-sm transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Navigation Overlay / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 animate-in fade-in duration-200"
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
              className="text-white hover:text-orange-500 p-2 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#FF3500] rounded"
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
              03. Case Studies & Proof
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
              05. Contact & Newsletter
            </a>
          </nav>

          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenContact();
                }}
                className="px-8 py-3.5 rounded-full bg-[#FF3500] hover:bg-orange-500 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-600/30"
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
            <div className="text-neutral-400 text-xs font-mono">
              hello@upthrust.agency • upthrust.design
            </div>
          </div>
        </div>
      )}
    </>
  );
};
