import type { MetadataRoute } from "next";
import siteConfig from "../../site.config";
import { DEMO_IDS } from "@/lib/demo-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["de", "en"];
  const routes = ["", "/impressum", "/datenschutz"];

  // Default template routes
  const templateRoutes = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.5,
    }))
  );

  // Demo chooser
  const demoChooser = [
    {
      url: `${siteConfig.url}/demo`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ];

  // Demo routes
  const demoRoutes = DEMO_IDS.flatMap((demoId) =>
    locales.flatMap((locale) =>
      routes.map((route) => ({
        url: `${siteConfig.url}/demo/${demoId}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 0.8 : 0.4,
      }))
    )
  );

  return [...templateRoutes, ...demoChooser, ...demoRoutes];
}
