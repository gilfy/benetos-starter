import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/sections/Footer";
import siteConfig from "../../../../site.config";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  const t = useTranslations("datenschutz");
  const l = siteConfig.legal;

  return (
    <>
      <Navigation />
      <main className="bg-background pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-text md:text-4xl">
            {t("title")}
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-text-secondary">
            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("responsibleTitle")}
              </h2>
              <p>
                {l.companyName}
                <br />
                {l.address}
                <br />
                {t("emailLabel")}: {l.email}
                {l.phone && (
                  <>
                    <br />
                    {t("phoneLabel")}: {l.phone}
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("generalTitle")}
              </h2>
              <p>{t("generalText")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("hostingTitle")}
              </h2>
              <p>{t("hostingText")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("cookiesTitle")}
              </h2>
              <p>{t("cookiesText")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("contactFormTitle")}
              </h2>
              <p>{t("contactFormText")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("rightsTitle")}
              </h2>
              <p>{t("rightsText")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("changesTitle")}
              </h2>
              <p>{t("changesText")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
