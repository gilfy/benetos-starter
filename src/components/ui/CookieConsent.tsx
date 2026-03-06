"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

function useCookieConsent() {
  return useSyncExternalStore(
    emptySubscribe,
    () => !localStorage.getItem("cookie-consent"),
    () => false
  );
}

export default function CookieConsent() {
  const t = useTranslations("cookie");
  const needsConsent = useCookieConsent();
  const [dismissed, setDismissed] = useState(false);
  const visible = needsConsent && !dismissed;

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setDismissed(true);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-surface p-4 shadow-xl sm:p-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text-secondary">{t("message")}</p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={decline}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background"
              >
                {t("decline")}
              </button>
              <button
                onClick={accept}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
