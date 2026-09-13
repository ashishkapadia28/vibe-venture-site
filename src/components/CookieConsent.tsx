"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ChevronDown } from "lucide-react";
import { cookieBanner, cookieModal, cookieCategories, type CookieCategory, type CookieItem } from "@/data/cookieConsent";

type Decision = "accept_all" | "reject_all" | "custom";
type Preferences = Record<string, boolean>;

const SECONDARY_BTN = "text-sm font-semibold text-foreground/70 hover:text-foreground bg-white border border-border/60 hover:border-primary/40 transition-colors rounded-full";
const PRIMARY_BTN = "text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full shadow-sm";

function buildPreferences(pick: (category: CookieCategory) => boolean): Preferences {
  return Object.fromEntries(cookieCategories.map((c) => [c.key, pick(c)]));
}

async function logConsent(decision: Decision, preferences: Preferences) {
  try {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, preferences }),
    });
  } catch {
    // Best-effort — the banner already reflects the user's choice locally
    // even if the audit-log write fails (e.g. offline).
  }
}

function CookieAccordion({
  title,
  description,
  alwaysActive,
  checked,
  onChange,
  cookies,
}: {
  title: string;
  description: string;
  alwaysActive?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  cookies?: CookieItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border/50 bg-white shadow-sm transition-colors">
      <div
        className="flex items-center justify-between gap-4 p-4 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          {alwaysActive && (
            <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">Always Active</span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
          <label className={`relative inline-flex items-center ${alwaysActive ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={alwaysActive ? true : checked}
              disabled={alwaysActive}
              onChange={(e) => onChange?.(e.target.checked)}
            />
            <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-11">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>

              {cookies && cookies.length > 0 && (
                <div className="mt-4 rounded-xl border border-border/50 overflow-hidden overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-secondary/30">
                        <th className="text-left font-bold text-[10px] tracking-widest uppercase text-muted-foreground px-3 py-2.5 whitespace-nowrap">Cookie</th>
                        <th className="text-left font-bold text-[10px] tracking-widest uppercase text-muted-foreground px-3 py-2.5 whitespace-nowrap">Provider</th>
                        <th className="text-left font-bold text-[10px] tracking-widest uppercase text-muted-foreground px-3 py-2.5">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookies.map((cookie, i) => (
                        <tr key={cookie.name} className={i % 2 === 1 ? "bg-secondary/15" : undefined}>
                          <td className="px-3 py-2.5 font-mono text-foreground/80 whitespace-nowrap align-top">{cookie.name}</td>
                          <td className="px-3 py-2.5 text-foreground/80 whitespace-nowrap align-top">{cookie.provider}</td>
                          <td className="px-3 py-2.5 text-muted-foreground align-top">{cookie.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  // Opt-out by default — only Strictly Necessary starts checked. Analytics
  // and Marketing must be actively turned on before "Save Preferences" can
  // count as consent for them.
  const [preferences, setPreferences] = useState<Preferences>(() => buildPreferences((c) => c.alwaysActive));

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (decision: Decision, prefs: Preferences) => {
    localStorage.setItem("cookie_consent", decision);
    localStorage.setItem("cookie_preferences", JSON.stringify(prefs));
    setIsVisible(false);
    setShowManageModal(false);

    window.dispatchEvent(new CustomEvent("cookie_consent_update", { detail: prefs }));
    logConsent(decision, prefs);
  };

  const handleAcceptAll = () => saveConsent("accept_all", buildPreferences(() => true));
  const handleRejectAll = () => saveConsent("reject_all", buildPreferences((c) => c.alwaysActive));
  const handleSavePreferences = () => saveConsent("custom", preferences);

  useEffect(() => {
    if (showManageModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showManageModal]);

  return (
    <>
      <AnimatePresence>
        {isVisible && !showManageModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="mx-auto max-w-5xl bg-white rounded-3xl border border-border/60 shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Cookie size={20} />
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-foreground mb-1.5">
                    {cookieBanner.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {cookieBanner.description}{" "}
                    <Link href={cookieBanner.learnMoreHref} className="text-primary font-semibold hover:underline underline-offset-2">
                      {cookieBanner.learnMoreLabel}
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 flex-wrap">
                <button
                  onClick={() => setShowManageModal(true)}
                  className={`flex-1 md:flex-none px-5 py-2.5 ${SECONDARY_BTN}`}
                >
                  Manage
                </button>
                <button
                  onClick={handleRejectAll}
                  className={`flex-1 md:flex-none px-5 py-2.5 ${SECONDARY_BTN}`}
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className={`flex-1 md:flex-none px-6 py-2.5 ${PRIMARY_BTN}`}
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Modal */}
      <AnimatePresence>
        {showManageModal && (
          <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 sm:p-6 bg-foreground/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-background rounded-3xl border border-border/60 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 md:p-8 border-b border-border/50 overflow-y-auto" data-lenis-prevent="true">
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">{cookieModal.title}</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {cookieModal.description}
                </p>

                <div className="space-y-3">
                  {cookieCategories.map((category) => (
                    <CookieAccordion
                      key={category.key}
                      title={category.title}
                      description={category.description}
                      alwaysActive={category.alwaysActive}
                      checked={preferences[category.key]}
                      onChange={(checked) => setPreferences((prev) => ({ ...prev, [category.key]: checked }))}
                      cookies={category.cookies}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 md:p-6 bg-background border-t border-border/50 flex flex-col sm:flex-row items-center justify-end gap-3 shrink-0">
                <button
                  onClick={handleRejectAll}
                  className={`w-full sm:w-auto px-5 py-2.5 ${SECONDARY_BTN}`}
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className={`w-full sm:w-auto px-5 py-2.5 ${SECONDARY_BTN}`}
                >
                  Accept All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className={`w-full sm:w-auto px-6 py-2.5 ${PRIMARY_BTN}`}
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
