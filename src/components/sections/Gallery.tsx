"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import siteConfig from "../../../site.config";

export default function Gallery() {
  const t = useTranslations("gallery");
  const { images, columns } = siteConfig.sections.gallery;

  const colsClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="gallery" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className={`grid gap-4 ${colsClass}`}>
          {images.map((src, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`${t("imageAlt")} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.round(100 / columns)}vw`}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
