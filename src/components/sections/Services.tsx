"use client";

import { useTranslations } from "next-intl";
import {
  Coffee,
  UtensilsCrossed,
  CakeSlice,
  Wine,
  Dumbbell,
  Heart,
  Users,
  Flame,
  Hammer,
  Home,
  Wrench,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSiteConfig } from "@/lib/config-context";

const iconMap: Record<string, LucideIcon> = {
  Coffee,
  UtensilsCrossed,
  CakeSlice,
  Wine,
  Dumbbell,
  Heart,
  Users,
  Flame,
  Hammer,
  Home,
  Wrench,
  TreePine,
};

export default function Services() {
  const siteConfig = useSiteConfig();
  const t = useTranslations("services");
  const items = t.raw("items") as Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;

  const colsClass =
    siteConfig.sections.services.columns === 2
      ? "sm:grid-cols-2"
      : siteConfig.sections.services.columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section id="services" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className={`grid gap-6 ${colsClass}`}>
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || Coffee;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group h-full rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-text">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-text-secondary">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-text-muted"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
