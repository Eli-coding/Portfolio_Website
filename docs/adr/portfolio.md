# ADR: Single-Page Portfolio Timeline Site

**Date:** 2026-10-05
**Status:** Accepted
**Deciders:** Development Team

## Updates

- **2026-10-05:** Added dark mode toggle and Spanish/English language toggle to scope based on expanded requirements
- **2026-10-05:** Adopted a dyslexia-friendly typeface (Lexend) as the site-wide font
- **2026-10-05:** Moved Contact directly below About; restyled Skills as labeled groups of icon badges
- **2026-10-05:** Hosting set to Vercel (GitHub integration) instead of a GitHub Actions → Netlify workflow
- **2026-10-05:** About redesigned as a retro pop-up window with browser-style tabs (`about_me.txt`, `contact_me.js`); Contact moved into the second tab
- **2026-10-05:** About redesigned as a colored hero band (no photo); Contact shown as a full-width, centered "Let's get in touch!" strip directly under the hero; removed "open to work" / job-seeking language since the candidate is currently employed

---

## Context

Building a single-page portfolio website for a full-stack software engineer currently job hunting. The candidate has 1 relevant job position and 3 projects to showcase initially, with plans to add more projects and positions over time. The portfolio needs to effectively communicate technical skills, work experience, and project work to potential employers in a memorable, engaging format.

---

## Decision

We will build a **single-page React application** with a **colorful/playful aesthetic** using a **CSS framework** (Material-UI/MUI), structured as a vertical scroll experience with the following sections:

1. **Brief About** — 2-3 sentence introduction
2. **Contact** — Links to email, GitHub, LinkedIn, résumé. Lives in a second `contact_me.js` tab of the About pop-up window; nav "Contact" and `#/contact` open that tab
3. **Experience** — Timeline-style work history (1 job initially)
4. **Projects** — Card-based project showcase (3 projects initially)
5. **Skills** — Categorized tech stack (Languages, Frontend, Backend, Databases, Tools) shown as labeled groups of icon badges

### Key Features

- **Fixed navigation** with anchor links to sections
- **Filterable projects** by technology/stack
- **Timeline/card hybrid layout** — Experience uses timeline, Projects use cards
- **Fully responsive** design (mobile-first)
- **Extensible data structure** — Easy to add jobs/projects via JSON/config
- **URL hash support** for deep-linking to sections and active filters
- **Dark mode toggle** — Switch between light/colorful and dark themes
- **Language toggle** — Switch between English and Spanish (i18n support)
- **Dyslexia-friendly typography** — Lexend font site-wide, with readability-focused spacing

---

## Rationale

### Why React?

- **Demonstrates frontend skill** — Portfolio doubles as a React code sample
- **Component reusability** — Project cards, skill tags, timeline items are repeatable
- **State management** — Filtering and navigation state are straightforward
- **Industry standard** — Aligns with full-stack engineer job requirements

### Why CSS Framework (MUI)?

- **Rapid development** — Pre-built components (Cards, Chips, AppBar) accelerate build
- **Professional polish** — Consistent design system out of the box
- **Customizable theming** — Supports colorful/playful aesthetic via theme overrides
- **Accessibility built-in** — WCAG compliance matters for job applications
- **Mobile components** — Drawer, responsive grid, touch interactions

### Why Colorful/Playful?

- **Stand out** — Most dev portfolios are dark/minimal; this differentiates
- **Personality** — Shows creativity and attention to design
- **Energy** — Conveys enthusiasm and approachability
- **Memorable** — Hiring managers review dozens of portfolios; color aids recall

### Why Dark Mode Toggle?

- **User preference** — Some recruiters/developers prefer dark interfaces
- **Flexibility** — Colorful light theme for impact, dark theme for comfort
- **Technical showcase** — Demonstrates theme management and React state/context
- **Accessibility** — Supports users with light sensitivity or viewing in different conditions

### Why Spanish/English Toggle?

- **Broader reach** — Opens portfolio to Spanish-speaking companies and recruiters
- **Market expansion** — Targets both US and Latin American job markets
- **Technical demonstration** — Shows i18n implementation skills
- **Personal relevance** — May reflect candidate's bilingual abilities

### Why a Dyslexia-Friendly Font (Lexend)?

