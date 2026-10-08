import React from 'react';

export const CadBlueprint: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`select-none pointer-events-none opacity-40 mix-blend-multiply ${className}`}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="cad-micro-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5" strokeOpacity="0.25" />
        </pattern>
      </defs>

      {/* Grid background */}
      <rect width="600" height="600" fill="url(#cad-micro-grid)" />

      {/* Major concentric architectural arcs */}
      <circle cx="480" cy="420" r="180" stroke="#475569" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="480" cy="420" r="140" stroke="#334155" strokeWidth="1" />
      <circle cx="480" cy="420" r="95" stroke="#475569" strokeWidth="0.75" />
      <circle cx="480" cy="420" r="50" stroke="#0f172a" strokeWidth="1.2" />
      <circle cx="480" cy="420" r="15" stroke="#ef4444" strokeWidth="1" fill="#ef4444" fillOpacity="0.1" />

      {/* Radial angle dividers */}
      <line x1="480" y1="240" x2="480" y2="600" stroke="#64748b" strokeWidth="0.75" />
      <line x1="300" y1="420" x2="660" y2="420" stroke="#64748b" strokeWidth="0.75" />
      <line x1="352" y1="292" x2="608" y2="548" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="352" y1="548" x2="608" y2="292" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Architectural section outlines & rooms */}
      <rect x="220" y="240" width="160" height="120" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="240" y="260" width="120" height="80" stroke="#475569" strokeWidth="0.75" />
      <line x1="240" y1="300" x2="360" y2="300" stroke="#64748b" strokeWidth="0.5" />
      <line x1="300" y1="260" x2="300" y2="340" stroke="#64748b" strokeWidth="0.5" />

      {/* Technical dimension markers and ticks */}
      <path d="M 180 380 L 210 380 M 180 375 L 180 385 M 210 375 L 210 385" stroke="#0f172a" strokeWidth="0.8" />
      <text x="195" y="372" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">42.50mm</text>

      <path d="M 390 180 L 390 220 M 385 180 L 395 180 M 385 220 L 395 220" stroke="#0f172a" strokeWidth="0.8" />
      <text x="408" y="202" fontSize="8" fontFamily="monospace" fill="#475569">R=180</text>

      {/* Protractor angle labels */}
      <text x="320" y="520" fontSize="9" fontFamily="monospace" fill="#64748b">30°</text>
      <text x="360" y="560" fontSize="9" fontFamily="monospace" fill="#64748b">60°</text>
      <text x="420" y="585" fontSize="9" fontFamily="monospace" fill="#64748b">90°</text>

      {/* Gear / Turbine rosette hatch */}
      <g transform="translate(560, 500) scale(0.6)">
        <circle cx="0" cy="0" r="40" stroke="#475569" strokeWidth="0.8" />
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="40"
            y2="0"
            stroke="#64748b"
            strokeWidth="0.5"
            transform={`rotate(${i * 22.5})`}
          />
        ))}
      </g>
    </svg>
  );
};
