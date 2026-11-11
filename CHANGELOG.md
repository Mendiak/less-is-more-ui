# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A documentation section at `/docs/` with ten pages generated from the existing `docs/` and `references/` Markdown: overview, getting started, principles, typography, grid, components, responsive, animation, accessibility and anti-patterns.
- Four long-form notes: reduction as a test, the silent grid, colour as signal and the subtractive pass.
- Standalone pages for case studies, a Tailwind/Bootstrap comparison, an FAQ with `FAQPage` structured data, an about page and the changelog.
- `site/build.mjs`: a dependency-free static builder that renders the Markdown, generates `sitemap.xml`, `llms.txt` and `llms-full.txt`, and keeps navigation, breadcrumbs and pagination in one place. Run it with `npm run build`.
- `site/serve.mjs`: local preview mounted at the production base path (`npm run serve`).
- `site/assets/css/docs.css`: a documentation layout built on the same tokens, with prose styles, code blocks, tables, TOC and a responsive sidebar.
- `TechArticle`, `WebPage`, `BreadcrumbList` and `FAQPage` structured data for the new pages.
- Internal linking from the showcase to the documentation (navigation strip, hero index and footer) and back.
- Analytics events for code copies, FAQ opens, documentation navigation, section reads, scroll depth and theme changes.
- A GitHub Actions workflow that builds `_site/` and deploys it to Pages; generated HTML is no longer committed, so installing the skill does not download the website.

### Changed

- The website source moved to `site/`, and its build output to the git-ignored `_site/`. `style.css`, `docs.css` and `main.js` are site-only and no longer live under the published package paths.
- The showcase `<h1>` is now the product name, with "Museum of the Essential" as the eyebrow.
- Case Study 08 now uses longer copy and clearly different spacing and leading in each column, with the measurements labelled.
- SEO and discovery metadata: canonical URL, `robots` directives, richer Open Graph/Twitter cards and schema.org structured data (`WebSite`, `Person`, `SoftwareApplication`).
- `sitemap.xml`, `robots.txt` and a minimal `404.html` for GitHub Pages.
- Google Search Console verification, Google Tag Manager (including the `noscript` fallback) and a dependency-free event layer in `site/assets/js/main.js`: install copies, outbound clicks, navigation, section views, scroll depth and theme changes.

## [1.1.1] - 2026-10-23

### Fixed

- The `.content-block` showcase now draws the single vertical rule its copy describes; the previous version rendered a pair of horizontal rules.
- `assets/css/components.css` ships the same rule, so the published component matches the showcase.

## [1.1.0] - 2026-10-23

### Added

- Josef Müller-Brockmann profile in the Origins section, with a constructed-grid demo.
- `references/grid.md`: grid construction, spans, baseline rhythm and responsive column reduction.
- Case Study 08, "The Measured Layout" (baseline rhythm), on the showcase and in `references/case-studies.md`.
- Wikipedia links for all designer profiles.
- Section headers composed on a 12-column grid, with the intro aligned in the right-hand columns.
- An inverted Methodology chapter and an inverted footer for macro contrast.
- A distinct split layout for Jony Ive; Rams keeps the stacked landscape treatment.
- Installation command in the hero and an "Install" entry in both navigations.
- npm link in the footer.
- Skip link and `#main` landmark.
- `aria-current` on the active section, `aria-controls` on the mobile menu, Escape to close it, and `aria-pressed` on the theme toggle.
- `exports` and `sideEffects` in `package.json` for modern bundlers.
- Responsive 400w variants for every designer portrait (`srcset`).
- `prefers-reduced-motion` support.
- Grid-construction eval in `evals/evals.json`.

### Changed

- Dark-theme secondary text tokens raised to AA contrast (`--ui-text-muted`, `--ui-text-dim`).
- New `--ui-accent-ink` token for accent text on light backgrounds.
- Sticky-nav labels are larger on mobile; the active state uses black text on the accent background for AA contrast.
- `scroll-padding-top` now follows the sticky-nav height.
- Lucide pinned to `1.61.0` and deferred; Google Fonts trimmed to used weights.
- Section heading hierarchy corrected (`h2` → `h3` → `h4`); demo card names are no longer headings.
- Section titles scale up to 64px and designer names sit at 39px, with tighter proximity between a title and its content.
- Case studies are spaced on the grid (128px gap) instead of touching.
- Comparison demo boxes share a fixed minimum height, so both sides of a case study align.
- Code figures align to the content edge (the default `<figure>` margin was removed).
- The noisy examples keep a neutral solid frame; the dashed border and the redundant hover border were removed.
- The active navigation state is a red rule instead of a filled pill.
- Emoji removed from documentation and showcase copy.
- `docs/principles.md`, `docs/typography.md`, `docs/design-process.md`, `SKILL.md` and `README.md` updated with the grid theory.

### Fixed

- `.substractive-steps` renders as a three-step row again on desktop.
- Designer images no longer disappear in system dark mode.
- Buy Me a Coffee no longer requests the invalid `Arial` Google Font.
- Checkout demo labels and inputs are properly associated.
- Noisy demo tables and form labels are legible in dark mode.
- Color Restraint now puts the accent on the state ("Attention required"), not on a count.
- Theme and scroll-reveal content no longer flash on load.

## [1.0.0] - 2026-06-09

### Added

- Design tokens with typographic modular scale, spacing and neutral palette.
- Modernist CSS reset.
- Component patterns for buttons, forms, navigation and tables.
- Semantic CSS variables with dark/light theme support.
- "Museum of the Essential" showcase.
