# Elizabeth Rodriguez — Portfolio

A single-page, bilingual (English / Español) portfolio for a full-stack software engineer, styled like a stack of retro browser windows.

> **Live site:** https://elizabeth-rodriguez.vercel.app

The page opens with an `about_me.txt` window whose second tab, `contact_me.js`, holds the contact links. Below it, Experience, Projects and Skills each live in their own window with a monospace file-name tab (`experience.log`, `projects/`, `skills.json`), plus a few "forgotten" background tabs for that too-many-tabs-open developer feel.

## Features

- **One scrolling page** with a fixed nav, smooth anchor scrolling and shareable deep links (`#/contact`, `#/projects?tags=react`)
- **Experience timeline** built from structured data
- **Filterable projects:** filter by stack or technology; the active filters live in the URL so a filtered view can be shared
- **Skills** grouped into Languages, Frontend, Backend, Databases and Tools, each with an icon
- **English / Spanish toggle** and **light / dark mode**, both remembered between visits
- **Downloadable résumé** (a copy with the phone number removed) and a one-click **Copy email** button for visitors without a mail app
- **Playful details:** decorative window controls (`— □ ×`, `+`) show a joke on hover ("I'm only decor :)")

### Accessibility

Accessibility was a requirement from the start, not a final pass:

- **Lexend**, a typeface designed for reading fluency, with generous line height, left-aligned text and no long all-caps passages (dyslexia-friendly)
- Real **WAI-ARIA tabs** in the About window (arrow keys, Home/End, roving tabindex)
- Skip link, one `h1`, labelled sections and a correct heading order; the nav marks the current section
- Descriptive link names ("Live demo: Raíz Rizada (opens in a new tab)"), and filter results announced to screen readers
- Decorative elements hidden from assistive tech; motion respects `prefers-reduced-motion`
- `lang` attribute updates when the language changes

## Tech stack

| Area | Choice |
|---|---|
| Build | [Vite 5](https://vitejs.dev/) |
| UI | [React 18](https://react.dev/) (function components and hooks) |
| Components and theming | [MUI v5](https://mui.com/) (Material UI) and MUI Lab `Timeline`, with custom light and dark themes |
| Routing | React Router 6 (`HashRouter`) for section and filter deep links on static hosting |
| Internationalization | `i18next` and `react-i18next`; each language file is lazy-loaded and the choice is saved in `localStorage` |
| State | React Context (theme) and custom hooks (filters, active section, language) |
| Font | Lexend, self-hosted via `@fontsource/lexend` |
| Type checks | PropTypes |
| Tests | [Vitest](https://vitest.dev/), jsdom and React Testing Library |
| Deploy | [Vercel](https://vercel.com/) via its GitHub integration (any static host works) |

There's no backend: all content comes from JSON files.

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run tests in watch mode (re-runs on save; `q` to quit) |
| `npm run test:run` | Run all tests once (for CI or before committing) |

## Editing content

All content is data, not code:

| What | Where |
|---|---|
| Name, links, location, résumé file | `src/data/portfolio.json` → `profile` |
| Jobs (company, dates, tech) | `src/data/portfolio.json` → `experience` |
| Projects (category, tech, links, tile symbol) | `src/data/portfolio.json` → `projects` |
| Skills | `src/data/portfolio.json` → `skills` |
| All wording, in both languages | `src/locales/en.json` and `src/locales/es.json` |
| Colors | `src/theme.js` |

To **add a project**, add an entry under `projects` in `portfolio.json` with a new `id`, then add its `title` and `description` under `projects.items.<id>` in **both** locale files.

## Project structure

```
src/
  components/      UI: About window, sections, cards, nav, footer, WindowChrome (shared tab strip)
  hooks/           useProjectFilters, useActiveSection, useSectionNavigation, useLanguage, useThemeMode
  context/         Theme (light/dark) provider
  data/            portfolio.json (all content)
  locales/         en.json, es.json (all wording)
  test/            Test setup and helpers
  theme.js         MUI theme (palette, typography, component styles)
  i18n.js          i18next setup
public/            Résumé PDF
docs/adr/          Architecture decision record
```

## Testing

25 tests cover the parts with real logic:

- **`useProjectFilters`:** tag ordering, reading filters from the URL, "match any tag", writing filters back to the URL
- **`About`:** tab switching by mouse and keyboard, `#/contact` deep link, contact links, copy-to-clipboard, decorative controls hidden from screen readers
- **`skillIcons`:** icon lookup and fallback

```bash
npm run test:run
```

## Deployment

Hosted on **Vercel**, connected to this GitHub repo: every push to `main` deploys to production, and pull requests get preview URLs.

To set it up: **Vercel → Add New → Project → import this repo**. Vercel detects Vite automatically (build: `npm run build`, output: `dist`). No environment variables or server config are needed. Routing uses URL hashes, so there are no rewrite rules either.

The build uses a relative base path, so `dist/` also works on Netlify or GitHub Pages.

## AI-assisted workflow

I built this with **Claude Code** (Anthropic's coding assistant), running in VS Code, as a pair programmer. I made the product and design decisions, and the AI did most of the typing and checked its own work. Here's how that worked in practice.

**1. Decide before building.** Before writing any code, I asked what a portfolio like this should include and leave out. We captured the answers in an architecture decision record ([`docs/adr/portfolio.md`](docs/adr/portfolio.md)): what we're building, why, what's out of scope and which alternatives we rejected. When requirements changed (dark mode, Spanish, a dyslexia-friendly font, moving Contact into a tab), the ADR was updated first so the spec and the code stayed in sync.

**2. Build to the spec.** When a first attempt drifted from the ADR (a single HTML file instead of the React and MUI stack), I stopped it and asked for the ADR exactly. The scaffold, components, i18n and theming followed the ADR's implementation notes.

**3. Iterate on design with screenshots.** Most of the visual design came from a feedback loop: I shared screenshots of the running site and reference images I liked (retro pop-up windows, browser tab bars), and asked for changes ("make the tabs look like this", "the shadows are too sharp", "project cards look huge"). The AI suggested options and tradeoffs, and I picked. For example, it recommended against hiding contact info behind a tab; I chose the tab anyway, and we added always-visible contact icons in the footer to cover the risk.

**4. Real content, handled carefully.** I gave it my résumé PDF, and it pulled the data into `portfolio.json` and both locale files. It also:
- made a copy of the résumé with my phone number removed from the file itself (not just covered up) for the public download;
- found my live project links from my public GitHub repos;
- helped me rename two misspelled repos and update every link, keeping the old URLs working.

**5. Review passes.** I asked for an accessibility review (heading structure, alt text, link labels) and a design-cohesion critique, then had it apply the fixes I agreed with.

**6. Tests and verification.** The AI wrote the Vitest suite and fixed the test warnings at their source. It built the project after every change and checked the dev server, and it told me when something couldn't be verified without me looking at the page.

**What stayed with me:** every design choice, the tone (no "open to work" language, since I'm currently employed), the wording in both languages (including using the feminine *desarrolladora* in Spanish), what personal information is public, and anything that touched my accounts (GitHub repo renames, Vercel domains), which I did myself with the AI's step-by-step guidance.

**What I learned:** AI is fastest when the spec is written down first and feedback is concrete. A screenshot plus "this looks like it's floating" got better results than abstract descriptions. Asking for a recommendation, not just options, sped up decisions, but the final call stayed with me.
