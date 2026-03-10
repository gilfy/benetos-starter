import type { SiteConfig } from "../../src/lib/site-config.types";

const agenturConfig: SiteConfig = {
  brand: {
    name: "NOIR Studio",
    tagline: "Branding & Digital Design",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
  },

  theme: {
    mode: "auto",
    light: {
      background: "#FAFAFA",
      surface: "#F0F0F0",
      border: "#E0E0E0",
      primary: "#0A0A0A",
      "primary-foreground": "#FFFFFF",
      accent: "#00D4FF",
      "accent-foreground": "#0A0A0A",
      text: "#0A0A0A",
      "text-secondary": "#525252",
      "text-muted": "#9CA3AF",
    },
    dark: {
      background: "#0A0A0A",
      surface: "#141414",
      border: "#262626",
      primary: "#00D4FF",
      "primary-foreground": "#0A0A0A",
      accent: "#00D4FF",
      "accent-foreground": "#0A0A0A",
      text: "#F5F5F5",
      "text-secondary": "#A3A3A3",
      "text-muted": "#525252",
    },
  },

  url: "https://demo.benetos.dev/demo/agentur",
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
      backgroundImage: "/demos/agentur/hero.jpg",
      ctaHref: "#services",
    },
    about: {
      enabled: true,
      image: "/demos/agentur/about.jpg",
    },
    services: {
      enabled: true,
      columns: 4,
    },
    gallery: {
      enabled: true,
      images: [
        "/demos/agentur/gallery/1.jpg",
        "/demos/agentur/gallery/2.jpg",
        "/demos/agentur/gallery/3.jpg",
        "/demos/agentur/gallery/4.jpg",
        "/demos/agentur/gallery/5.jpg",
        "/demos/agentur/gallery/6.jpg",
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
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.0!2d13.3888!3d52.5200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjMnMTkuNyJF!5e0!3m2!1sde!2sde!4v1",
      showForm: true,
    },
  },

  contact: {
    email: "hello@noir.studio",
    phone: "+49 30 987 6543",
    address: {
      street: "Torstraße 117",
      city: "Berlin",
      zip: "10119",
      country: "Deutschland",
    },
    openingHours: {
      "mo-fr": "09:00 – 18:00",
      sa: "Nach Vereinbarung",
      so: "Geschlossen",
    },
  },

  social: {
    instagram: "https://instagram.com/noirstudio",
    linkedin: "https://linkedin.com/company/noirstudio",
  },

  contactForm: {
    provider: "web3forms",
    apiKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
    fields: ["name", "email", "subject", "message"],
  },

  legal: {
    companyName: "NOIR Studio GmbH",
    representative: "Lena Schwarz",
    address: "Torstraße 117, 10119 Berlin",
    email: "hello@noir.studio",
    phone: "+49 30 987 6543",
    taxId: "DE301234567",
    vatId: "DE309876543",
    registerCourt: "Amtsgericht Berlin-Charlottenburg",
    registerNumber: "HRB 234567",
  },

  seo: {
    titleTemplate: "%s | NOIR Studio",
    defaultDescription:
      "NOIR Studio — Premium Branding & Digital Design aus Berlin.",
    ogImage: "/demos/agentur/og-image.png",
  },

  schemaOrg: {
    type: "ProfessionalService",
  },
};

export default agenturConfig;