- **Inclusive by default** — Roughly 1 in 10 people have some degree of dyslexia, recruiters included
- **Readability for everyone** — Lexend was designed to reduce visual stress and improve reading fluency
- **Professional look** — Clean sans-serif that still fits a polished job-hunting site
- **Pairs with the playful theme** — Rounded, friendly letterforms suit the colorful aesthetic
- **Shows accessibility awareness** — A thoughtful detail hiring managers notice
- **Free and easy to load** — Available on Google Fonts and via `@fontsource/lexend`

---

## What We're Building

### Scope (In)

**Functionality:**
- Single-page scrolling experience with 5 sections
- Smooth scroll to anchor links via fixed nav
- Project filtering by tech stack (Frontend, Backend, Fullstack, etc.)
- "Clear filters" / "Show all" functionality
- Responsive layout (mobile, tablet, desktop)
- External links to live demos, GitHub repos, LinkedIn
- Dark/light theme toggle with preference persistence (localStorage)
- Dyslexia-friendly typography: Lexend font, generous line height (~1.6), left-aligned text (no justify), no long all-caps or italic blocks
- Spanish/English language toggle with preference persistence

**Content:**
- About: "Hi, I'm …" heading, one-line tagline, optional location, brief intro (who, what). No photo and no "open to work" messaging
- Experience: Job title, company, dates, responsibilities (bulleted)
- Projects: Title, description, tech stack, links (demo + repo)
- Skills: Grouped badges (React, Node, PostgreSQL, Docker, etc.)
- Contact: Email, GitHub, LinkedIn, optional resume download

**Technical:**
- React 18+ (functional components, hooks)
- Material-UI v5 for components and theming
- React Router (hash routing for anchor navigation)
- react-i18next for internationalization (English/Spanish)
- Context API for theme and language state management
- Lexend font self-hosted via `@fontsource/lexend`, set as MUI theme `typography.fontFamily`
- localStorage for persisting user preferences
- Deployed to static hosting (Vercel, Netlify, GitHub Pages)
- No backend/API (static data in JSON or JS config)

---

## What's Explicitly Out of Scope

**Features We Won't Build:**

- ❌ **Multi-page navigation** — No separate routes/pages
- ❌ **Blog or writing section** — Link externally if needed
- ❌ **CMS/admin panel** — Content updates via code/JSON only
- ❌ **Contact form** — Email link is sufficient; avoids spam/backend
- ❌ **Authentication** — Public site, no login
- ❌ **Analytics dashboard** — Use Google Analytics if needed, no custom UI
- ❌ **Image galleries/carousels** — Project cards show 1 thumbnail max
- ❌ **Animations beyond scroll** — No parallax, 3D effects, or heavy motion
- ❌ **Additional languages beyond English/Spanish** — Only two languages supported
- ❌ **Server-side rendering (SSR)** — Client-side React is sufficient for portfolio
- ❌ **Detailed case studies** — Brief descriptions with external links only

**Content We Won't Include:**

- Long-form "About Me" biography
- Testimonials or recommendations (LinkedIn handles this)
- Skills percentage bars or proficiency charts
- Resume embedded in page (downloadable PDF link is cleaner)
- Certifications section (unless 5+ certs; otherwise list in Skills/About)

---

## Alternatives Considered and Rejected

### 1. Plain HTML/CSS/JS
**Rejected because:**
- Doesn't showcase React skills (key for full-stack role)
- Harder to maintain as projects grow
- Filtering logic more verbose without framework

### 2. Next.js / SSR Framework
**Rejected because:**
- Overkill for static single-page site
- Adds complexity (routing, SSR config) with no SEO benefit (single page)
- Slower development for this use case

### 3. Vue / Svelte
**Rejected because:**
- React is more common in full-stack job postings
- Smaller community/ecosystem for rapid component sourcing
- Portfolio should align with target job tech stack

### 4. Tailwind CSS
**Rejected because:**
- Requires more custom component building (buttons, cards, nav)
- MUI provides professional defaults faster
- Playful aesthetic easier with MUI theming than utility classes

### 5. Bootstrap
**Rejected because:**
- Feels dated for modern React projects
- Less flexible theming than MUI
- Not commonly paired with React in 2025+

