"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import siteConfig from "../../../site.config";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={siteConfig.sections.about.image}
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text md:text-3xl">
                {t("heading")}
              </h3>
              <p className="text-lg leading-relaxed text-text-secondary">
                {t("text1")}
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                {t("text2")}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4 sm:grid-cols-3">
                {(["stat1", "stat2", "stat3"] as const).map((key) => (
                  <div key={key}>
                    <p className="text-3xl font-bold text-primary">
                      {t(`${key}.value`)}
                    </p>
                    <p className="text-sm text-text-muted">
                      {t(`${key}.label`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
