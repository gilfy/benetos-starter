import siteConfig from "../../../site.config";
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

export default function HomePage() {
  const s = siteConfig.sections;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": siteConfig.schemaOrg.type,
    name: siteConfig.brand.name,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: siteConfig.contact.address.country,
    },
    ...(siteConfig.schemaOrg.priceRange && {
      priceRange: siteConfig.schemaOrg.priceRange,
    }),
    ...(siteConfig.schemaOrg.servesCuisine && {
      servesCuisine: siteConfig.schemaOrg.servesCuisine,
    }),
    image: `${siteConfig.url}${siteConfig.seo.ogImage}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
