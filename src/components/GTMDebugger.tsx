import React from 'react';
import { useGTM } from '../context/GTMContext';

export const GTMDebugger: React.FC = () => {
  const { events, isDebuggerOpen, setIsDebuggerOpen, clearEvents, lastEvent } = useGTM();

  return (
    <aside aria-label="GTM Event Inspector Tool" className="fixed bottom-4 left-4 z-40 select-none">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsDebuggerOpen(!isDebuggerOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-neutral-900/95 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 shadow-2xl backdrop-blur-md text-xs font-mono transition-all group focus:outline-none focus:ring-2 focus:ring-orange-500"
        title="Open Google Tag Manager dataLayer monitor"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="font-bold">GTM dataLayer</span>
        <span className="bg-neutral-800 group-hover:bg-neutral-700 px-1.5 py-0.5 rounded text-[11px] text-neutral-400">
          {events.length}
        </span>
      </button>

      {/* Expanded Monitor Panel */}
      {isDebuggerOpen && (
        <div className="absolute bottom-12 left-0 w-[92vw] sm:w-[480px] bg-neutral-950/95 border border-neutral-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col max-h-[460px] overflow-hidden text-neutral-200 text-xs font-mono animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between bg-black/60">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">●</span>
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                window.dataLayer Inspector
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearEvents}
                className="text-[10px] text-neutral-400 hover:text-neutral-200 underline"
              >
                Clear
              </button>
              <button
                onClick={() => setIsDebuggerOpen(false)}
                className="text-neutral-400 hover:text-white px-1.5 py-0.5 rounded text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Event Stream */}
          <div className="p-3 overflow-y-auto flex-1 space-y-2.5 max-h-[380px]">
            {events.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                No events recorded yet. Submit a form to trigger <code className="text-orange-400">form_submit</code>.
              </div>
            ) : (
              events.map((evt, idx) => {
                const isFormSubmit = evt.event === 'form_submit';
                return (
                  <div
                    key={evt.id || idx}
                    className={`p-2.5 rounded-xl border text-[11px] transition-all ${
                      isFormSubmit
                        ? 'bg-orange-950/40 border-orange-500/60 text-orange-200 ring-1 ring-orange-500/30'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                          isFormSubmit
                            ? 'bg-orange-500 text-white'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {evt.event}
                      </span>
                      <span className="text-neutral-500 text-[10px]">
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <pre className="overflow-x-auto text-[10px] text-neutral-300 bg-black/40 p-1.5 rounded leading-tight">
                      {JSON.stringify(evt, null, 2)}
                    </pre>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Info Footer */}
          <div className="p-2.5 border-t border-neutral-800/80 bg-neutral-900/40 text-[10px] text-neutral-400 flex items-center justify-between">
            <span>Verified in: <code>window.dataLayer</code></span>
            {lastEvent && lastEvent.event === 'form_submit' && (
              <span className="text-emerald-400 font-bold">✓ form_submit active</span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
