"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_CONSENT: ConsentState = { analytics: false, marketing: false };
let cachedConsent: ConsentState = DEFAULT_CONSENT;

function readConsent(): ConsentState {
  if (localStorage.getItem("cookie_consent") !== "custom") return DEFAULT_CONSENT;
  try {
    const prefs = JSON.parse(localStorage.getItem("cookie_preferences") || "{}");
    return { analytics: !!prefs.analytics, marketing: !!prefs.marketing };
  } catch {
    return DEFAULT_CONSENT;
  }
}

// Reads localStorage directly instead of mirroring it into state via an
// effect — avoids both the extra post-mount render and the hydration
// mismatch a synchronous localStorage read would otherwise cause, since
// useSyncExternalStore is built to reconcile server/client snapshots safely.
function subscribe(callback: () => void) {
  const handleChange = () => {
    const next = readConsent();
    if (next.analytics !== cachedConsent.analytics || next.marketing !== cachedConsent.marketing) {
      cachedConsent = next;
      callback();
    }
  };
  window.addEventListener("cookie_consent_update", handleChange);
  window.addEventListener("storage", handleChange);
  return () => {
    window.removeEventListener("cookie_consent_update", handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

function getSnapshot(): ConsentState {
  const next = readConsent();
  if (next.analytics !== cachedConsent.analytics || next.marketing !== cachedConsent.marketing) {
    cachedConsent = next;
  }
  return cachedConsent;
}

function getServerSnapshot(): ConsentState {
  return DEFAULT_CONSENT;
}

export function Analytics() {
  const { analytics: analyticsGranted, marketing: marketingGranted } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {/* Google Analytics */}
      {analyticsGranted && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {marketingGranted && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
