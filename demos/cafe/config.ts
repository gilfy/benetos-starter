import type { SiteConfig } from "../../src/lib/site-config.types";

const cafeConfig: SiteConfig = {
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

  url: "https://demo.benetos.dev/demo/cafe",
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
      backgroundImage: "/demos/cafe/hero.jpg",
      ctaHref: "#services",
    },
    about: {
      enabled: true,
      image: "/demos/cafe/about.jpg",
    },
    services: {
      enabled: true,
      columns: 4,
    },
    gallery: {
      enabled: true,
      images: [
        "/demos/cafe/gallery/1.jpg",
        "/demos/cafe/gallery/2.jpg",
        "/demos/cafe/gallery/3.jpg",
        "/demos/cafe/gallery/4.jpg",
        "/demos/cafe/gallery/5.jpg",
        "/demos/cafe/gallery/6.jpg",
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
      "Café Milano — Authentischer italienischer Kaffee und Küche in Hannover.",
    ogImage: "/demos/cafe/og-image.png",
  },

  schemaOrg: {
    type: "Restaurant",
    priceRange: "€€",
    cuisine: "Italian",
    servesCuisine: "Italian",
  },
};

export default cafeConfig;
