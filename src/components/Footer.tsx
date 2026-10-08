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
      setErrorMessage('Please provide a valid business email address.');
      return;
    }

    if (!consent) {
      setStatus('error');
      setErrorMessage('Please check the consent box to subscribe.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      // 1. Push form_submit event to GTM dataLayer (Mandatory Assignment Requirement)
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

      // 3. Visual Confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.85 }
        });
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-white pt-16 md:pt-24 pb-12 overflow-hidden border-t border-neutral-900 select-none"
      aria-label="Site Footer and Newsletter"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Massive UPTHRUST . DESIGN Title matching Image 2 */}
        <div className="w-full border-b border-neutral-800 pb-10 md:pb-16 flex items-center justify-between flex-wrap gap-4">
          <div className="w-full flex items-center justify-between text-[11.8vw] font-black uppercase tracking-tighter leading-none select-none text-white">
            <span>UPTHRUST</span>
            {/* 3-Petal Orange Logo Mark matching Image 2 */}
            <div className="inline-flex items-center justify-center mx-2 sm:mx-4 transform scale-90 sm:scale-100">
              <svg className="w-[6vw] h-[6vw] text-[#FF4500]" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="35" r="28" fill="#FF4500" fillOpacity="0.9" />
                <circle cx="34" cy="62" r="28" fill="#FF5722" fillOpacity="0.85" />
                <circle cx="66" cy="62" r="28" fill="#FF3D00" fillOpacity="0.85" />
              </svg>
            </div>
            <span>DESIGN</span>
          </div>
        </div>

        {/* Footer Grid matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          
          {/* Left Columns: Agency Links & Contacts */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Agency Column */}
            <div className="space-y-4">
              <a
                href="https://upthrust.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base md:text-lg font-bold text-white hover:text-orange-500 underline underline-offset-4 transition-colors"
              >
                upthrust.agency <span className="text-sm">↗</span>
              </a>
              <p className="text-xs text-neutral-400 font-mono">
                {footer.agencyDescription}
              </p>
              <p>
                <a
                  href="mailto:hello@upthrust.agency"
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  hello@upthrust.agency
                </a>
              </p>
            </div>

            {/* .IO Column */}
            <div className="space-y-4">
              <a
                href="https://upthrust.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base md:text-lg font-bold text-white hover:text-orange-500 underline underline-offset-4 transition-colors"
              >
                upthrust.io <span className="text-sm">↗</span>
              </a>
              <p className="text-xs text-neutral-400 font-mono">
                {footer.ioDescription}
              </p>
              <p>
                <a
                  href="mailto:hello@upthrust.io"
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  hello@upthrust.io
                </a>
              </p>
            </div>

            {/* Bottom Note */}
            <div className="sm:col-span-2 pt-6">
              <p className="text-xs text-neutral-400 font-mono">
                {footer.bottomNote}
              </p>
            </div>
          </div>

          {/* Right Column: Newsletter Signup Form matching Image 2 */}
          <div className="lg:col-span-6 lg:border-l lg:border-neutral-900 lg:pl-12">
            <h3 className="text-base md:text-lg font-bold text-white mb-4">
              {footer.newsletterTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Checkbox consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-orange-600 focus:ring-orange-500 cursor-pointer"
                  required
                />
                <label
                  htmlFor="newsletter-consent"
                  className="text-xs text-neutral-400 leading-normal cursor-pointer select-none"
                >
                  {footer.newsletterConsent}
                </label>
              </div>

              {/* Email Input + Submit Button matching Image 2 */}
              <div className="space-y-3 pt-2">
                <div className="relative">
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="typehere@youremail.com"
                    autoComplete="email"
                    inputMode="email"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b border-neutral-700 focus:border-orange-500 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    aria-label="Email address for newsletter"
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p className="text-xs text-red-500 font-medium" role="alert">
                    {errorMessage}
                  </p>
                )}

                {/* Success State */}
                {status === 'success' && (
                  <div
                    className="p-3 bg-emerald-950/80 border border-emerald-600/40 rounded-lg text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in"
                    role="status"
                  >
                    <span>✓</span>
                    <span>
                      Success! You're subscribed. Event <code>form_submit</code> pushed to GTM dataLayer.
                    </span>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-2.5 rounded-full bg-white hover:bg-orange-500 text-black hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>

            {/* Bottom Secondary Links & Socials matching Image 2 */}
            <div className="pt-10 mt-10 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-6">
                <a
                  href="https://upthrust.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  upthrust.agency ↗
                </a>
                <a
                  href="https://upthrust.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  upthrust.io ↗
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <span>,</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a href="#privacy" className="hover:text-white transition-colors">
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
