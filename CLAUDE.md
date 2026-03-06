# benetos-starter — Config-Driven Website Template

## Tech Stack
- Next.js 15 (App Router), TypeScript 5 strict
- Tailwind CSS v4 (`@theme inline` + CSS variables)
- Framer Motion for animations
- next-intl v4 (DE/EN)
- Web3Forms for contact form
- Geist font
- No database, no auth, no payments — purely static/SSG

## Key Architecture
- `site.config.ts` is the central config — controls theme, sections, contact, legal, SEO
- All user-visible text in `messages/de.json` and `messages/en.json`
- Theme colors injected as CSS custom properties on `<html>`, bridged to Tailwind via `@theme inline`
- Sections conditionally rendered based on `sections.*.enabled` flags

## Build
```bash
npm run build
```

## Client Onboarding
1. Clone this template repo
2. Edit `site.config.ts` (brand, colors, contact, legal)
3. Edit `messages/*.json` (all text content)
4. Replace `public/images/` + `public/logo.svg`
5. Set `NEXT_PUBLIC_WEB3FORMS_KEY` env var
6. Deploy to Vercel
