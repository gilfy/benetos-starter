// ─── Site Configuration ──────────────────────────────────────────────────────
// Edit this file to customize everything about your website.
// All user-visible text goes in messages/*.json — this file controls structure,
// theme, features, and business data.
// ─────────────────────────────────────────────────────────────────────────────

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

// ─── Demo: Café Milano ───────────────────────────────────────────────────────

const siteConfig: SiteConfig = {
  brand: {
    name: "Café Milano",
    tagline: "Authentic Italian Coffee & Cuisine",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
  },

  theme: {
    mode: "auto",
    light: {
      background: "#FAFAF8",
      surface: "#F5F0EB",
      border: "#E8DDD1",
      primary: "#8B5E3C",
      "primary-foreground": "#FFFFFF",
      accent: "#C8956C",
      "accent-foreground": "#FFFFFF",
      text: "#2D1B0E",
      "text-secondary": "#6B5744",
      "text-muted": "#9A8B7A",
    },
    dark: {
      background: "#1A1410",
      surface: "#2A2118",
      border: "#3D3228",
      primary: "#C8956C",
      "primary-foreground": "#1A1410",
      accent: "#D4A87C",
      "accent-foreground": "#1A1410",
      text: "#F5F0EB",
      "text-secondary": "#B8A99A",
      "text-muted": "#7A6E62",
    },
  },

  url: "https://demo.benetos.dev",
  defaultLocale: "de",

  navigation: [
    { labelKey: "nav.about", href: "#about" },
    { labelKey: "nav.menu", href: "#services" },
    { labelKey: "nav.gallery", href: "#gallery" },
    { labelKey: "nav.contact", href: "#contact" },
  ],

  sections: {
    hero: {
      enabled: true,
      backgroundImage: "/images/hero.jpg",
      ctaHref: "#services",
    },
    about: {
      enabled: true,
      image: "/images/about.jpg",
    },
    services: {
      enabled: true,
      columns: 4,
    },
    gallery: {
      enabled: true,
      images: [
        "/images/gallery/1.jpg",
        "/images/gallery/2.jpg",
        "/images/gallery/3.jpg",
        "/images/gallery/4.jpg",
        "/images/gallery/5.jpg",
        "/images/gallery/6.jpg",
      ],
      columns: 3,
    },
    testimonials: {
      enabled: true,
      columns: 3,
    },
    faq: {
      enabled: true,
    },
    contact: {
      enabled: true,
      showMap: true,
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.5!2d9.7320!3d52.3759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIyJzMzLjMiTiA5wrA0Myc1NS4yIkU!5e0!3m2!1sde!2sde!4v1",
      showForm: true,
    },
  },

  contact: {
    email: "info@cafe-milano.de",
    phone: "+49 511 123 4567",
    address: {
      street: "Lister Meile 42",
      city: "Hannover",
      zip: "30161",
      country: "Deutschland",
    },
    openingHours: {
      "mo-fr": "08:00 – 22:00",
      sa: "09:00 – 23:00",
      so: "10:00 – 21:00",
    },
  },

  social: {
    instagram: "https://instagram.com/cafemilano",
    facebook: "https://facebook.com/cafemilano",
  },

  contactForm: {
    provider: "web3forms",
    apiKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
    fields: ["name", "email", "phone", "subject", "message"],
  },

  legal: {
    companyName: "Café Milano GmbH",
    representative: "Marco Rossi",
    address: "Lister Meile 42, 30161 Hannover",
    email: "info@cafe-milano.de",
    phone: "+49 511 123 4567",
    taxId: "DE123456789",
    vatId: "DE987654321",
    registerCourt: "Amtsgericht Hannover",
    registerNumber: "HRB 12345",
  },

  seo: {
    titleTemplate: "%s | Café Milano",
    defaultDescription:
      "Café Milano — Authentischer italienischer Kaffee und Küche in Hannover. Besuchen Sie uns für erstklassigen Espresso, hausgemachte Pasta und köstliche Dolci.",
    ogImage: "/images/og-image.png",
  },

  schemaOrg: {
    type: "Restaurant",
    priceRange: "€€",
    cuisine: "Italian",
    servesCuisine: "Italian",
  },
};

export default siteConfig;
