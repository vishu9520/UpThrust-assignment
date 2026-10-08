import React from 'react';

export const ClientLogos: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-6 md:gap-10 overflow-x-auto py-2 no-scrollbar">
      {/* Zomato */}
      <div className="flex items-center shrink-0 opacity-80 hover:opacity-100 transition-opacity">
        <span className="font-black italic tracking-tighter text-2xl md:text-3xl font-sans text-black">
          zomato
        </span>
      </div>

      {/* Bosch */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
        <span className="font-extrabold tracking-widest text-lg md:text-xl font-mono text-black">
          BOSCH
        </span>
      </div>

      {/* L'Oréal */}
      <div className="flex items-center shrink-0 opacity-80 hover:opacity-100 transition-opacity">
        <span className="font-serif tracking-widest text-lg md:text-xl font-bold uppercase text-black">
          L’ORÉAL
        </span>
      </div>

      {/* Vega */}
      <div className="flex items-center shrink-0 opacity-80 hover:opacity-100 transition-opacity">
        <span className="font-black tracking-widest text-xl md:text-2xl text-black">
          VEGA
        </span>
      </div>

      {/* Dell */}
      <div className="flex items-center shrink-0 opacity-80 hover:opacity-100 transition-opacity">
        <span className="font-black tracking-tighter text-2xl md:text-3xl text-black">
          DE<span className="inline-block transform -rotate-25 scale-110">L</span>L
        </span>
      </div>

      {/* L'Oréal Paris */}
      <div className="flex items-center shrink-0 opacity-80 hover:opacity-100 transition-opacity">
        <span className="font-serif tracking-widest text-lg md:text-xl font-bold uppercase text-black">
          L’ORÉAL
        </span>
      </div>
    </div>
  );
};
