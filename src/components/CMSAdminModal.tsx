import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export const CMSAdminModal: React.FC = () => {
  const {
    content,
    updateHero,
    updateFAQ,
    addFAQ,
    deleteFAQ,
    updateTestimonial,
    resetToDefault,
    exportJSON,
    isCMSModalOpen,
    setIsCMSModalOpen,
    submissions,
    clearSubmissions
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'hero' | 'faqs' | 'testimonials' | 'submissions'>('faqs');
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  if (!isCMSModalOpen) return null;

  const showToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cms-modal-title"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-neutral-200">
        
        <div className="shrink-0 p-5 md:p-6 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-950">
          <div className="min-w-0 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="min-w-0">
              <h2 id="cms-modal-title" className="text-lg md:text-xl font-black uppercase text-white font-sans truncate">
                Upthrust CMS & Structured Content Hub
              </h2>
              <p className="text-xs text-neutral-400 truncate">
                Non-developer live management layer • Real-time reactive updates
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={exportJSON}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 transition-colors"
              title="Download content as JSON"
            >
              Export JSON ⤓
            </button>
            <button
              onClick={() => setIsCMSModalOpen(false)}
              className="text-neutral-400 hover:text-white text-lg p-2 rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close CMS"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="shrink-0 flex min-h-14 items-stretch border-b border-neutral-800 bg-neutral-950/60 px-3 sm:px-6 gap-1 sm:gap-2 text-xs font-bold uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab('faqs')}
            className={`shrink-0 whitespace-nowrap self-stretch py-3.5 px-3 sm:px-4 border-b-2 transition-colors ${
              activeTab === 'faqs'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            FAQs ({content.faqs.length})
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`shrink-0 whitespace-nowrap self-stretch py-3.5 px-3 sm:px-4 border-b-2 transition-colors ${
              activeTab === 'hero'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Hero & Headlines
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`shrink-0 whitespace-nowrap self-stretch py-3.5 px-3 sm:px-4 border-b-2 transition-colors ${
              activeTab === 'testimonials'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Testimonials ({content.testimonials.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`shrink-0 whitespace-nowrap self-stretch py-3.5 px-3 sm:px-4 border-b-2 transition-colors ${
              activeTab === 'submissions'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Leads & Inquiries ({submissions.length})
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80">
                <h3 className="text-sm font-bold text-white mb-2 uppercase text-orange-400">
                  + Add New FAQ Item (Live Change Demo)
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    placeholder="Question (e.g. Do you support retainer agreements?)"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                  <textarea
                    rows={2}
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    placeholder="Answer..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 resize-none"
                  />
                  <button
                    onClick={() => {
                      if (newFaqQ.trim() && newFaqA.trim()) {
                        addFAQ({ question: newFaqQ.trim(), answer: newFaqA.trim() });
                        setNewFaqQ('');
                        setNewFaqA('');
                        showToast();
                      }
                    }}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Add Question to Site
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase">
                  Existing Questions (Direct Edit)
                </h3>
                {content.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-2 relative group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          updateFAQ(faq.id, { question: e.target.value });
                          showToast();
                        }}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-orange-500"
                      />
                      <button
                        onClick={() => {
                          deleteFAQ(faq.id);
                          showToast();
                        }}
                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded bg-red-950/40 border border-red-900/60 shrink-0"
                        title="Delete question"
                      >
                        Delete
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        updateFAQ(faq.id, { answer: e.target.value });
                        showToast();
                      }}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Top Headline
                  </label>
                  <input
                    type="text"
                    value={content.hero.titleTop}
                    onChange={(e) => {
                      updateHero({ titleTop: e.target.value });
                      showToast();
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Middle Accent
                  </label>
                  <input
                    type="text"
                    value={content.hero.titleMid}
                    onChange={(e) => {
                      updateHero({ titleMid: e.target.value });
                      showToast();
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Bottom Headline
                  </label>
                  <input
                    type="text"
                    value={content.hero.titleBottom}
                    onChange={(e) => {
                      updateHero({ titleBottom: e.target.value });
                      showToast();
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Left Annotation Callout
                  </label>
                  <input
                    type="text"
                    value={content.hero.annotationLeft}
                    onChange={(e) => {
                      updateHero({ annotationLeft: e.target.value });
                      showToast();
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Right Annotation Callout
                  </label>
                  <input
                    type="text"
                    value={content.hero.annotationRight}
                    onChange={(e) => {
                      updateHero({ annotationRight: e.target.value });
                      showToast();
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Trust Metric Subtext
                </label>
                <input
                  type="text"
                  value={content.hero.trustSubtext}
                  onChange={(e) => {
                    updateHero({ trustSubtext: e.target.value });
                    showToast();
                  }}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              {content.testimonials.map((t) => (
                <div key={t.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={t.author}
                      onChange={(e) => {
                        updateTestimonial(t.id, { author: e.target.value });
                        showToast();
                      }}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white font-bold"
                    />
                    <input
                      type="text"
                      value={t.role}
                      onChange={(e) => {
                        updateTestimonial(t.id, { role: e.target.value });
                        showToast();
                      }}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-400"
                    />
                    <input
                      type="text"
                      value={t.company}
                      onChange={(e) => {
                        updateTestimonial(t.id, { company: e.target.value });
                        showToast();
                      }}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-orange-400 font-semibold"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={t.quote}
                    onChange={(e) => {
                      updateTestimonial(t.id, { quote: e.target.value });
                      showToast();
                    }}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-300 resize-none"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">
                  Total Captured: {submissions.length} leads
                </span>
                {submissions.length > 0 && (
                  <button
                    onClick={clearSubmissions}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Clear Database
                  </button>
                )}
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs font-mono">
                  No submissions yet. Submit the Newsletter form in the footer or click a "CONTACT" button to see entries appear here in real-time!
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono space-y-1"
                    >
                      <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                        <span className="text-orange-400 font-bold uppercase">{sub.type}</span>
                        <span>{new Date(sub.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="text-white">
                        {sub.type === 'newsletter' ? (
                          <span>Subscriber: <strong>{sub.data.email}</strong></span>
                        ) : (
                          <div>
                            <div>Client: <strong>{sub.data.full_name}</strong> ({sub.data.work_email})</div>
                            <div>Company: {sub.data.company} • Service: {sub.data.service_selected}</div>
                            {sub.data.message && <div className="text-neutral-400 italic mt-1">"{sub.data.message}"</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Reset all content back to factory default?')) {
                  resetToDefault();
                  showToast();
                }
              }}
              className="text-xs text-neutral-500 hover:text-neutral-300 underline"
            >
              Reset to Original
            </button>
            {saveToast && (
              <span className="text-xs text-emerald-400 font-mono animate-in fade-in">
                ✓ Changes live on page!
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCMSModalOpen(false)}
            className="px-6 py-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Done Editing
          </button>
        </div>

      </div>
    </div>
  );
};
