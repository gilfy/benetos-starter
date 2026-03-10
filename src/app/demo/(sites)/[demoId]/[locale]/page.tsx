import { notFound } from "next/navigation";
import { getDemo } from "@/lib/demo-registry";
import HomeContent from "@/components/HomeContent";
import AgenturContent from "@/components/AgenturContent";

export default async function DemoHomePage({
  params,
}: {
  params: Promise<{ demoId: string }>;
}) {
  const { demoId } = await params;
  const demo = await getDemo(demoId);
  if (!demo) notFound();

  const { config } = demo;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": config.schemaOrg.type,
    name: config.brand.name,
    description: config.seo.defaultDescription,
    url: config.url,
    telephone: config.contact.phone,
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.contact.address.street,
      addressLocality: config.contact.address.city,
      postalCode: config.contact.address.zip,
      addressCountry: config.contact.address.country,
    },
    ...(config.schemaOrg.priceRange && {
      priceRange: config.schemaOrg.priceRange,
    }),
    ...(config.schemaOrg.servesCuisine && {
      servesCuisine: config.schemaOrg.servesCuisine,
    }),
    image: `https://demo.benetos.dev${config.seo.ogImage}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {demoId === "agentur" ? <AgenturContent /> : <HomeContent />}
    </>
  );
}
