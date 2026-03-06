"use client";

import { useSiteConfig } from "@/lib/config-context";
import Navigation from "@/components/ui/Navigation";
import CookieConsent from "@/components/ui/CookieConsent";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomeContent() {
  const siteConfig = useSiteConfig();
  const s = siteConfig.sections;

  return (
    <>
      <Navigation />
      <main>
        {s.hero.enabled && <Hero />}
        {s.about.enabled && <About />}
        {s.services.enabled && <Services />}
        {s.gallery.enabled && <Gallery />}
        {s.testimonials.enabled && <Testimonials />}
        {s.faq.enabled && <FaqSection />}
        {s.contact.enabled && <Contact />}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
