"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSiteConfig, useDemoBasePath } from "@/lib/config-context";

const SHOWCASE_IMAGES = [
  "/demos/agentur/showcase/1.jpg",
  "/demos/agentur/showcase/2.jpg",
  "/demos/agentur/showcase/3.jpg",
  "/demos/agentur/showcase/4.jpg",
  "/demos/agentur/showcase/5.jpg",
];

/* ─── Hero ──────────────────────────────────────────────────────────────────── */

function HeroSection() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      <motion.div style={{ opacity, y }} className="text-center z-10 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase text-[#00D4FF] mb-6 font-medium"
        >
          {t("tagline")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter text-white"
        >
          NOIR
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-lg md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Scroll Image Showcase ─────────────────────────────────────────────────── */

function ScrollShowcase() {
  const t = useTranslations("showcase");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const labels = [
    t("labels.0"),
    t("labels.1"),
    t("labels.2"),
    t("labels.3"),
    t("labels.4"),
  ];

  // Each image occupies ~20% of the scroll range
  // Crossfade: image fades in, holds, fades out
  const ranges = SHOWCASE_IMAGES.map((_, i) => {
    const segmentSize = 1 / SHOWCASE_IMAGES.length;
    const start = i * segmentSize;
    const end = start + segmentSize;
    return { start, end };
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0A]">
        {SHOWCASE_IMAGES.map((src, i) => {
          const { start, end } = ranges[i];
          const fadeIn = start;
          const holdStart = start + 0.04;
          const holdEnd = end - 0.04;
          const fadeOut = end;

          return (
            <ShowcaseImage
              key={i}
              src={src}
              label={labels[i]}
              index={i}
              scrollYProgress={scrollYProgress}
              fadeIn={fadeIn}
              holdStart={holdStart}
              holdEnd={holdEnd}
              fadeOut={fadeOut}
              isFirst={i === 0}
              isLast={i === SHOWCASE_IMAGES.length - 1}
            />
          );
        })}

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-neutral-800 rounded-full overflow-hidden z-20"
        >
          <motion.div
            className="h-full bg-[#00D4FF] origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function ShowcaseImage({
  src,
  label,
  index,
  scrollYProgress,
  fadeIn,
  holdStart,
  holdEnd,
  fadeOut,
  isFirst,
  isLast,
}: {
  src: string;
  label: string;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  fadeIn: number;
  holdStart: number;
  holdEnd: number;
  fadeOut: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [holdEnd, fadeOut]
      : isLast
        ? [fadeIn, holdStart]
        : [fadeIn, holdStart, holdEnd, fadeOut],
    isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [fadeIn, fadeOut],
    [1.0, 1.08]
  );

  const labelOpacity = useTransform(
    scrollYProgress,
    isFirst
      ? [fadeIn, fadeIn + 0.02, holdEnd - 0.02, fadeOut]
      : isLast
        ? [fadeIn, holdStart, holdEnd, holdEnd + 0.01]
        : [fadeIn, holdStart, holdEnd, fadeOut],
    isFirst
      ? [1, 1, 1, 0]
      : isLast
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );

  const labelY = useTransform(
    scrollYProgress,
    [fadeIn, holdStart],
    [30, 0]
  );

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0"
        style={{ opacity, scale }}
      >
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ opacity: labelOpacity }}
      >
        <motion.div style={{ y: labelY }} className="text-center">
          <span className="text-sm tracking-[0.3em] uppercase text-[#00D4FF] block mb-4">
            0{index + 1}
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            {label}
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Services ──────────────────────────────────────────────────────────────── */

function ServicesSection() {
  const t = useTranslations("services");
  const items = t.raw("items") as Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;

  return (
    <section className="py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <FadeInView>
          <p className="text-sm tracking-[0.3em] uppercase text-[#00D4FF] mb-4">
            {t("title")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {t("subtitle")}
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {items.map((item, i) => (
            <FadeInView key={i} delay={i * 0.1}>
              <div className="group p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-[#00D4FF]/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center mb-6">
                  <ServiceIcon name={item.icon} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-neutral-500">
                      <span className="w-1 h-1 rounded-full bg-[#00D4FF]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const className = "w-6 h-6 text-[#00D4FF]";
  switch (name) {
    case "Palette":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      );
    case "Monitor":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
        </svg>
      );
    case "Layers":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>
      );
    case "Video":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      );
  }
}

/* ─── Testimonials ──────────────────────────────────────────────────────────── */

function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;

  return (
    <section className="py-32 px-6 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <FadeInView>
          <p className="text-sm tracking-[0.3em] uppercase text-[#00D4FF] mb-4">
            {t("title")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {t("subtitle")}
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {items.map((item, i) => (
            <FadeInView key={i} delay={i * 0.15}>
              <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#00D4FF]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-300 leading-relaxed mb-6 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-sm text-neutral-500">{item.role}</p>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact CTA + Footer ──────────────────────────────────────────────────── */

function ContactFooter() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const config = useSiteConfig();
  const basePath = useDemoBasePath();

  return (
    <section className="bg-[#0A0A0A]">
      {/* CTA */}
      <div className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInView>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
              {t("title")}
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <a
              href={`mailto:${config.contact.email}`}
              className="inline-flex items-center gap-3 text-lg md:text-xl text-[#00D4FF] hover:text-white transition-colors duration-300 group"
            >
              <span>{config.contact.email}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </FadeInView>

          {/* Social links */}
          {config.social && (
            <div className="flex justify-center gap-6 mt-12">
              {config.social.instagram && (
                <a
                  href={config.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-[#00D4FF] transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {config.social.linkedin && (
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-[#00D4FF] transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} {config.brand.name}. {tFooter("rights")}
          </p>
          <div className="flex gap-6 text-sm text-neutral-500">
            <a href={`${basePath}/de/impressum`} className="hover:text-white transition-colors">
              {tFooter("impressum")}
            </a>
            <a href={`${basePath}/de/datenschutz`} className="hover:text-white transition-colors">
              {tFooter("datenschutz")}
            </a>
          </div>
          <p className="text-sm text-neutral-600">
            {tFooter("madeBy")}{" "}
            <a href="https://www.benetos.dev" className="text-[#00D4FF] hover:text-white transition-colors">
              Benetos
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
}

/* ─── Utility: Scroll-reveal wrapper ────────────────────────────────────────── */

function FadeInView({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────────────── */

export default function AgenturContent() {
  return (
    <main className="bg-[#0A0A0A]">
      <HeroSection />
      <ScrollShowcase />
      <ServicesSection />
      <TestimonialsSection />
      <ContactFooter />
    </main>
  );
}
