"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getDemoMetas } from "@/lib/demo-registry";

const demos = getDemoMetas();

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
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="https://www.benetos.dev"
            className="text-xl font-bold text-text transition-colors hover:text-primary"
          >
            Benetos
          </a>
          <a
            href="https://github.com/benetos-dev/benetos-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text"
          >
            <ExternalLink size={16} />
            Use this template
          </a>
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
            Live Demos
          </p>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold text-text md:text-6xl lg:text-7xl">
            See what&apos;s possible
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary md:text-xl">
            One template, endless possibilities. Explore how the Benetos starter
            template adapts to different businesses — each with its own theme,
            content, and personality.
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
                  {demo.colorSwatches.map((color, i) => (
                    <div
                      key={i}
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
                  {demo.description.en}
                </p>

                {/* Language Links */}
                <div className="flex gap-3">
                  <a
                    href={`/demo/${demo.id}/de`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                  >
                    Deutsch
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={`/demo/${demo.id}/en`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-background hover:text-text"
                  >
                    English
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-text md:text-3xl">
            Ready to build your own?
          </h2>
          <p className="mb-8 text-text-secondary">
            Clone the template, edit <code className="rounded bg-background px-2 py-0.5 text-sm font-mono text-primary">site.config.ts</code> and{" "}
            <code className="rounded bg-background px-2 py-0.5 text-sm font-mono text-primary">messages/*.json</code>,
            and deploy to Vercel in minutes.
          </p>
          <a
            href="https://github.com/benetos-dev/benetos-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Use this template on GitHub
            <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Benetos. Built with Next.js,
          Tailwind CSS & Framer Motion.
        </p>
      </footer>
    </div>
  );
}
