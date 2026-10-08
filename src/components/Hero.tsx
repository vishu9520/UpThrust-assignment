import React from 'react';
import { useCMS } from '../context/CMSContext';
import { StatueCanvas } from './StatueCanvas';
import { CadBlueprint } from './CadBlueprint';
import { ClientLogos } from './ClientLogos';

export const Hero: React.FC = () => {
  const { content } = useCMS();
  const { hero } = content;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#FAFAFA] border-b border-neutral-300/80 pt-8 pb-0 select-none"
      aria-label="Hero Introduction"
    >
      {/* Background Engineering Grid with crosshair markers */}
      <div className="absolute inset-0 bg-hero-grid opacity-75 pointer-events-none" />

      {/* Crosshair markers overlay */}
      <div className="absolute inset-0 pointer-events-none flex justify-between items-between p-8 opacity-40">
        <span className="text-neutral-500 font-mono text-xs">+</span>
        <span className="text-neutral-500 font-mono text-xs">+</span>
        <span className="text-neutral-500 font-mono text-xs">+</span>
        <span className="text-neutral-500 font-mono text-xs">+</span>
      </div>

      {/* CAD Blueprint technical schematic overlay on bottom right */}
      <div className="absolute right-0 bottom-16 w-[420px] md:w-[680px] pointer-events-none z-0">
        <CadBlueprint className="w-full h-auto" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-between min-h-[720px] md:min-h-[840px]">
        
        {/* Top & Middle Typography Layer + 3D Statue */}
        <div className="relative w-full pt-4 md:pt-6 flex flex-col items-center">
          
          {/* Top Line: BOLD DESIGN */}
          <div className="w-full flex justify-center">
            <h1 className="hero-font-bold text-[#FF3E00] tracking-tighter uppercase italic leading-[0.88] text-center transform -skew-x-6 text-[15vw] md:text-[14vw] lg:text-[12.8vw] drop-shadow-sm select-none">
              {hero.titleTop}
            </h1>
          </div>

          {/* Center Stage: 3D Statue + Overlaid Annotations + THAT */}
          <div className="relative w-full max-w-4xl my-[-3vw] md:my-[-4vw] flex items-center justify-center min-h-[360px] md:min-h-[500px]">
            
            {/* Annotation 1: STRATEGY IS CHEAPER (Top Left) */}
            <div className="absolute left-2 sm:left-6 md:left-12 top-4 md:top-12 z-20 flex flex-col items-start pointer-events-none">
              <div className="font-extrabold text-neutral-900 text-xs sm:text-sm md:text-base tracking-tight font-sans">
                STRATEGY IS
              </div>
              <div className="relative inline-block mt-0.5">
                <span className="font-extrabold text-neutral-900 text-xs sm:text-sm md:text-base tracking-tight font-sans px-1">
                  CHEAPER
                </span>
                {/* Sketchy hand-drawn red circle loop */}
                <svg
                  className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] overflow-visible text-[#E62E00]"
                  viewBox="0 0 120 40"
                  fill="none"
                >
                  <ellipse
                    cx="60"
                    cy="20"
                    rx="56"
                    ry="17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeDasharray="180 8"
                    transform="rotate(-2 60 20)"
                  />
                </svg>
              </div>
            </div>

            {/* Annotation 2: COMFORTABLE IS EXPENSIVE (Right side) */}
            <div className="absolute right-2 sm:right-6 md:right-12 top-6 md:top-16 z-20 flex flex-col items-start pointer-events-none text-left">
              <div className="font-black text-neutral-900 text-sm sm:text-base md:text-lg tracking-tight font-sans">
                COMFORTABLE
              </div>
              <div className="font-black text-neutral-900 text-sm sm:text-base md:text-lg tracking-tight font-sans">
                IS EXPENSIVE
              </div>
              {/* Sketchy wavy underline */}
              <svg className="w-28 sm:w-36 h-3 text-[#FF3E00] mt-1" viewBox="0 0 140 12" fill="none">
                <path
                  d="M2 6 Q 16 0, 30 6 T 60 6 T 90 6 T 120 6 T 138 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Center 3D Iridescent Statue Canvas */}
            <div className="relative z-10 w-[290px] h-[340px] sm:w-[360px] sm:h-[420px] md:w-[460px] md:h-[530px] flex items-center justify-center">
              <StatueCanvas className="w-full h-full" />
            </div>

            {/* THAT Typography (Positioned behind/to the right of the statue) */}
            <div className="absolute right-4 sm:right-12 md:right-28 top-1/2 -translate-y-1/2 z-0">
              <span className="hero-font-bold text-[#FF3E00] uppercase tracking-tighter leading-none text-[14vw] md:text-[13vw] lg:text-[11.5vw] font-black drop-shadow-sm select-none">
                {hero.titleMid}
              </span>
            </div>

            {/* Annotation 3: IDENTITY • EXPERIENCE • MOTION • (Bottom Left) */}
            <div className="absolute left-2 sm:left-6 md:left-12 bottom-6 md:bottom-12 z-20 flex flex-col items-start pointer-events-none">
              <div className="font-black text-neutral-900 text-sm sm:text-base md:text-xl tracking-tight uppercase font-sans">
                IDENTITY •
              </div>
              <div className="font-black text-neutral-900 text-sm sm:text-base md:text-xl tracking-tight uppercase font-sans">
                EXPERIENCE •
              </div>
              <div className="relative font-black text-neutral-900 text-sm sm:text-base md:text-xl tracking-tight uppercase font-sans">
                MOTION •
                {/* Red Underline */}
                <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#E62E00] rounded-full" />
              </div>
            </div>

          </div>

          {/* Bottom Line: PERFORMS */}
          <div className="w-full flex justify-center -mt-4 md:-mt-8 mb-6">
            <div className="hero-font-bold text-[#FF3E00] tracking-tighter uppercase italic leading-[0.85] text-center transform -skew-x-6 text-[15vw] md:text-[14vw] lg:text-[12.8vw] drop-shadow-sm select-none">
              {hero.titleBottom}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Trust Metric & Client Logos matching Image 3 */}
        <div className="relative z-20 w-full border-t border-neutral-300/80 pt-4 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Trust Metric (Left 3 cols) */}
          <div className="lg:col-span-3 flex items-center sm:items-start gap-3 sm:flex-col border-b lg:border-b-0 lg:border-r border-neutral-300/80 pb-3 lg:pb-0 lg:pr-6">
            <span className="font-black text-3xl sm:text-4xl tracking-tight text-neutral-950 font-sans">
              {hero.trustMetric}
            </span>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-tight max-w-[200px]">
              {hero.trustSubtext}
            </p>
          </div>

          {/* Client Logos (Right 9 cols) */}
          <div className="lg:col-span-9 pl-0 lg:pl-6 overflow-hidden">
            <ClientLogos />
          </div>

        </div>

      </div>
    </section>
  );
};
