export interface ServiceItem {
  id: string;
  tagline: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface HeroContent {
  titleTop: string;
  titleMid: string;
  titleBottom: string;
  annotationLeft: string;
  annotationRight: string;
  annotationBottom: string;
  trustMetric: string;
  trustSubtext: string;
  clientLogos: { name: string; label: string }[];
}

export interface FooterContent {
  headline: string;
  newsletterTitle: string;
  newsletterConsent: string;
  agencyDescription: string;
  ioDescription: string;
  bottomNote: string;
}

export interface SiteContent {
  hero: HeroContent;
  servicesTag: string;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  footer: FooterContent;
}

export interface FormSubmission {
  id: string;
  type: 'newsletter' | 'contact_lead';
  data: Record<string, any>;
  timestamp: string;
}
