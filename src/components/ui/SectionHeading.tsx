import ScrollReveal from "./ScrollReveal";

export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <ScrollReveal className="mb-12 text-center md:mb-16">
      <h2 className="text-3xl font-bold text-text md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
