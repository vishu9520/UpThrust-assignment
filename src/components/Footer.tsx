import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useCMS } from '../context/CMSContext';
import { useGTM } from '../context/GTMContext';

export const Footer: React.FC = () => {
  const { content, addSubmission } = useCMS();
  const { pushEvent } = useGTM();
  const { footer } = content;

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!consent) {
      setStatus('error');
      setErrorMessage('Please check the consent box to subscribe.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      // 1. Mandatory GTM event push
      pushEvent('form_submit', {
        form_id: 'newsletter_footer',
        form_name: 'Email Newsletter Signup',
        email: email.trim(),
        consent_granted: true,
        page_location: window.location.href
      });

      // 2. Persist to CMS demonstrable storage
      addSubmission('newsletter', {
        email: email.trim(),
        consent: true,
        source: 'footer_newsletter'
      });

      setStatus('success');
      setEmail('');
      setConsent(false);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.85 }
        });
      } catch {
        // Safe fallback
      }
    }, 500);
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-white pt-14 pb-12 overflow-hidden border-t border-neutral-900 select-none"
      aria-label="Footer and Newsletter"
    >
      <div className="w-full px-6 sm:px-10 md:px-14">
        
        {/* Massive UPTHRUST . DESIGN Title matching Image 2 */}
        <div className="w-full border-b border-neutral-700/80 pb-4 mb-8">
          <div className="w-full flex items-center justify-between text-[14vw] font-footer-display tracking-tight leading-none select-none text-white">
            <span>UPTHRUST</span>
            
            {/* 3-Petal Orange Logo Mark matching Image 2 */}
            <div className="inline-flex items-center justify-center mx-1 sm:mx-3 transform translate-y-[1vw]">
              <svg className="w-[5.5vw] h-[5.5vw] text-[#FF4500]" viewBox="0 0 100 100" fill="none">
                {/* 3 overlapping petals */}
                <circle cx="50" cy="38" r="26" fill="#FF4500" fillOpacity="0.88" />
                <circle cx="36" cy="62" r="26" fill="#FF5722" fillOpacity="0.85" />
                <circle cx="64" cy="62" r="26" fill="#FF3D00" fillOpacity="0.85" />
                {/* Lower vertical stem petal */}
                <path d="M50 68 L50 90" stroke="#FF4500" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
            
            <span>DESIGN</span>
          </div>
        </div>

        {/* 2-Column Grid with vertical divider matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 pt-2">
          
          {/* Left Side: Agency Links & Contacts (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-12 pr-0 lg:pr-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Column 1: upthrust.agency */}
              <div className="space-y-3">
                <a
                  href="https://upthrust.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white hover:text-orange-500 underline underline-offset-2 transition-colors font-sans"
                >
                  upthrust.agency <span className="text-xs">↗</span>
                </a>
                <p className="text-xs text-neutral-400 font-sans">
                  {footer.agencyDescription}
                </p>
                <p>
                  <a
                    href="mailto:hello@upthrust.agency"
                    className="text-xs text-neutral-400 hover:text-white transition-colors font-sans"
                  >
                    hello@upthrust.agency
                  </a>
                </p>
              </div>

              {/* Column 2: upthrust.io */}
              <div className="space-y-3">
                <a
                  href="https://upthrust.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white hover:text-orange-500 underline underline-offset-2 transition-colors font-sans"
                >
                  upthrust.io <span className="text-xs">↗</span>
                </a>
                <p className="text-xs text-neutral-400 font-sans">
                  {footer.ioDescription}
                </p>
                <p>
                  <a
                    href="mailto:hello@upthrust.io"
                    className="text-xs text-neutral-400 hover:text-white transition-colors font-sans"
                  >
                    hello@upthrust.io
                  </a>
                </p>
              </div>
            </div>

            {/* Bottom note matching Image 2 */}
            <div className="pt-8">
              <p className="text-xs text-neutral-400 font-sans">
                {footer.bottomNote}
              </p>
            </div>
          </div>

          {/* Right Side: Newsletter Signup Form matching Image 2 (6 cols with vertical divider) */}
          <div className="lg:col-span-6 lg:border-l border-neutral-700/80 lg:pl-12 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-4 font-sans">
                {footer.newsletterTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="newsletter-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded-none border-neutral-500 bg-transparent text-white focus:ring-0 cursor-pointer"
                    required
                  />
                  <label
                    htmlFor="newsletter-consent"
                    className="text-[11px] text-neutral-400 leading-tight cursor-pointer select-none font-sans"
                  >
                    {footer.newsletterConsent}
                  </label>
                </div>

                {/* Email Input */}
                <div className="pt-2">
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="typehere@youremail.com"
                    autoComplete="email"
                    inputMode="email"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b border-neutral-700 focus:border-white py-2 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors font-sans"
                    aria-label="Email address for newsletter"
                  />
                </div>

                {/* Error status */}
                {status === 'error' && (
                  <p className="text-xs text-red-500 font-medium" role="alert">
                    {errorMessage}
                  </p>
                )}

                {/* Success status */}
                {status === 'success' && (
                  <div
                    className="p-2.5 bg-emerald-950/80 border border-emerald-600/40 rounded text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in"
                    role="status"
                  >
                    <span>✓</span>
                    <span>Subscribed! Event <code>form_submit</code> sent to GTM.</span>
                  </div>
                )}

                {/* Submit text button matching Image 2 */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="text-xs font-semibold text-white hover:text-orange-400 focus:outline-none transition-colors"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

            {/* Links and Socials matching Image 2 */}
            <div className="space-y-4 pt-6 text-xs text-neutral-400 font-sans">
              <div className="flex items-center gap-6">
                <a
                  href="https://upthrust.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  upthrust.agency ↗
                </a>
                <a
                  href="https://upthrust.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  upthrust.io ↗
                </a>
              </div>

              <div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <span> , </span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2">
                <a href="#privacy" className="hover:text-neutral-300 transition-colors">
                  Privacy Policy
                </a>
                <span>© Upthrust Design</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};
