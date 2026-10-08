import React, { createContext, useContext, useState, useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export interface GTMEvent {
  id: string;
  event: string;
  timestamp: string;
  [key: string]: any;
}

interface GTMContextType {
  events: GTMEvent[];
  pushEvent: (event: string, payload?: Record<string, any>) => void;
  clearEvents: () => void;
  isDebuggerOpen: boolean;
  setIsDebuggerOpen: (open: boolean) => void;
  lastEvent: GTMEvent | null;
}

const GTMContext = createContext<GTMContextType | undefined>(undefined);

export const GTMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<GTMEvent[]>([]);
  const [isDebuggerOpen, setIsDebuggerOpen] = useState(false);
  const [lastEvent, setLastEvent] = useState<GTMEvent | null>(null);

  // Initialize dataLayer on mount
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    
    // Read existing events if any
    const existing: GTMEvent[] = window.dataLayer.map((evt, idx) => ({
      id: `init-${idx}`,
      event: evt.event || 'initial_push',
      timestamp: new Date().toISOString(),
      ...evt
    }));
    
    setEvents(existing);
  }, []);

  const pushEvent = (event: string, payload: Record<string, any> = {}) => {
    const timestamp = new Date().toISOString();
    const eventObject = {
      event,
      ...payload,
      timestamp
    };

    // Push to actual window.dataLayer as required
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventObject);

    console.info(
      `%c[GTM dataLayer.push] %c${event}`,
      'background: #FF4500; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #FF4500; font-weight: bold;',
      eventObject
    );

    const trackedEvent: GTMEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...eventObject
    };

    setEvents((prev) => [trackedEvent, ...prev]);
    setLastEvent(trackedEvent);
  };

  const clearEvents = () => {
    window.dataLayer = [];
    setEvents([]);
    setLastEvent(null);
  };

  return (
    <GTMContext.Provider
      value={{
        events,
        pushEvent,
        clearEvents,
        isDebuggerOpen,
        setIsDebuggerOpen,
        lastEvent
      }}
    >
      {children}
    </GTMContext.Provider>
  );
};

export const useGTM = () => {
  const context = useContext(GTMContext);
  if (!context) {
    throw new Error('useGTM must be used within a GTMProvider');
  }
  return context;
};
