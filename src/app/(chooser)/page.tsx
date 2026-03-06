"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getDemoMetas } from "@/lib/demo-registry";

const demos = getDemoMetas();

const t = {
  de: {
    tagline: "Live Demos",
    title: "Entdecke die Möglichkeiten",
    subtitle:
      "Ein Template, endlose Möglichkeiten. Erlebe, wie sich das Benetos Starter-Template an verschiedene Branchen anpasst — jeweils mit eigenem Design, Inhalt und Charakter.",
    viewDemo: "Demo ansehen",
    footer: "Erstellt mit Next.js, Tailwind CSS & Framer Motion.",
  },
  en: {
    tagline: "Live Demos",
    title: "See what\u2019s possible",
    subtitle:
      "One template, endless possibilities. Explore how the Benetos starter template adapts to different businesses — each with its own theme, content, and personality.",
    viewDemo: "View Demo",
    footer: "Built with Next.js, Tailwind CSS & Framer Motion.",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function DemoChooserPage() {
  const [lang, setLang] = useState<"de" | "en">("de");
  const i = t[lang];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="https://www.benetos.dev"
            className="flex items-center gap-2 text-xl font-bold text-text transition-colors hover:text-primary"
          >
            <Image
              src="/Logo_Icon.png"
              alt=""
              width={28}
              height={28}
              className="rounded-sm"
            />
            <span>
              Benetos
              <span
                className="cursor-blink"
                style={{ color: "var(--accent)" }}
              >
                _
              </span>
            </span>
          </a>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "de" ? "en" : "de")}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary uppercase transition-colors hover:bg-surface hover:text-text"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-primary uppercase">
            {i.tagline}
          </p>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold text-text md:text-6xl lg:text-7xl">
            {i.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary md:text-xl">
            {i.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Demo Cards */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-3"
        >
          {demos.map((demo) => (
            <motion.div
              key={demo.id}
              variants={cardVariants}
              className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Preview Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={demo.previewImage}
                  alt={demo.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Color swatches */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {demo.colorSwatches.map((color, idx) => (
                    <div
                      key={idx}
                      className="h-6 w-6 rounded-full border-2 border-white/30 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="mb-2 text-xl font-bold text-text">
                  {demo.name}
                </h2>
                <p className="mb-6 text-sm text-text-secondary">
                  {demo.description[lang]}
                </p>

                {/* View Demo */}
                <a
                  href={`/demo/${demo.id}/${lang}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                >
                  {i.viewDemo}
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://www.benetos.dev"
            className="transition-colors hover:text-primary"
          >
            Benetos
          </a>
          . {i.footer}
        </p>
      </footer>
    </div>
  );
}
