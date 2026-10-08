import React from 'react';
import { useCMS } from '../context/CMSContext';

export const Testimonials: React.FC = () => {
  const { content } = useCMS();
  const { testimonials } = content;

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#FAFAFA] border-b border-neutral-300/80 py-20 md:py-28 select-none"
      aria-label="Client Testimonials and Impact"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-950 bg-orange-100 border border-orange-300 px-3 py-1 rounded-full">
              PROVEN RESULTS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mt-4 uppercase">
              Designed for impact. <br />
              <span className="text-orange-600">Validated by market leaders.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-medium">
            We don’t measure success by design awards. We measure it by conversion velocity, enterprise valuation, and market authority.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-neutral-200/90 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 relative group"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-neutral-800 text-base md:text-lg font-medium leading-relaxed mb-8 flex-1 italic">
                “{t.quote}”
              </blockquote>

              {/* Author & Org */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-950 text-sm md:text-base font-sans">
                    {t.author}
                  </div>
                  <div className="text-xs text-neutral-500 font-medium">
                    {t.role} · <span className="text-neutral-900 font-semibold">{t.company}</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs uppercase border border-orange-200">
                  {t.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
