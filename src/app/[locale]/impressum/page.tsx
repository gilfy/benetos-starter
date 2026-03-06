import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/sections/Footer";
import siteConfig from "../../../../site.config";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  const t = useTranslations("impressum");
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
                {t("infoTitle")}
              </h2>
              <p>
                {l.companyName}
                <br />
                {l.address}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("representedBy")}
              </h2>
              <p>{l.representative}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("contactTitle")}
              </h2>
              <p>
                {t("emailLabel")}: {l.email}
                <br />
                {l.phone && (
                  <>
                    {t("phoneLabel")}: {l.phone}
                  </>
                )}
              </p>
            </section>

            {(l.registerCourt || l.registerNumber) && (
              <section>
                <h2 className="text-xl font-semibold text-text">
                  {t("registerTitle")}
                </h2>
                <p>
                  {l.registerCourt && (
                    <>
                      {t("registerCourt")}: {l.registerCourt}
                      <br />
                    </>
                  )}
                  {l.registerNumber && (
                    <>
                      {t("registerNumber")}: {l.registerNumber}
                    </>
                  )}
                </p>
              </section>
            )}

            {(l.taxId || l.vatId) && (
              <section>
                <h2 className="text-xl font-semibold text-text">
                  {t("taxTitle")}
                </h2>
                <p>
                  {l.taxId && (
                    <>
                      {t("taxId")}: {l.taxId}
                      <br />
                    </>
                  )}
                  {l.vatId && (
                    <>
                      {t("vatId")}: {l.vatId}
                    </>
                  )}
                </p>
              </section>
            )}

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("disclaimerTitle")}
              </h2>
              <p>{t("disclaimerText")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">
                {t("copyrightTitle")}
              </h2>
              <p>{t("copyrightText")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
