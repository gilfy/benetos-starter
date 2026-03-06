// ─── Site Configuration Types ──────────────────────────────────────────────
// Shared type definitions for site configuration.
// Used by site.config.ts (default) and demo configs.
// ───────────────────────────────────────────────────────────────────────────

export interface ThemeColors {
  background: string;
  surface: string;
  border: string;
  primary: string;
  "primary-foreground": string;
  accent: string;
  "accent-foreground": string;
  text: string;
  "text-secondary": string;
  "text-muted": string;
}

export interface NavItem {
  labelKey: string;
  href: string;
}

export interface SectionConfig {
  enabled: boolean;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline?: string;
    logo: string;
    favicon: string;
  };
  theme: {
    mode: "light" | "dark" | "auto";
    light: ThemeColors;
    dark: ThemeColors;
  };
  url: string;
  defaultLocale: "de" | "en";
  navigation: NavItem[];
  sections: {
    hero: SectionConfig & {
      backgroundImage: string;
      ctaHref: string;
    };
    about: SectionConfig & {
      image: string;
    };
    services: SectionConfig & {
      columns: 2 | 3 | 4;
    };
    gallery: SectionConfig & {
      images: string[];
      columns: 2 | 3 | 4;
    };
    testimonials: SectionConfig & {
      columns: 2 | 3;
    };
    faq: SectionConfig;
    contact: SectionConfig & {
      showMap: boolean;
      mapEmbedUrl?: string;
      showForm: boolean;
    };
  };
  contact: {
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      zip: string;
      country: string;
    };
    openingHours?: Record<string, string>;
  };
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  contactForm: {
    provider: "web3forms";
    apiKey: string;
    fields: ("name" | "email" | "phone" | "subject" | "message")[];
  };
  legal: {
    companyName: string;
    representative: string;
    address: string;
    email: string;
    phone?: string;
    taxId?: string;
    vatId?: string;
    registerCourt?: string;
    registerNumber?: string;
  };
  seo: {
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
  };
  schemaOrg: {
    type: string;
    priceRange?: string;
    cuisine?: string;
    servesCuisine?: string;
  };
}
