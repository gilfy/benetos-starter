import { defineRouting } from "next-intl/routing";
import siteConfig from "../../site.config";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: siteConfig.defaultLocale,
});
