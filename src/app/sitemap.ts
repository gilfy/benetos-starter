import type { MetadataRoute } from "next";
import siteConfig from "../../site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["de", "en"];
  const routes = ["", "/impressum", "/datenschutz"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.5,
    }))
  );
}
