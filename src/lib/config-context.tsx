"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteConfig } from "./site-config.types";

const SiteConfigContext = createContext<SiteConfig | null>(null);
const DemoBasePathContext = createContext<string>("");

export function useSiteConfig(): SiteConfig {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error("useSiteConfig must be used within SiteConfigProvider");
  return ctx;
}

/** Returns the base path prefix for demo routes (e.g. "/demo/cafe") or "" for the default template. */
export function useDemoBasePath(): string {
  return useContext(DemoBasePathContext);
}

export function SiteConfigProvider({
  config,
  basePath = "",
  children,
}: {
  config: SiteConfig;
  basePath?: string;
  children: ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      <DemoBasePathContext.Provider value={basePath}>
        {children}
      </DemoBasePathContext.Provider>
    </SiteConfigContext.Provider>
  );
}
