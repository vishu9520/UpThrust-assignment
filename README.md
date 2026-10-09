# Upthrust Design — Candidate Assessment (Stage 2)
> **"Build it. Explain it. Show how it works."**  
> Practical implementation of the Upthrust landing page, 3D WebGL assets, conversion tracking, and structured CMS architecture.

---

## 🚀 Live Demo & Presentation
- **Local Dev Server:** `http://localhost:3000/`
- **Build Output:** Production static bundle in `/dist` (Vercel / Netlify / Cloudflare Pages ready)

---

## 🛠️ Stack Used & Why

| Technology | Purpose & Architectural Decision |
| :--- | :--- |
| **Vite + React 19 + TypeScript** | Instant HMR during development, strict type safety, zero layout shift, and blazing fast production bundling. |
| **Three.js (WebGL)** | Custom WebGL pipelines for rendering the 3D iridescent bust statue (`statue.glb`) and winding orange curve ribbon (`curve-line.glb`) with ACESFilmic tone mapping, physical reflections, and reactive cursor tilt. |
| **Tailwind CSS v4** | Modern, token-based design system using CSS variables (`--brand-orange: #FF3E00`, `--bg-dark: #050507`), fluid typography (`15vw`), and responsive container queries. |
| **Reactive In-Browser CMS** | Decoupled content system persisted to `localStorage` with real-time UI updates, import/export JSON, and factory reset. Built for non-developers. |
| **Google Tag Manager DataLayer** | Native `window.dataLayer.push()` event tracking for `form_submit` across Newsletter and Project Inquiry forms, paired with a live UI event inspector. |
| **Axe-core & Puppeteer** | Automated WCAG 2.1 AA accessibility testing (0 violations) and responsive multi-viewport regression suite (375px, 768px, 1440px). |

---

## 📁 Project Structure

```
UpThrust/
├── public/
│   ├── favicon.svg             # Trefoil rocket brand favicon
│   ├── og-preview.png          # High-resolution Open Graph social preview
│   ├── images/                 # Optimized service mockups (Strategy, Branding, UX, Campaigns)
│   └── models/
│       ├── statue.glb          # 3D Iridescent classical bust
│       └── curve-line.glb      # 3D Glossy orange curved ribbon
├── src/
│   ├── types/
│   │   └── content.ts          # Strongly typed content & form submission schemas
│   ├── data/
│   │   └── defaultContent.ts   # Canonical source copy, FAQ entries, and testimonials
│   ├── context/
│   │   ├── CMSContext.tsx      # Reactive content state & lead submission store
│   │   └── GTMContext.tsx      # dataLayer dispatching and event listener
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive navigation & orange 3-bar hamburger drawer
│   │   ├── Hero.tsx            # Bold typography, annotations, grid & CAD blueprint
│   │   ├── StatueCanvas.tsx    # Three.js iridescent statue with mouse-follow tilt
│   │   ├── Services.tsx        # 4 capabilities cards with 3D ribbon & CONTACT triggers
│   │   ├── CurveCanvas.tsx     # Three.js 3D curve line ribbon canvas
│   │   ├── Testimonials.tsx    # Client social proof & verified reviews
│   │   ├── FAQ.tsx             # Accessible details/summary accordion (WCAG AA)
│   │   ├── Footer.tsx          # UPTHRUST.DESIGN title, agency links, newsletter form
│   │   ├── ContactModal.tsx    # Accessible lead capture dialog with GTM tracking
│   │   ├── CMSAdminModal.tsx   # Live non-developer CMS editor (Interview live changes)
│   │   ├── GTMDebugger.tsx     # Real-time on-screen window.dataLayer monitor
│   │   └── CadBlueprint.tsx    # SVG architectural schematic overlay
│   ├── index.css               # Engineering grid, tokens, accessibility focus states
│   ├── App.tsx                 # Semantic landmarks, providers & layout assembly
│   └── main.tsx                # React DOM root entrypoint
├── scripts/
│   ├── take-screenshots.cjs    # Automated multi-viewport screenshot runner
│   ├── test-forms-gtm.cjs      # End-to-end form & dataLayer validation script
│   └── audit-a11y.cjs          # Axe-core WCAG 2.1 AA compliance audit
└── vite.config.ts              # Code splitting, asset optimization, Tailwind plugin
```

---

## 📝 How Content Can Be Edited (CMS & Backend)

### 1. In-Browser Live CMS Editor (`🛠️ CMS Admin` Button)
Click the floating **"CMS Admin"** badge in the bottom-right corner (or open it from the navigation drawer) to access the structured content management hub:
- **Hero & Headlines:** Edit `BOLD DESIGN`, `THAT`, `PERFORMS`, annotations, and trust subtext live.
- **FAQs (Interview Live Change):** Add new questions, edit answers inline, or delete questions. Changes update the webpage immediately.
- **Testimonials:** Modify client quotes, roles, and company affiliations.
- **Leads & Inquiries Database:** Inspect incoming form submissions (email, company, scope, budget) stored in real time.
- **Export / Import:** Download current content as a formatted `JSON` file or reset to factory defaults.

