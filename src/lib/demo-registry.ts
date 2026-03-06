import type { SiteConfig } from "./site-config.types";

export interface DemoMeta {
  id: string;
  name: string;
  description: { de: string; en: string };
  previewImage: string;
  colorSwatches: [string, string]; // [primary, accent]
}

export interface DemoEntry {
  config: SiteConfig;
  messages: { de: Record<string, unknown>; en: Record<string, unknown> };
  meta: DemoMeta;
}

// Lazy-loaded demo entries
const demoLoaders: Record<string, () => Promise<DemoEntry>> = {
  cafe: async () => {
    const { default: config } = await import("../../demos/cafe/config");
    const de = (await import("../../demos/cafe/messages/de.json")).default;
    const en = (await import("../../demos/cafe/messages/en.json")).default;
    return {
      config,
      messages: { de, en },
      meta: {
        id: "cafe",
        name: "Café Milano",
        description: {
          de: "Italienisches Café & Restaurant in Hannover",
          en: "Italian café & restaurant in Hannover",
        },
        previewImage: "/demos/cafe/hero.jpg",
        colorSwatches: ["#8B5E3C", "#C8956C"],
      },
    };
  },
  fitness: async () => {
    const { default: config } = await import("../../demos/fitness/config");
    const de = (await import("../../demos/fitness/messages/de.json")).default;
    const en = (await import("../../demos/fitness/messages/en.json")).default;
    return {
      config,
      messages: { de, en },
      meta: {
        id: "fitness",
        name: "FitZone Studio",
        description: {
          de: "Yoga, HIIT & Personal Training in Hamburg",
          en: "Yoga, HIIT & personal training in Hamburg",
        },
        previewImage: "/demos/fitness/hero.jpg",
        colorSwatches: ["#4F46E5", "#10B981"],
      },
    };
  },
  handwerk: async () => {
    const { default: config } = await import("../../demos/handwerk/config");
    const de = (await import("../../demos/handwerk/messages/de.json")).default;
    const en = (await import("../../demos/handwerk/messages/en.json")).default;
    return {
      config,
      messages: { de, en },
      meta: {
        id: "handwerk",
        name: "Meister Holz",
        description: {
          de: "Tischlerei & Möbelmanufaktur in München",
          en: "Carpentry & custom furniture in Munich",
        },
        previewImage: "/demos/handwerk/hero.jpg",
        colorSwatches: ["#B45309", "#D97706"],
      },
    };
  },
};

export const DEMO_IDS = Object.keys(demoLoaders);

export async function getDemo(id: string): Promise<DemoEntry | null> {
  const loader = demoLoaders[id];
  if (!loader) return null;
  return loader();
}

export function getDemoMetas(): DemoMeta[] {
  return [
    {
      id: "cafe",
      name: "Café Milano",
      description: {
        de: "Italienisches Café & Restaurant in Hannover",
        en: "Italian café & restaurant in Hannover",
      },
      previewImage: "/demos/cafe/hero.jpg",
      colorSwatches: ["#8B5E3C", "#C8956C"],
    },
    {
      id: "fitness",
      name: "FitZone Studio",
      description: {
        de: "Yoga, HIIT & Personal Training in Hamburg",
        en: "Yoga, HIIT & personal training in Hamburg",
      },
      previewImage: "/demos/fitness/hero.jpg",
      colorSwatches: ["#4F46E5", "#10B981"],
    },
    {
      id: "handwerk",
      name: "Meister Holz",
      description: {
        de: "Tischlerei & Möbelmanufaktur in München",
        en: "Carpentry & custom furniture in Munich",
      },
      previewImage: "/demos/handwerk/hero.jpg",
      colorSwatches: ["#B45309", "#D97706"],
    },
  ];
}
