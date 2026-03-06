import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { SiteConfigProvider } from "@/lib/config-context";
import type { ThemeColors } from "@/lib/site-config.types";
import { getDemo, DEMO_IDS } from "@/lib/demo-registry";
import "../../../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return DEMO_IDS.flatMap((demoId) =>
    ["de", "en"].map((locale) => ({ demoId, locale }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ demoId: string; locale: string }>;
}): Promise<Metadata> {
  const { demoId, locale } = await params;
  const demo = await getDemo(demoId);
  if (!demo) return {};

  const { config } = demo;
  return {
    title: {
      template: config.seo.titleTemplate,
      default: config.brand.name,
    },
    description: config.seo.defaultDescription,
    metadataBase: new URL("https://demo.benetos.dev"),
    openGraph: {
      title: config.brand.name,
      description: config.seo.defaultDescription,
      url: config.url,
      siteName: config.brand.name,
      images: [{ url: config.seo.ogImage }],
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

function buildCssVars(colors: ThemeColors): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    vars[`--${key}`] = value;
  }
  return vars;
}

export default async function DemoLocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ demoId: string; locale: string }>;
}) {
  const { demoId, locale } = await params;
  if (!["de", "en"].includes(locale)) notFound();

  const demo = await getDemo(demoId);
  if (!demo) notFound();

  const { config, messages } = demo;
  const localeMessages = locale === "de" ? messages.de : messages.en;
  const lightVars = buildCssVars(config.theme.light);
  const darkVars = buildCssVars(config.theme.dark);
  const themeStyle: Record<string, string> = { ...lightVars };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {config.theme.mode === "auto" && (
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
        style={config.theme.mode !== "auto" ? themeStyle : undefined}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={localeMessages as Record<string, unknown> as never}
        >
          <SiteConfigProvider config={config} basePath={`/demo/${demoId}`}>
            {children}
          </SiteConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
