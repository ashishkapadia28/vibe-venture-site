"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export function Analytics() {
  const [analyticsGranted, setAnalyticsGranted] = useState(false);
  const [marketingGranted, setMarketingGranted] = useState(false);

  useEffect(() => {
    // Check initial state
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      setAnalyticsGranted(true);
      setMarketingGranted(true);
    } else if (consent === "custom") {
      try {
        const prefs = JSON.parse(localStorage.getItem("cookie_preferences") || "{}");
        if (prefs.analytics) setAnalyticsGranted(true);
        if (prefs.marketing) setMarketingGranted(true);
      } catch (e) {
        console.error("Could not parse cookie preferences");
      }
    }

    // Listen for custom event from CookieConsent component
    const handleConsentEvent = (e: Event) => {
      // old basic event fallback
      if (e.type === "cookie_consent_accepted") {
        setAnalyticsGranted(true);
        setMarketingGranted(true);
      } else {
        // custom preferences event
        const customEvent = e as CustomEvent;
        if (customEvent.detail) {
          setAnalyticsGranted(customEvent.detail.analytics);
          setMarketingGranted(customEvent.detail.marketing);
        }
      }
    };

    window.addEventListener("cookie_consent_accepted", handleConsentEvent);
    window.addEventListener("cookie_consent_update", handleConsentEvent);
    return () => {
      window.removeEventListener("cookie_consent_accepted", handleConsentEvent);
      window.removeEventListener("cookie_consent_update", handleConsentEvent);
    };
  }, []);

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
