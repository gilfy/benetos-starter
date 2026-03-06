"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import siteConfig from "../../../site.config";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;

  const colsClass =
    siteConfig.sections.testimonials.columns === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="testimonials" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className={`grid gap-6 ${colsClass}`}>
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={
                        j < item.rating
                          ? "fill-accent text-accent"
                          : "text-border"
                      }
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-text-secondary italic leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-text">{item.name}</p>
                  <p className="text-sm text-text-muted">{item.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