### 6. Single Theme (Minimal/Dark Only)
**Rejected because:**
- Colorful theme provides better differentiation and personality
- Dark-only is common in dev portfolios (less memorable)
- Offering both light/colorful and dark modes provides best of both worlds
- Toggle demonstrates technical skill without sacrificing aesthetic goals

### 7. OpenDyslexic Font
**Rejected because:**
- Heavily weighted, unusual letterforms look less professional for a job-hunting site
- Clashes with the polished, colorful aesthetic
- Research evidence for its benefit is weak; Lexend offers similar readability goals with a cleaner look

### 8. Atkinson Hyperlegible Font
**Rejected because:**
- Designed mainly for low vision rather than dyslexia
- Strong option, but Lexend better matches the friendly/playful tone

### 9. Multi-Page Structure
**Rejected because:**
- User explicitly wants single-page timeline
- Fragments context across pages
- More navigation friction for recruiters/hiring managers

### 10. Backend/CMS (Strapi, Contentful, etc.)
**Rejected because:**
- Adds deployment complexity (two systems)
- Unnecessary for 4-10 items
- Updating JSON/JS file is fast enough at this scale

---

## Consequences

### Positive

- ✅ Fast development (MUI components accelerate build)
- ✅ Portfolio doubles as React code sample for employers
- ✅ Easy to extend (add projects by editing JSON array)
- ✅ Low hosting cost (static site, free tier on Vercel/Netlify)
- ✅ Memorable aesthetic stands out in applicant pool
- ✅ Mobile-friendly by default (MUI responsive grid)
- ✅ Dark mode increases accessibility and user comfort
- ✅ Bilingual support expands target job market significantly
- ✅ Dyslexia-friendly typography improves readability for all visitors
- ✅ Demonstrates advanced React patterns (Context, i18n, theming)

### Negative

- ⚠️ MUI bundle size (~300KB) + i18n library adds ~50KB — acceptable for portfolio, but larger than minimal setups
- ⚠️ Colorful theme may not appeal to all companies — but differentiation > universal appeal
- ⚠️ No built-in CMS — scaling to 50+ projects may get tedious (can migrate later)
- ⚠️ Translation maintenance — Content must be maintained in two languages (double effort for updates)
- ⚠️ Initial complexity — Dark mode + i18n adds state management overhead upfront

### Mitigations

- **Bundle size:** Use MUI tree-shaking, lazy load i18n translations, enable gzip/brotli compression
- **Theme appeal:** Keep colors professional (not garish); ensure good contrast in both themes
- **CMS limitation:** Structure data in JSON from day 1 for easy migration later
- **Translation maintenance:** Keep content concise to minimize translation burden; use structured JSON for easy updates
- **Complexity:** Use Context API (built into React) instead of external state library; keep theme/i18n logic isolated in custom hooks

---

## Implementation Notes

- Use `create-react-app` or `Vite` for scaffolding
- Store projects/jobs in `src/data/portfolio.json` for easy updates
- MUI theme customization in `src/theme.js` (light and dark variants)
- Set `typography.fontFamily: '"Lexend", sans-serif'` in both theme variants; import `@fontsource/lexend` in `main.jsx`
- i18n translations in `src/locales/en.json` and `src/locales/es.json`
- Create `ThemeContext` for dark mode state management
- Use `react-i18next` with localStorage persistence for language preference
- Deploy on Vercel via its GitHub integration (auto-deploys on push to `main`, preview URLs for pull requests)
- Add PropTypes or TypeScript (optional) for data structure validation

---

## Success Metrics

- Portfolio loads in <3s on 3G
- 100% mobile usable (tested on iPhone, Android)
- All links work (demos, repos, social)
- At least 2 positive pieces of feedback from peers before sending to employers
- Successfully used in job applications within 2 weeks of launch

---

## Future Considerations (Post-MVP)

- Animations (fade-in on scroll, hover effects)
- Blog integration (link to Medium/Dev.to, or add lightweight Markdown renderer)
- Analytics (Google Analytics, Plausible)
- Additional languages (Portuguese, French, etc.) if targeting other markets
- CMS migration if project count exceeds 20
- A/B test different CTAs in About section
- System preference detection (auto-detect user's OS dark mode preference on first visit)
