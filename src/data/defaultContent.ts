import { SiteContent } from '../types/content';

export const defaultContent: SiteContent = {
  hero: {
    titleTop: 'BOLD DESIGN',
    titleMid: 'THAT',
    titleBottom: 'PERFORMS',
    annotationLeft: 'STRATEGY IS CHEAPER',
    annotationRight: 'COMFORTABLE IS EXPENSIVE',
    annotationBottom: 'IDENTITY • EXPERIENCE • MOTION •',
    trustMetric: '100+',
    trustSubtext: "Brands trusted us to define how they're seen.",
    clientLogos: [
      { name: 'zomato', label: 'zomato' },
      { name: 'bosch', label: 'BOSCH' },
      { name: 'loreal', label: "L'ORÉAL" },
      { name: 'vega', label: 'VEGA' },
      { name: 'dell', label: 'DELL' },
      { name: 'loreal-2', label: "L'ORÉAL" }
    ]
  },
  servicesTag: 'WHAT CAN WE DO FOR YOU',
  services: [
    {
      id: 'strategy',
      tagline: 'WHAT CAN WE DO FOR YOU',
      title: 'Strategy and Insight',
      description: 'We interrogate what others assume. Then we build the brief behind the brief.',
      deliverables: [
        'Brand strategy & positioning',
        'Messaging & tone of voice',
        'Audience & competitor research',
        'Workshops & creative sprints'
      ],
      image: '/images/card-strategy-exact.png'
    },
    {
      id: 'branding',
      tagline: 'WHAT CAN WE DO FOR YOU',
      title: 'Brand & visual identity',
      description: 'We build systems, not just logos. So you own the category, not just the conversation.',
      deliverables: [
        'Brand identity & visual language',
        'Guidelines & naming',
        'Illustration & iconography',
        'Brand architecture & systems'
      ],
      image: '/images/card-branding-exact.png'
    },
    {
      id: 'digital',
      tagline: 'WHAT CAN WE DO FOR YOU',
      title: 'Product & digital experience',
      description: 'We design for humans and metrics. So users stay, engage, and come back.',
      deliverables: [
        'UI/UX & website design',
        'Design systems & prototyping',
        'User research & testing',
        'Motion graphics & micro-interactions'
      ],
      image: '/images/card-digital-exact.png'
    },
    {
      id: 'campaign',
      tagline: 'WHAT CAN WE DO FOR YOU',
      title: 'Creative & campaign production',
      description: "For work people can't ignore. Then we put it in front of them.",
      deliverables: [
        'Campaign creative & social content',
        'Presentations & pitch decks',
        'Marketing collateral & ad creative',
        'Omnichannel content & art direction'
      ],
      image: '/images/card-campaign-exact.png'
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      author: 'Marcus Vance',
      role: 'VP of Global Brand Marketing',
      company: 'OmniVenture Tech',
      quote: 'Upthrust transformed how our enterprise is perceived. The new identity and digital experience increased our conversion velocity by 184% in the first quarter.',
      rating: 5
    },
    {
      id: 'test-2',
      author: 'Elena Rostova',
      role: 'Head of Product Design',
      company: 'Aether Digital',
      quote: 'Their attention to detail across typography, motion, and 3D web aesthetics is unmatched. They are not merely an agency; they are strategic growth partners.',
      rating: 5
    },
    {
      id: 'test-3',
      author: 'Karan Singhania',
      role: 'Chief Marketing Officer',
      company: 'Zenith Logistics',
      quote: 'Bold, daring, and grounded in conversion science. If you want work that looks like everyone else, look elsewhere. Upthrust designs for market leadership.',
      rating: 5
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is Upthrust’s typical project timeline?',
      answer: 'Our standard sprint cycles range from 4 to 8 weeks depending on scope. Brand strategy and identity generally takes 4–6 weeks, while comprehensive digital product experiences and custom web builds take 6–10 weeks from discovery to deployment.'
    },
    {
      id: 'faq-2',
      question: 'How do you ensure web performance with high-end 3D graphics?',
      answer: 'We optimize WebGL assets using Draco compression, lazy loading, lightweight Three.js render loops with visibility observers, and adaptive pixel ratios. On mobile devices, we maintain a 60fps frame rate and a Lighthouse performance score above 90.'
    },
    {
      id: 'faq-3',
      question: 'How does your CMS structured content architecture work?',
      answer: 'Our websites are decoupled from static code. Content is driven by structured schemas that marketing teams can update in real-time through headless CMS platforms (or our built-in live admin layer) without requiring engineering redeployments.'
    },
    {
      id: 'faq-4',
      question: 'How is Google Tag Manager and conversion tracking implemented?',
      answer: 'Every key engagement and form submission pushes structured events to window.dataLayer (such as the form_submit event). This enables accurate attribution, CRM sync, and Google Analytics 4 event handling without hardcoding third-party scripts into application logic.'
    },
    {
      id: 'faq-5',
      question: 'Can you handle both brand identity and full-stack technical build?',
      answer: 'Yes. Upthrust operates at the exact intersection of visionary design and high-performance engineering. We deliver not just Figma files, but production-ready, accessible, and SEO-optimized codebases.'
    }
  ],
  footer: {
    headline: 'UPTHRUST.DESIGN',
    newsletterTitle: 'Sign up for our emails',
    newsletterConsent: 'By checking this box sign up for our newsletter and receive marketing emails and updates on our services. You can unsubscribe at any time.',
    agencyDescription: 'add description here',
    ioDescription: 'add description here',
    bottomNote: 'Lorem ipsum dolor sit amet consectetur'
  }
};
