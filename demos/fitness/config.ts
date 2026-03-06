import type { SiteConfig } from "../../src/lib/site-config.types";

const fitnessConfig: SiteConfig = {
  brand: {
    name: "FitZone Studio",
    tagline: "Your Body. Your Strength. Your Studio.",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
  },

  theme: {
    mode: "auto",
    light: {
      background: "#F8FAFC",
      surface: "#F1F5F9",
      border: "#E2E8F0",
      primary: "#4F46E5",
      "primary-foreground": "#FFFFFF",
      accent: "#10B981",
      "accent-foreground": "#FFFFFF",
      text: "#0F172A",
      "text-secondary": "#475569",
      "text-muted": "#94A3B8",
    },
    dark: {
      background: "#0F172A",
      surface: "#1E293B",
      border: "#334155",
      primary: "#818CF8",
      "primary-foreground": "#0F172A",
      accent: "#34D399",
      "accent-foreground": "#0F172A",
      text: "#F8FAFC",
      "text-secondary": "#CBD5E1",
      "text-muted": "#64748B",
    },
  },

  url: "https://demo.benetos.dev/demo/fitness",
  defaultLocale: "de",

  navigation: [
    { labelKey: "nav.about", href: "#about" },
    { labelKey: "nav.courses", href: "#services" },
    { labelKey: "nav.gallery", href: "#gallery" },
    { labelKey: "nav.contact", href: "#contact" },
  ],

  sections: {
    hero: {
      enabled: true,
      backgroundImage: "/demos/fitness/hero.jpg",
      ctaHref: "#services",
    },
    about: {
      enabled: true,
      image: "/demos/fitness/about.jpg",
    },
    services: {
      enabled: true,
      columns: 4,
    },
    gallery: {
      enabled: true,
      images: [
        "/demos/fitness/gallery/1.jpg",
        "/demos/fitness/gallery/2.jpg",
        "/demos/fitness/gallery/3.jpg",
        "/demos/fitness/gallery/4.jpg",
        "/demos/fitness/gallery/5.jpg",
        "/demos/fitness/gallery/6.jpg",
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
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.5!2d9.9937!3d53.5511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDMzJzA0LjAiTiA5wrA1OSczNi4xIkU!5e0!3m2!1sde!2sde!4v1",
      showForm: true,
    },
  },

  contact: {
    email: "info@fitzone-studio.de",
    phone: "+49 40 987 6543",
    address: {
      street: "Schanzenviertel 18",
      city: "Hamburg",
      zip: "20357",
      country: "Deutschland",
    },
    openingHours: {
      "mo-fr": "06:00 – 22:00",
      sa: "08:00 – 20:00",
      so: "09:00 – 18:00",
    },
  },

  social: {
    instagram: "https://instagram.com/fitzonestudio",
    youtube: "https://youtube.com/@fitzonestudio",
  },

  contactForm: {
    provider: "web3forms",
    apiKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
    fields: ["name", "email", "phone", "subject", "message"],
  },

  legal: {
    companyName: "FitZone Studio GmbH",
    representative: "Lisa Bergmann",
    address: "Schanzenviertel 18, 20357 Hamburg",
    email: "info@fitzone-studio.de",
    phone: "+49 40 987 6543",
    taxId: "DE234567890",
    vatId: "DE876543210",
    registerCourt: "Amtsgericht Hamburg",
    registerNumber: "HRB 67890",
  },

  seo: {
    titleTemplate: "%s | FitZone Studio",
    defaultDescription:
      "FitZone Studio — Yoga, HIIT, Personal Training und Gruppenkurse in Hamburg. Finde deine Stärke.",
    ogImage: "/demos/fitness/og-image.png",
  },

  schemaOrg: {
    type: "SportsActivityLocation",
    priceRange: "€€",
  },
};

export default fitnessConfig;
