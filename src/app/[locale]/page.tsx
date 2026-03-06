import siteConfig from "../../../site.config";
import HomeContent from "@/components/HomeContent";

export default function HomePage() {
  // JSON-LD structured data (server-rendered)
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
      <HomeContent />
    </>
  );
}
