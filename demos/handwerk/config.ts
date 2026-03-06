import type { SiteConfig } from "../../src/lib/site-config.types";

const handwerkConfig: SiteConfig = {
  brand: {
    name: "Meister Holz",
    tagline: "Handwerk mit Herz und Präzision",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
  },

  theme: {
    mode: "auto",
    light: {
      background: "#FFFBEB",
      surface: "#FEF3C7",
      border: "#FDE68A",
      primary: "#B45309",
      "primary-foreground": "#FFFFFF",
      accent: "#D97706",
      "accent-foreground": "#FFFFFF",
      text: "#451A03",
      "text-secondary": "#78350F",
      "text-muted": "#A16207",
    },
    dark: {
      background: "#1C1307",
      surface: "#2D1F0E",
      border: "#3D2E1A",
      primary: "#F59E0B",
      "primary-foreground": "#1C1307",
      accent: "#FBBF24",
      "accent-foreground": "#1C1307",
      text: "#FEF3C7",
      "text-secondary": "#D4A44E",
      "text-muted": "#8B6914",
    },
  },

  url: "https://demo.benetos.dev/demo/handwerk",
  defaultLocale: "de",

  navigation: [
    { labelKey: "nav.about", href: "#about" },
    { labelKey: "nav.services", href: "#services" },
    { labelKey: "nav.gallery", href: "#gallery" },
    { labelKey: "nav.contact", href: "#contact" },
  ],

  sections: {
    hero: {
      enabled: true,
      backgroundImage: "/demos/handwerk/hero.jpg",
      ctaHref: "#services",
    },
    about: {
      enabled: true,
      image: "/demos/handwerk/about.jpg",
    },
    services: {
      enabled: true,
      columns: 4,
    },
    gallery: {
      enabled: true,
      images: [
        "/demos/handwerk/gallery/1.jpg",
        "/demos/handwerk/gallery/2.jpg",
        "/demos/handwerk/gallery/3.jpg",
        "/demos/handwerk/gallery/4.jpg",
        "/demos/handwerk/gallery/5.jpg",
        "/demos/handwerk/gallery/6.jpg",
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
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5!2d11.5820!3d48.1351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDA4JzA2LjQiTiAxMcKwMzQnNTUuMiJF!5e0!3m2!1sde!2sde!4v1",
      showForm: true,
    },
  },

  contact: {
    email: "info@meister-holz.de",
    phone: "+49 89 456 7890",
    address: {
      street: "Handwerkerstraße 7",
      city: "München",
      zip: "80469",
      country: "Deutschland",
    },
    openingHours: {
      "mo-fr": "07:00 – 18:00",
      sa: "08:00 – 14:00",
    },
  },

  social: {
    instagram: "https://instagram.com/meisterholz",
    facebook: "https://facebook.com/meisterholz",
  },

  contactForm: {
    provider: "web3forms",
    apiKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
    fields: ["name", "email", "phone", "subject", "message"],
  },

  legal: {
    companyName: "Meister Holz GmbH",
    representative: "Stefan Zimmermann",
    address: "Handwerkerstraße 7, 80469 München",
    email: "info@meister-holz.de",
    phone: "+49 89 456 7890",
    taxId: "DE345678901",
    vatId: "DE765432109",
    registerCourt: "Amtsgericht München",
    registerNumber: "HRB 54321",
  },

  seo: {
    titleTemplate: "%s | Meister Holz",
    defaultDescription:
      "Meister Holz — Tischlerei und Möbelmanufaktur in München. Maßgefertigte Möbel, Renovierungen und Holzarbeiten vom Meisterbetrieb.",
    ogImage: "/demos/handwerk/og-image.png",
  },

  schemaOrg: {
    type: "HomeAndConstructionBusiness",
    priceRange: "€€€",
  },
};

export default handwerkConfig;
