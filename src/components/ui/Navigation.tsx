"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "../../../site.config";

const emptySubscribe = () => () => {};

function useInitialTheme(): "light" | "dark" {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      if (siteConfig.theme.mode !== "auto") return "light";
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    },
    () => "light" as const
  );
}

export default function Navigation() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const initialTheme = useInitialTheme();
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    const colors =
      next === "dark" ? siteConfig.theme.dark : siteConfig.theme.light;
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    for (const [key, value] of Object.entries(colors)) {
      root.style.setProperty(`--${key}`, value);
    }
  };

  const switchLocale = () => {
    const next = locale === "de" ? "en" : "de";
    router.replace(pathname, { locale: next });
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href={`/${locale}`}
          className="text-xl font-bold text-text transition-colors hover:text-primary"
        >
          {siteConfig.brand.name}
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              {t(item.labelKey)}
            </a>
          ))}

          {/* Lang Toggle */}
          <button
            onClick={switchLocale}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary uppercase transition-colors hover:bg-surface hover:text-text"
          >
            {locale === "de" ? "EN" : "DE"}
          </button>

          {/* Theme Toggle */}
          {siteConfig.theme.mode === "auto" && (
            <button
              onClick={toggleTheme}
              className="rounded-lg border border-border p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-text md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-text-secondary transition-colors hover:text-primary"
                >
                  {t(item.labelKey)}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={switchLocale}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary uppercase transition-colors hover:bg-surface"
                >
                  {locale === "de" ? "EN" : "DE"}
                </button>
                {siteConfig.theme.mode === "auto" && (
                  <button
                    onClick={toggleTheme}
                    className="rounded-lg border border-border p-2 text-text-secondary transition-colors hover:bg-surface"
                    aria-label="Toggle theme"
                  >
                    {theme === "light" ? (
                      <Moon size={16} />
                    ) : (
                      <Sun size={16} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
