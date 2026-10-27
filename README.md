# Super Cleaners London — Enhanced Frontend Suite (6 Pages)

## 1. Original Files & Verified Backups (100% Untouched)

All 6 original HTML files in the project root remain byte-for-byte identical to their original state. Exact backups were verified via `shasum -a 256` and `cmp -s` in `backups/before-enhancement/`:

| Original File | Backup Copy | SHA-256 Checksum |
| :--- | :--- | :--- |
| `../v1.html` | `../backups/before-enhancement/v1.html` | `a9612e02c51e72ea20765e85370fa8d8bbd29e79b36e7b5c0e7ccc1e2350d52f` |
| `../v2.html` | `../backups/before-enhancement/v2.html` | `567d1a603f3b565014430cf8ec7b4ec36f464abf8aed41899766df5e7823c5fa` |
| `../commercial-v1.html` | `../backups/before-enhancement/commercial-v1.html` | `960774a899993f9f3abead4202d265c8c1e9190e8dfffce4128b4d1e0f343233` |
| `../commercial-v2.html` | `../backups/before-enhancement/commercial-v2.html` | `702c2865d22518eeeb5f1d2d22f34ab5e80d7013a27eeeff505b96e4fd01ac67` |
| `../domestic-v1.html` | `../backups/before-enhancement/domestic-v1.html` | `82535a489f9f3cc4eb3a510f05326478e6802d0f1b61cb7f00aa0acc5aa4e938` |
| `../domestic-v2.html` | `../backups/before-enhancement/domestic-v2.html` | `122e18691d5783637d63043635cffe3363cfab4404758c755aeee6a925b951a3` |

Previous snapshots of `v1-enhanced.html` and `v2-enhanced.html` before the 6-page expansion are also saved in `../backups/before-enhancement/v1-enhanced-prev.html` and `../backups/before-enhancement/v2-enhanced-prev.html`.

---

## 2. Enhanced Deliverables Overview

### Version 1 Suite — Light Editorial & Tactile Precision
- **`v1-enhanced.html`** — Main V1 Homepage (Editorial split hero, interactive Before/After slider, clickable London SVG map, services, reviews, FAQ)
- **`domestic-v1-enhanced.html`** — Domestic & Residential V1 Page (Editorial hero with floating badges, interactive Before/After transformation cards with category filtering, deep-dive service drawers, animated 4-step workflow, pricing calculator, FAQ)
- **`commercial-v1-enhanced.html`** — Commercial & B2B V1 Page (Architectural hero with ISO/COSHH floating badges, 6 sector cards with expandable compliance checklists, 4-step operational protocol, B2B quote calculator & tender form)

### Version 2 Suite — Dark Navy Cinematic & Glassmorphic Luxury
- **`v2-enhanced.html`** — Main V2 Homepage (Full-screen video hero with dual floating interactive cards, dark bento services grid, interactive London map, reviews, FAQ)
- **`domestic-v2-enhanced.html`** — Domestic & Residential V2 Page (Cinematic video hero with floating Eco-Pure & Vetted Staff glass cards, interactive Before/After showcase with category filters, 6 bento residential cards with expandable drawers, live price estimator & booking drawer)
- **`commercial-v2-enhanced.html`** — Commercial & B2B V2 Page (Cinematic corporate video hero with floating ISO & Night-Shift glass cards, 6 sector bento cards with expandable SLA specs, 4-step audit protocol, dark glassmorphic B2B quote & site audit form)

### Shared Architecture
- **`css/enhancements.css`** — Shared animation, scroll-float parallax, 3D card tilt, expandable drawer, Before/After comparison, and responsive rules.
- **`js/enhancements.js`** — Zero-dependency vanilla JS engine powering all scroll-reactive floating motion, 3D mouse-tracking tilt, interactive Before/After cards, pricing calculators, toast notifications, and accessible navigation.

---

## 3. Key Interactive & Scroll-Reactive Features Across All 6 Pages

1. **Continuous Ambient Bobbing + Scroll-Driven Parallax (`[data-scroll-float]`)**:
   - Floating badges and cards across Hero, Value Propositions, Services, About/Founder, Coverage Map, Team, Reviews, FAQ, and Quote CTA sections gently bob on screen and move smoothly along X/Y/Rotation axes as you scroll.
2. **3D Cursor-Tracking Card Tilt & Radial Spotlight (`[data-tilt-card]`)**:
   - Service cards, value proposition cards, team cards, review cards, and pricing tiers respond to mouse movement with subtle 3D perspective tilt and a radial spotlight glow.
3. **Interactive Hover & Click-to-Pin Expandable Drawers (`.scl-expand-drawer`)**:
   - Floating badges ("Hygiene Standard", "Eco-Friendly Care", "15-Mile M25 Dispatch", "COSHH & RAMS", etc.) and service cards expand smoothly on hover or click to reveal checklists, verification pills, and direct section jump links.
4. **Interactive Before/After Visual Comparisons (`[data-ba-card]`)**:
   - Domestic pages feature side-by-side Before/After cards with category filtering (`All`, `Kitchen & Oven`, `Bathrooms`, `Living & Carpet`) and click/hover spotlight zoom.
5. **Interactive Pricing Calculators & Validated Forms**:
   - Live property/facility price estimation sliders and dropdowns with animated counter updates and custom glassmorphic toast notifications.
