import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useCMS } from '../context/CMSContext';
import { useGTM } from '../context/GTMContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Brand & visual identity'
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { addSubmission } = useCMS();
  const { pushEvent } = useGTM();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(initialService);
  const [budget, setBudget] = useState('$25k – $50k');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid work email.');
      return;
    }

    if (!company.trim()) {
      setStatus('error');
      setErrorMessage('Please specify your company or brand name.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      const payload = {
        form_id: 'lead_inquiry_modal',
        form_name: 'Client Project Request',
        full_name: fullName.trim(),
        work_email: email.trim(),
        company: company.trim(),
        service_selected: service,
        budget_range: budget,
        message: message.trim()
      };

      // 1. GTM dataLayer conversion event push
      pushEvent('form_submit', payload);

      // 2. Persist to CMS demonstrable storage
      addSubmission('contact_lead', payload);

      setStatus('success');

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // safe fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setStatus('idle');
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="p-0 rounded-2xl bg-neutral-950 text-white max-w-2xl w-[92vw] border border-neutral-800 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-md outline-none"
      aria-labelledby="contact-modal-title"
    >
      <div className="p-6 sm:p-8 md:p-10 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white text-xl p-2 rounded-lg hover:bg-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="text-center py-8 space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Project Brief Received
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{fullName}</strong>. Our partner team at Upthrust will review your brief for <span className="text-orange-400">{company}</span> within 24 business hours.
            </p>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left text-xs font-mono text-neutral-400 space-y-1">
              <div>Conversion Event: <span className="text-emerald-400">form_submit (GTM verified)</span></div>
              <div>Service: <span className="text-white">{service}</span></div>
              <div>Budget: <span className="text-white">{budget}</span></div>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-500">
                INITIATE ENGAGEMENT
              </span>
              <h3 id="contact-modal-title" className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                Let's Build Something Bold
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Fill in the details below. We'll assemble the right strategy team for your project.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    autoComplete="name"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-semibold text-neutral-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    autoComplete="email"
                    inputMode="email"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-company" className="block text-xs font-semibold text-neutral-300 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    id="modal-company"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acro Ventures"
                    autoComplete="organization"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-service" className="block text-xs font-semibold text-neutral-300 mb-1">
                    Service Scope
                  </label>
                  <select
                    id="modal-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="Strategy and Insight">Strategy and Insight</option>
                    <option value="Brand & visual identity">Brand & visual identity</option>
                    <option value="Product & digital experience">Product & digital experience</option>
                    <option value="Creative & campaign production">Creative & campaign production</option>
                    <option value="Full Omnichannel Transformation">Full Omnichannel Transformation</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="modal-budget" className="block text-xs font-semibold text-neutral-300 mb-1">
                  Estimated Investment
                </label>
                <select
                  id="modal-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="$15k – $25k">$15k – $25k</option>
                  <option value="$25k – $50k">$25k – $50k</option>
                  <option value="$50k – $100k">$50k – $100k</option>
                  <option value="$100k+">$100k+ Enterprise</option>
                </select>
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-xs font-semibold text-neutral-300 mb-1">
                  Project Details / Objectives (Optional)
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your brand challenge, timeline, and goals..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-500 font-medium" role="alert">
                  {errorMessage}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-7 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-600/30 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Submitting...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </dialog>
  );
};
