import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CurveCanvas } from './CurveCanvas';

interface ServicesProps {
  onOpenContact: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const { content } = useCMS();
  const { services } = content;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex] || services[0];

  return (
    <section
      id="services"
      className="relative w-full bg-black text-white py-20 md:py-28 overflow-hidden select-none"
      aria-label="Capabilities and Services"
    >
      {/* Continuous 3D Orange Curved Tube Canvas matching Images 3, 4, 5 */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-90 overflow-hidden">
        <CurveCanvas className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Navigation Tabs to switch between the 4 services */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar">
          {services.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                activeIndex === idx
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              0{idx + 1}. {s.title}
            </button>
          ))}
        </div>

        {/* Active Service Showcase Slide matching Images 3, 4, 5 */}
        <div className="relative w-full min-h-[520px] flex flex-col justify-between">
          
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <div className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-neutral-400 mb-2">
              {content.servicesTag}
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-sans leading-none">
              {activeService.title}
            </h2>
          </div>

          {/* 2-Column Content Layout matching Images 3, 4, 5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center">
            
            {/* Left Column: Mockup Card */}
            <div className="lg:col-span-6">
              <div className="relative w-full max-w-[540px] aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/90 shadow-2xl">
                <img
                  src={activeService.image}
                  alt={`${activeService.title} presentation mockup`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Description, Sparkle Bullet Points, and CONTACT Button */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-7 max-w-xl">
              
              {/* Hook / Description */}
              <p className="text-lg sm:text-2xl font-normal text-white leading-snug font-sans">
                {activeService.description}
              </p>

              {/* Bullet list with sparkle '✦' glyph matching Images 3, 4, 5 */}
              <ul className="space-y-3.5" aria-label={`Deliverables for ${activeService.title}`}>
                {activeService.deliverables.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-base sm:text-lg text-white font-medium font-sans"
                  >
                    <span className="text-white text-base select-none shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Sharp Rectangular White CONTACT Button matching Images 3, 4, 5 */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenContact(activeService.title)}
                  className="px-9 py-3.5 bg-white hover:bg-neutral-100 text-[#C22900] font-black text-sm uppercase tracking-wider transition-all duration-150 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={`Contact Upthrust about ${activeService.title}`}
                >
                  CONTACT
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Slide Pager controls */}
          <div className="flex items-center justify-between pt-12 mt-12 border-t border-neutral-900 text-xs text-neutral-400">
            <div className="font-mono">
              0{activeIndex + 1} / 0{services.length}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1))}
                className="w-9 h-9 rounded-full border border-neutral-800 hover:border-neutral-600 text-white flex items-center justify-center transition-colors"
                aria-label="Previous service"
              >
                ←
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0))}
                className="w-9 h-9 rounded-full border border-neutral-800 hover:border-neutral-600 text-white flex items-center justify-center transition-colors"
                aria-label="Next service"
              >
                →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
