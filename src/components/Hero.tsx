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
      className="relative w-full overflow-hidden bg-white border-b border-neutral-300 pt-24 pb-0 select-none"
      aria-label="Hero Section"
    >
      {/* Background Engineering Grid matching Image 1 */}
      <div className="absolute inset-0 bg-hero-grid opacity-80 pointer-events-none" />

      {/* Grid crosshair '+' intersection markers */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-6 grid-rows-6 p-6 opacity-35">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center font-mono text-[11px] text-neutral-600">
            +
          </div>
        ))}
      </div>

      {/* CAD Blueprint technical schematic overlay on bottom right matching Image 1 */}
      <div className="absolute right-0 bottom-12 w-[460px] md:w-[720px] pointer-events-none z-0">
        <CadBlueprint className="w-full h-auto" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex flex-col justify-between min-h-[720px] md:min-h-[860px]">
        
        {/* Typography & 3D Center Stage */}
        <div className="relative w-full pt-2 md:pt-4 flex flex-col items-center">
          
          {/* Top Line: BOLD DESIGN matching Image 1 */}
          <div className="w-full flex justify-center">
            <h1 className="hero-font-bold text-[#FF3500] tracking-tighter uppercase italic leading-[0.88] text-center transform -skew-x-12 text-[16vw] md:text-[14.5vw] lg:text-[13.5vw] select-none">
              {hero.titleTop}
            </h1>
          </div>

          {/* Center Stage: 3D Statue + Overlaid Annotations + THAT */}
          <div className="relative w-full max-w-4xl my-[-2vw] md:my-[-3.5vw] flex items-center justify-center min-h-[380px] md:min-h-[520px]">
            
            {/* Annotation 1: STRATEGY IS CHEAPER (Top Left) */}
            <div className="absolute left-2 sm:left-6 md:left-14 top-4 md:top-14 z-20 flex flex-col items-start pointer-events-none">
              <div className="font-extrabold text-neutral-950 text-xs sm:text-sm md:text-base tracking-tight font-sans">
                STRATEGY IS
              </div>
              <div className="relative inline-block mt-0.5">
                <span className="font-extrabold text-neutral-950 text-xs sm:text-sm md:text-base tracking-tight font-sans px-1">
                  CHEAPER
                </span>
                {/* Sketchy hand-drawn red circle loop matching Image 1 */}
                <svg
                  className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+14px)] overflow-visible text-[#E62E00]"
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
            <div className="absolute right-2 sm:right-6 md:right-16 top-6 md:top-16 z-20 flex flex-col items-start pointer-events-none text-left">
              <div className="font-black text-neutral-950 text-sm sm:text-base md:text-lg tracking-tight font-sans leading-tight">
                COMFORTABLE
              </div>
              <div className="font-black text-neutral-950 text-sm sm:text-base md:text-lg tracking-tight font-sans leading-tight">
                IS EXPENSIVE
              </div>
              {/* Hand-drawn wavy underline matching Image 1 */}
              <svg className="w-28 sm:w-36 h-3 text-[#FF3500] mt-1.5" viewBox="0 0 140 12" fill="none">
                <path
                  d="M2 6 Q 16 0, 30 6 T 60 6 T 90 6 T 120 6 T 138 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Center 3D Iridescent Statue Canvas */}
            <div className="relative z-10 w-[300px] h-[360px] sm:w-[380px] sm:h-[450px] md:w-[480px] md:h-[550px] flex items-center justify-center">
              <StatueCanvas className="w-full h-full" />
            </div>

            {/* THAT Typography (Positioned to the right of the statue matching Image 1) */}
            <div className="absolute right-4 sm:right-10 md:right-24 top-1/2 -translate-y-1/2 z-0">
              <span className="hero-font-bold text-[#FF3500] uppercase tracking-tighter leading-none text-[14vw] md:text-[13vw] lg:text-[12vw] font-black select-none">
                {hero.titleMid}
              </span>
            </div>

            {/* Annotation 3: IDENTITY • EXPERIENCE • MOTION • (Bottom Left) */}
            <div className="absolute left-2 sm:left-6 md:left-14 bottom-6 md:bottom-12 z-20 flex flex-col items-start pointer-events-none">
              <div className="font-black text-neutral-950 text-sm sm:text-base md:text-xl tracking-tight uppercase font-sans leading-tight">
                IDENTITY •
              </div>
              <div className="font-black text-neutral-950 text-sm sm:text-base md:text-xl tracking-tight uppercase font-sans leading-tight">
                EXPERIENCE •
              </div>
              <div className="relative font-black text-neutral-950 text-sm sm:text-base md:text-xl tracking-tight uppercase font-sans leading-tight">
                MOTION •
                {/* Red Underline matching Image 1 */}
                <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#E62E00] rounded-full" />
              </div>
            </div>

          </div>

          {/* Bottom Line: PERFORMS matching Image 1 */}
          <div className="w-full flex justify-center -mt-4 md:-mt-8 mb-6">
            <div className="hero-font-bold text-[#FF3500] tracking-tighter uppercase italic leading-[0.85] text-center transform -skew-x-12 text-[16vw] md:text-[14.5vw] lg:text-[13.5vw] select-none">
              {hero.titleBottom}
            </div>
          </div>

        </div>

        {/* Bottom Social Proof Bar matching Image 1 */}
        <div className="relative z-20 w-full border-t border-neutral-300 grid grid-cols-1 lg:grid-cols-12 items-center bg-white/60">
          
          {/* Trust Metric (Left 3 cols, bounded by vertical grid border) */}
          <div className="lg:col-span-3 py-4 pr-6 lg:border-r border-neutral-300 flex items-center sm:items-start gap-4 sm:flex-col">
            <span className="font-black text-3xl sm:text-4xl tracking-tight text-neutral-950 font-sans">
              {hero.trustMetric}
            </span>
            <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-tight max-w-[200px]">
              {hero.trustSubtext}
            </p>
          </div>

          {/* Client Logos (Right 9 cols) */}
          <div className="lg:col-span-9 pl-4 lg:pl-8 py-4 overflow-hidden">
            <ClientLogos />
          </div>

        </div>

      </div>
    </section>
  );
};
