"use client";

import { useTranslations, useLocale } from "next-intl";
import { Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { useSiteConfig, useDemoBasePath } from "@/lib/config-context";

const socialIcons: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

export default function Footer() {
  const siteConfig = useSiteConfig();
  const basePath = useDemoBasePath();
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const socialLinks = Object.entries(siteConfig.social).filter(
    ([, url]) => !!url
  );

  const legalBase = basePath ? `${basePath}/${locale}` : `/${locale}`;

  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-text">
              {siteConfig.brand.name}
            </h3>
            <p className="text-sm text-text-secondary">{t("description")}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-text uppercase tracking-wider">
              {t("links")}
            </h4>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {t(`nav.${item.labelKey.split(".")[1]}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-text uppercase tracking-wider">
              {t("legal")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`${legalBase}/impressum`}
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  {t("impressum")}
                </a>
              </li>
              <li>
                <a
                  href={`${legalBase}/datenschutz`}
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  {t("datenschutz")}
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socialLinks.map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:bg-surface hover:text-primary"
                      aria-label={platform}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-sm text-text-muted">
            &copy; {year} {siteConfig.brand.name}. {t("rights")}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {t("madeBy")}{" "}
            <a
              href="https://www.benetos.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:underline"
            >
              Benetos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
