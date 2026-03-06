# benetos-starter

Config-driven Next.js website template by [Benetos](https://www.benetos.dev). Clone, configure, deploy.

## Quick Start

```bash
# Clone this template
gh repo create your-org/client-site --template gilfy/benetos-starter --private
cd client-site && npm install

# Configure
# 1. Edit site.config.ts — brand, colors, contact, legal, SEO
# 2. Edit messages/de.json and messages/en.json — all text content
# 3. Replace public/images/ and public/logo.svg
# 4. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env

# Develop
npm run dev

# Deploy
git push  # Vercel auto-deploys
```

## Tech Stack

- **Next.js 15** (App Router) + TypeScript 5 strict
- **Tailwind CSS v4** with CSS variable theming
- **Framer Motion** for scroll animations
- **next-intl v4** for DE/EN internationalization
- **Web3Forms** for contact form
- No database, no auth, no payments — purely static

## Architecture

### Config-Driven

`site.config.ts` controls everything structural: brand, theme colors, navigation items, section toggles, contact info, legal data, SEO, and schema.org markup.

### Content via i18n

All user-visible text lives in `messages/de.json` and `messages/en.json`. Structure mirrors sections: `nav.*`, `hero.*`, `about.*`, `services.items[]`, etc.

### Theming

1. `site.config.ts` defines light/dark color palettes
2. Locale layout injects colors as CSS custom properties
3. `globals.css` bridges CSS vars to Tailwind via `@theme inline`
4. Components use semantic classes: `bg-background`, `text-primary`, `border-border`
5. Auto mode: dark/light toggle via JS + localStorage

### Sections

Each section can be toggled via `sections.*.enabled` in the config:
- Hero, About, Services, Gallery, Testimonials, FAQ, Contact
- Footer + Cookie Consent always present

## File Structure

```
site.config.ts          # Central configuration
messages/               # DE + EN translations
public/images/          # Hero, about, gallery, OG image
src/
  app/[locale]/         # Pages (home, impressum, datenschutz)
  components/sections/  # Hero, About, Services, etc.
  components/ui/        # Navigation, CookieConsent, ScrollReveal
  i18n/                 # next-intl setup
  lib/schemas/          # Zod validation schemas
```

## License

Private template by Benetos.