### 2. MongoDB-backed Content and Leads

The local development server persists CMS content and form submissions in MongoDB Atlas.
The browser only communicates with the server API, so MongoDB credentials are never bundled
into the frontend.

1. Keep the Atlas credentials in `.env` (or set `MONGODB_ENV_FILE` to a protected environment
   file). This file is ignored by Git.
2. Set `MONGODB_DB_NAME` if you want a database name other than `upthrust`.
3. Run `npm run dev` to start both the Vite frontend and the MongoDB-backed API.
4. For production, run `npm run build` and then `npm start` on a server that has the same
   environment variables. Deploying only the `dist` folder does not include the API.

The API creates a `cms` collection for the single site-content document and a `submissions`
collection for newsletter and contact leads. If MongoDB is unavailable, the frontend continues
using its existing local-storage fallback.

### 3. File-Based Content Architecture
For static builds or headless CMS integrations (e.g., Sanity, Strapi, Contentful), all default copy resides cleanly in:
[`src/data/defaultContent.ts`](file:///d:/UpThrust/src/data/defaultContent.ts)

---

## 📊 Form Handling & Conversion Tracking

### 1. The Forms
1. **Footer Newsletter Form:** Includes HTML5 email validation and a mandatory GDPR consent checkbox.
2. **Project Inquiry Modal:** Opened via any **"CONTACT ↗"** button or header CTA. Captures Name, Work Email, Company, Service Scope, Budget, and Project Message.

### 2. Google Tag Manager `form_submit` Event
Both forms automatically push a structured payload to `window.dataLayer`:
```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'form_submit',
  form_id: 'lead_inquiry_modal', // or 'newsletter_footer'
  form_name: 'Client Project Request',
  full_name: 'Sarah Connor',
  work_email: 'sarah@skynet-solutions.com',
  company: 'Cyberdyne Systems',
  service_selected: 'Strategy and Insight',
  budget_range: '$25k – $50k',
  timestamp: '2026-10-08T15:00:00.000Z'
});
```

### 3. Live Verification During Interview
- **Visual GTM Monitor:** Click the floating **`GTM dataLayer`** badge in the bottom-left corner to watch events push in real-time.
- **Browser DevTools:** Run `window.dataLayer` in the browser console.

---

## ♿ Accessibility & SEO Compliance

- **Lighthouse Accessibility:** **100% WCAG 2.1 AA Compliant** verified via `axe-core` (0 violations across 45 rules).
- **Readable Color Contrast:** High-contrast buttons and badges (`#B82200` on white exceeds 5.5:1 ratio).
- **Keyboard Navigation:** Native `<dialog>` focus trapping, visible `:focus-visible` outlines, and native `<details>`/`<summary>` accordion.
- **Technical SEO:**
  - Single `<h1>` with logical heading hierarchy.
  - JSON-LD Structured Data (`ProfessionalService` schema).
  - OpenGraph / Twitter Cards meta tags with high-res preview image.
  - Semantic HTML landmarks (`<header>`, `<main>`, `<section>`, `<footer>`).

---

## 🚢 Deployment Steps

### Option A: Deploy to Vercel (Recommended)
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/upthrust-landing.git
   git branch -M main
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build` | Output Directory: `dist`.
6. Click **Deploy**. Your staging URL will be live in ~30 seconds.

### Option B: Deploy to Netlify
1. Connect repository on [Netlify](https://app.netlify.com/).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy!

### Option C: Run Locally
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build & preview production bundle
npm run build
npm run preview
```

---

## 🤖 AI Tools Used During Development
- **Google Antigravity IDE (Gemini 3.8 Flash):** Used for scaffolding, Three.js shader material calibration, responsive CSS token design, and writing automated Puppeteer/Axe-core test scripts.
- **Review & Validation:** All code was audited, verified for strict WCAG 2.1 AA accessibility, tested against responsive breakpoints (375px, 768px, 1440px), and compiled with 0 TypeScript errors.

---

## 🔮 What We Would Improve With More Time
1. **Interactive Three.js Post-Processing:** Integrate an optional Bloom / chromatic aberration post-processing pass on desktop GPUs.
2. **Headless CMS Webhooks:** Wire the in-browser CMS export directly to a serverless edge API or GitHub Actions webhook for automated CI/CD redeployments.
3. **Multi-Step Estimation Calculator:** Add an interactive budget and scope estimator widget within the contact modal.
