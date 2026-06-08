"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ChevronDown } from "lucide-react";

type CookiePreferences = {
  analytics: boolean;
  marketing: boolean;
};

function CookieAccordion({ 
  title, 
  description, 
  alwaysActive, 
  checked, 
  onChange 
}: { 
  title: string, 
  description: string, 
  alwaysActive?: boolean, 
  checked?: boolean, 
  onChange?: (checked: boolean) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded border border-border/50 transition-colors ${alwaysActive ? 'bg-slate-50' : 'bg-white'}`}>
      <div 
        className="flex items-center justify-between gap-4 p-4 cursor-pointer select-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          <h4 className="text-base font-semibold text-foreground">{title}</h4>
        </div>
        <div className="flex items-center gap-3 shrink-0" onClick={e => e.stopPropagation()}>
          <label className={`relative inline-flex items-center ${alwaysActive ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={alwaysActive ? true : checked}
              disabled={alwaysActive}
              onChange={(e) => onChange?.(e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
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
            <p className="text-sm text-slate-600 leading-relaxed px-4 pb-4 pl-12 md:pr-12">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie_consent", "custom");
    localStorage.setItem("cookie_preferences", JSON.stringify(prefs));
    setIsVisible(false);
    setShowManageModal(false);
    
    // Dispatch a custom event so the Analytics component can initialize accordingly
    window.dispatchEvent(
      new CustomEvent("cookie_consent_update", { detail: prefs })
    );
  };

  const handleAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  // Lock body scroll when manage modal is open
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
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-8"
          >
            <div className="mx-auto max-w-5xl bg-white dashed-box p-6 md:px-10 md:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
              <div className="flex items-start gap-5 relative z-10">
                <div className="bg-primary/10 p-3.5 rounded shrink-0">
                  <Cookie className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto relative z-10 shrink-0">
                <button
                  onClick={() => setShowManageModal(true)}
                  className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-foreground hover:bg-slate-50 transition-colors border border-border rounded"
                >
                  Manage
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 md:flex-none px-8 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded shadow-sm hover:shadow"
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
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dashed-box rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 md:p-8 border-b border-border/50 overflow-y-auto" data-lenis-prevent="true">
                <h2 className="text-2xl font-bold text-foreground mb-4">Privacy Preference Center</h2>
                <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                  When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to.
                </p>

                <div className="space-y-4">
                  <CookieAccordion 
                    title="Strictly Necessary Cookies"
                    description="These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences."
                    alwaysActive={true}
                  />

                  <CookieAccordion 
                    title="Analytics Cookies"
                    description="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. (Google Analytics)"
                    checked={preferences.analytics}
                    onChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
                  />

                  <CookieAccordion 
                    title="Marketing Cookies"
                    description="These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. (Meta Pixel)"
                    checked={preferences.marketing}
                    onChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </div>

              <div className="p-4 md:p-6 bg-slate-50 border-t border-border flex flex-col sm:flex-row items-center justify-end gap-4 shrink-0">
                <button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-foreground hover:bg-slate-200 transition-colors rounded"
                >
                  Accept All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto px-8 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded shadow-sm hover:shadow"
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
