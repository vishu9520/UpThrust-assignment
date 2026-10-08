import React from 'react';
import { useCMS } from '../context/CMSContext';

export const FAQ: React.FC = () => {
  const { content, setIsCMSModalOpen } = useCMS();
  const { faqs } = content;

  return (
    <section
      id="faq"
      className="relative w-full bg-white border-b border-neutral-300/80 py-20 md:py-28"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-950 bg-orange-100 border border-orange-300 px-3 py-1 rounded-full">
            CLARITY & PROCESS
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mt-4 uppercase">
            Frequently Asked <span className="text-orange-600">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-600 mt-3 font-medium">
            Everything you need to know about partnering with Upthrust on strategy, design systems, and digital product delivery.
          </p>
        </div>

        {/* Semantic native details/summary accordion using modern-web-guidance */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={faq.id}
              name="upthrust-faq"
              className="group border border-neutral-200 rounded-2xl bg-neutral-50/50 hover:bg-neutral-50 transition-colors overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 md:p-7 cursor-pointer list-none select-none font-sans font-bold text-base md:text-xl text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl">
                <span className="flex items-center gap-4">
                  <span className="text-xs font-mono text-orange-800 font-bold">
                    0{idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <span className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 text-lg font-mono transition-transform duration-300 group-open:rotate-45 group-open:bg-orange-600 group-open:text-white group-open:border-orange-600 shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 md:px-7 pb-6 pt-1 text-neutral-600 text-sm md:text-base font-normal leading-relaxed border-t border-neutral-100/60 mt-1">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* CMS Live Hint for Interviewers */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-600">
            Need to update or add an FAQ item?{' '}
            <button
              onClick={() => setIsCMSModalOpen(true)}
              className="text-orange-800 font-bold underline hover:text-orange-950 focus:outline-none"
            >
              Open Live CMS Editor
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
