import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import siteConfig, { type ThemeColors } from "../../../site.config";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: siteConfig.seo.titleTemplate,
      default: siteConfig.brand.name,
    },
    description: siteConfig.seo.defaultDescription,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: siteConfig.brand.name,
      description: siteConfig.seo.defaultDescription,
      url: siteConfig.url,
      siteName: siteConfig.brand.name,
      images: [{ url: siteConfig.seo.ogImage }],
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: siteConfig.url,
      languages: { de: "/de", en: "/en" },
    },
  };
}

function buildCssVars(
  colors: ThemeColors
): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    vars[`--${key}`] = value;
  }
  return vars;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  const lightVars = buildCssVars(siteConfig.theme.light);
  const darkVars = buildCssVars(siteConfig.theme.dark);

  // Build inline style for theme injection
  const themeStyle: Record<string, string> = { ...lightVars };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {siteConfig.theme.mode === "auto" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function() {
  var dark = ${JSON.stringify(darkVars)};
  var light = ${JSON.stringify(lightVars)};
  var saved = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = saved === 'dark' || (!saved && prefersDark);
  var vars = isDark ? dark : light;
  var root = document.documentElement;
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  for (var key in vars) { root.style.setProperty(key, vars[key]); }
})();
              `.trim(),
            }}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} font-sans antialiased bg-background text-text`}
        style={siteConfig.theme.mode !== "auto" ? themeStyle : undefined}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
