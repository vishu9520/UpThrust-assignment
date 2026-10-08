import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CurveCanvas } from './CurveCanvas';

interface ServicesProps {
  onOpenContact: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const { content } = useCMS();
  const { services } = content;

  return (
    <section
      id="services"
      className="relative w-full bg-[#050507] text-white py-20 md:py-28 overflow-hidden select-none"
      aria-label="Capabilities and Services"
    >
      {/* 3D Curved Orange Tube Canvas running across the section matching Image 1 */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-90 overflow-hidden">
        <CurveCanvas className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-500 bg-orange-950/40 border border-orange-500/20 px-3 py-1 rounded-full">
            {content.servicesTag}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-4 uppercase">
            Four disciplines. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">One unfair advantage.</span>
          </h2>
        </div>

        {/* 4 Cards Grid mirroring Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between bg-neutral-900/70 border border-neutral-800/80 hover:border-orange-500/50 rounded-2xl p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1"
            >
              <div>
                {/* Header tag */}
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  {service.tagline}
                </div>

                {/* Service Title */}
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-5 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>

                {/* Service Card Mockup Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-neutral-950 border border-neutral-800">
                  <img
                    src={service.image}
                    alt={`${service.title} mockup preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Tagline / Hook */}
                <p className="text-sm text-neutral-300 font-medium leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Bullet List */}
                <ul className="space-y-2 mb-8" aria-label={`Deliverables for ${service.title}`}>
                  {service.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-neutral-400 font-medium leading-snug"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pill Button: CONTACT matching Image 1 */}
              <div className="pt-4 border-t border-neutral-800/60 mt-auto">
                <button
                  onClick={() => onOpenContact(service.title)}
                  className="w-full py-3 px-6 rounded-full bg-white hover:bg-orange-600 text-[#B82200] hover:text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-orange-500/30 flex items-center justify-center gap-2 group/btn"
                  aria-label={`Contact Upthrust about ${service.title}`}
                >
                  <span>CONTACT</span>
                  <span className="transform group-hover/btn:translate-x-1 transition-transform">↗</span>
                </button>
              </div>

              {/* Number indicator watermark in bottom corner */}
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-neutral-700 pointer-events-none">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
