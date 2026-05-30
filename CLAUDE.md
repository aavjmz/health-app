# CLAUDE.md — Health App Codebase Guide

## Project Overview

**免疫力健康管理平台** (Immunity Health Management Platform) is a static, zero-dependency single-page application that assesses a user's Traditional Chinese Medicine (TCM) body constitution via a 16-question quiz and delivers a personalized 90-day health improvement report.

- **Stack:** Vanilla HTML5, CSS3, JavaScript (ES6+) — no build tools, no npm, no framework
- **Deployment:** Vercel (static hosting, `cleanUrls: true`, no trailing slashes)
- **Languages supported:** 10 (zh-CN, zh-TW, en, ja, ko, es, fr, de, pt, ar)

---

## Repository Structure

```
health-app/
├── index.html      # Questionnaire page (quiz UI + scoring logic)
├── report.html     # Results/report page (personalized health plan)
├── i18n.js         # All data, translations, and language utilities
├── vercel.json     # Vercel deployment config
└── README.md       # Short project overview (Chinese)
```

There are **no build steps, no package.json, and no test runner**. Open `index.html` directly in a browser for local development.

---

## Architecture

```
index.html  ──(URL params)──►  report.html
    │                               │
    └──────── i18n.js ──────────────┘
```

### index.html — Questionnaire
- Renders 2 demographic questions followed by 2 questions per constitution (8 types = 16 questions).
- Manages state in plain JS variables: `step` (current page), `answers` (quiz responses), `basic` (demographics).
- **Scoring formula:** `(sum of answers for type) / (questions × 3) × 100` → 0–100%
- On completion, encodes results as URL query parameters and navigates to `report.html`.

**URL params passed to report.html:**
| Param | Description |
|-------|-------------|
| `c`   | Primary constitution ID (e.g. `qiXu`) |
| `c2`  | Secondary constitution ID (if score ≥ 35%) |
| `age` | Age group index |
| `ls`  | Lifestyle index |
| `s`   | Comma-separated scores for all 8 types |
| `syms`| Comma-separated answered symptom indices |
| `lang`| Active language code |

### report.html — Results Page
- Parses URL params with `getParams()`.
- Renders 8 sections: hero (SVG circular score arc), symptom reflection, TCM + Western dual analysis, 90-day roadmap, action cards, secondary constitution note, 8-dimension score chart, share/print bar.
- Contains `REPORT_DB`: large inline object with per-constitution content (tagline, TCM/West mechanisms, symptoms, 3-phase timeline, quick actions). Content exists in `zh-CN` and `en`; other languages fall back to `en`.

### i18n.js — Data & Language Layer
All shared data lives here. Key exports (assigned to `window`):
- `detectLang()` / `getLang()` / `setLang(code)` — language management with `localStorage` persistence
- `t(key)` — translation lookup for UI strings
- `renderLangSwitcher()` — returns HTML for the language dropdown
- `getBasic()`, `getOpts()`, `getConsts()`, `getDet()` — data accessors

**Constitution IDs (8 types):**
| ID | Name | Icon |
|----|------|------|
| `qiXu` | Qi Deficiency | 🌿 |
| `yangXu` | Yang Deficiency | ❄️ |
| `yinXu` | Yin Deficiency | 🔥 |
| `tanShi` | Phlegm-Dampness | 💧 |
| `shiRe` | Damp-Heat | ☀️ |
| `xueYu` | Blood Stasis | 🌸 |
| `qiYu` | Qi Stagnation | 🌙 |
| `teBing` | Allergic Constitution | ⚡ |

---

## Key Data Schemas

### Constitution object (from `getConsts()`)
```js
{
  id: string,       // e.g. "qiXu"
  name: string,     // localized display name
  color: string,    // hex color for theming
  light: string,    // light background hex
  icon: string,     // emoji
  sum: string,      // TCM summary (localized)
  west: string,     // Western medicine summary (localized)
  qs: string[]      // 2 quiz questions (localized)
}
```

### Detailed analysis object (from `getDet()`)
```js
{
  risk: string,    // risk level label
  rc: string,      // risk color hex
  desc: string,    // long description (localized)
  ex: string[],    // 3 exercise recommendations
  di: string[],    // 3 dietary recommendations
  li: string[]     // 3 lifestyle recommendations
}
```

---

## Development Workflows

### Local development
```bash
# No setup required — just open the file
open index.html
# or serve with any static file server:
python3 -m http.server 8080
```

### Adding a new language
1. Add the language code to the `LANGS` array in `i18n.js`.
2. Add a translation block for every key inside `UI` for the new code.
3. Translate all `name`, `sum`, `west`, `qs` strings inside `CONSTS_DATA`.
4. Translate all `desc`, `ex`, `di`, `li` strings inside `DET_DATA`.
5. For report content, add the language key alongside `zh-CN`/`en` in `REPORT_DB` entries, or rely on the `en` fallback.
6. Add the language to `renderLangSwitcher()` display list.

### Adding a new constitution type
1. Add an entry to `CONSTS_DATA` in `i18n.js` for each supported language.
2. Add a corresponding entry to `DET_DATA` in `i18n.js`.
3. Add a `REPORT_DB` entry in `report.html` with `tagline`, `tcmMech`, `westMech`, `symptoms`, `phases`, and `actions`.
4. Update `getTOTAL()` in `index.html` if the step count changes.
5. Update the score-bar rendering loop in `report.html` to include the new type.

### Deployment
- Push to `main` on GitHub — Vercel auto-deploys.
- No build step; the repo files are served as-is.

---

## Conventions

### Styling
- All CSS is embedded in `<style>` tags inside each HTML file (no external stylesheets).
- CSS custom properties (variables) are defined at `:root` for colors and shadows.
- Mobile-first with media query breakpoints at 420px, 440px, 480px, and 500px.
- RTL support is handled via `[dir="rtl"]` selectors for Arabic.

### JavaScript
- Plain ES6+ (no modules, no transpilation). Everything is on `window` or inline.
- No external JS libraries — all utilities are hand-rolled.
- DOM manipulation is done by setting `innerHTML` on container elements.
- Language preference is stored in `localStorage` under the key `lang`.

### Translations / copy
- All user-visible strings must go through `t(key)` or a localized field — never hardcode English-only text in the rendering path.
- `report.html` uses `getLocalizedField(obj, fieldName, lang)` with automatic `en` fallback for fields not yet translated.

### No tests
There is no automated test suite. Validate changes manually in at least Chrome/Safari and check a few language variants.

---

## Monetization

Both HTML files load Google AdSense:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4136658490563590" crossorigin="anonymous"></script>
```
Do not remove or alter this script tag without explicit instruction.

---

## Common Pitfalls

- **Shared data vs. page-specific data:** `i18n.js` holds everything shared between the two pages. Page-specific content (especially the detailed `REPORT_DB`) lives inline in `report.html` to avoid a large initial load on the quiz page.
- **URL param encoding:** Scores and symptom indices are comma-separated strings, not JSON. When reading them back in `report.html`, split by `,` and parse as numbers.
- **Language fallback in report.html:** `getLocalizedField()` tries the active language first, then `en`. If you add content only in `zh-CN`, English users will see nothing.
- **No server-side logic:** All computation is client-side. There is no API, no database, and no user accounts.
