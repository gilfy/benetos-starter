"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import siteConfig from "../../../site.config";

export default function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: siteConfig.contactForm.apiKey,
          ...result.data,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fields = siteConfig.contactForm.fields;

  return (
    <section id="contact" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          {siteConfig.sections.contact.showForm && (
            <ScrollReveal>
              {status === "sent" ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-background p-12 text-center">
                  <CheckCircle className="mb-4 text-primary" size={48} />
                  <h3 className="mb-2 text-xl font-bold text-text">
                    {t("successTitle")}
                  </h3>
                  <p className="text-text-secondary">{t("successMessage")}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8"
                >
                  {fields.includes("name") && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text">
                        {t("form.name")} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                        placeholder={t("form.namePlaceholder")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                  )}

                  {fields.includes("email") && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text">
                        {t("form.email")} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                        placeholder={t("form.emailPlaceholder")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  )}

                  {fields.includes("phone") && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text">
                        {t("form.phone")}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                        placeholder={t("form.phonePlaceholder")}
                      />
                    </div>
                  )}

                  {fields.includes("subject") && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text">
                        {t("form.subject")}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                        placeholder={t("form.subjectPlaceholder")}
                      />
                    </div>
                  )}

                  {fields.includes("message") && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text">
                        {t("form.message")} *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={5}
                        className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-text placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                        placeholder={t("form.messagePlaceholder")}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                  >
                    <Send size={18} />
                    {status === "sending" ? t("form.sending") : t("form.submit")}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-500">
                      {t("form.error")}
                    </p>
                  )}
                </form>
              )}
            </ScrollReveal>
          )}

          {/* Info */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-primary" size={20} />
                <div>
                  <h4 className="font-semibold text-text">{t("address")}</h4>
                  <p className="text-text-secondary">
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.zip}{" "}
                    {siteConfig.contact.address.city}
                    <br />
                    {siteConfig.contact.address.country}
                  </p>
                </div>
              </div>

              {/* Phone */}
              {siteConfig.contact.phone && (
                <div className="flex gap-4">
                  <Phone className="mt-1 shrink-0 text-primary" size={20} />
                  <div>
                    <h4 className="font-semibold text-text">{t("phone")}</h4>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-text-secondary transition-colors hover:text-primary"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-primary" size={20} />
                <div>
                  <h4 className="font-semibold text-text">{t("email")}</h4>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-text-secondary transition-colors hover:text-primary"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              {siteConfig.contact.openingHours && (
                <div className="flex gap-4">
                  <Clock className="mt-1 shrink-0 text-primary" size={20} />
                  <div>
                    <h4 className="mb-2 font-semibold text-text">
                      {t("hours")}
                    </h4>
                    <div className="space-y-1">
                      {Object.entries(siteConfig.contact.openingHours).map(
                        ([day, hours]) => (
                          <div
                            key={day}
                            className="flex justify-between gap-8 text-sm text-text-secondary"
                          >
                            <span className="capitalize">
                              {t(`days.${day}`)}
                            </span>
                            <span>{hours}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Map */}
              {siteConfig.sections.contact.showMap &&
                siteConfig.sections.contact.mapEmbedUrl && (
                  <div className="overflow-hidden rounded-xl border border-border">
                    <iframe
                      src={siteConfig.sections.contact.mapEmbedUrl}
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location"
                    />
                  </div>
                )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
