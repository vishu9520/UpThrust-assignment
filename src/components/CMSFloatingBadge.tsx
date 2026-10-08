import React from 'react';
import { useCMS } from '../context/CMSContext';

export const CMSFloatingBadge: React.FC = () => {
  const { setIsCMSModalOpen } = useCMS();

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <button
        onClick={() => setIsCMSModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B82200] hover:bg-[#991B00] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-orange-600/30 hover:scale-105 transition-all duration-200 border border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
        title="Open CMS Live Content Editor"
      >
        <span>🛠️</span>
        <span>CMS Admin</span>
      </button>
    </div>
  );
};
