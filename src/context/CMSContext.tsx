import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, FAQItem, TestimonialItem, ServiceItem, FormSubmission, HeroContent } from '../types/content';
import { defaultContent } from '../data/defaultContent';

const STORAGE_KEY = 'upthrust_cms_content_v1';
const SUBMISSIONS_KEY = 'upthrust_form_submissions_v1';

interface CMSContextType {
  content: SiteContent;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  updateFAQ: (id: string, updated: Partial<FAQItem>) => void;
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  deleteFAQ: (id: string) => void;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  resetToDefault: () => void;
  exportJSON: () => void;
  importJSON: (jsonStr: string) => boolean;
  isCMSModalOpen: boolean;
  setIsCMSModalOpen: (open: boolean) => void;
  submissions: FormSubmission[];
  addSubmission: (type: 'newsletter' | 'contact_lead', data: Record<string, any>) => void;
  clearSubmissions: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Failed to parse saved CMS content:', err);
    }
    return defaultContent;
  });

  const [submissions, setSubmissions] = useState<FormSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Failed to parse submissions:', err);
    }
    return [];
  });

  const [isCMSModalOpen, setIsCMSModalOpen] = useState(false);

  // Sync content to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (err) {
      console.error('Failed to save CMS content to localStorage:', err);
    }
  }, [content]);

  // Sync submissions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    } catch (err) {
      console.error('Failed to save submissions to localStorage:', err);
    }
  }, [submissions]);

  const updateHero = (heroUpdates: Partial<HeroContent>) => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        ...heroUpdates
      }
    }));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      )
    }));
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f))
    }));
  };

  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newId = `faq-${Date.now()}`;
    setContent((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { ...faq, id: newId }]
    }));
  };

  const deleteFAQ = (id: string) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id)
    }));
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      )
    }));
  };

  const resetToDefault = () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upthrust-content-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.hero && parsed.services && parsed.faqs) {
        setContent(parsed);
        return true;
      }
    } catch (err) {
      console.error('Invalid JSON import:', err);
    }
    return false;
  };

  const addSubmission = (type: 'newsletter' | 'contact_lead', data: Record<string, any>) => {
    const newSubmission: FormSubmission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      data,
      timestamp: new Date().toISOString()
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  const clearSubmissions = () => {
    setSubmissions([]);
    try {
      localStorage.removeItem(SUBMISSIONS_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        updateHero,
        updateService,
        updateFAQ,
        addFAQ,
        deleteFAQ,
        updateTestimonial,
        resetToDefault,
        exportJSON,
        importJSON,
        isCMSModalOpen,
        setIsCMSModalOpen,
        submissions,
        addSubmission,
        clearSubmissions
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
