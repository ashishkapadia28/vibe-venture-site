"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PartyPopper, ArrowRight, X } from "lucide-react";

const DISMISS_KEY = "launch_offer_dismissed";

export function LaunchAnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(localStorage.getItem(DISMISS_KEY) !== "true");
    setHydrated(true);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // localStorage unavailable — the bar just won't remember being dismissed
    }
    setVisible(false);
  };

  if (!hydrated || !visible) return null;

  return (
    <div className="relative z-[60] flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-center text-primary-foreground">
      <PartyPopper size={15} className="shrink-0" />
      <p className="text-xs sm:text-sm font-medium leading-snug">
        We&apos;re live! Celebrate our launch with{" "}
        <span className="font-bold">50% off your first project</span> — for a limited time.
      </p>
      <Link
        href="/contact"
        className="hidden sm:inline-flex items-center gap-1 text-xs sm:text-sm font-bold underline underline-offset-2 hover:no-underline shrink-0"
      >
        Claim the Offer
        <ArrowRight size={14} />
      </Link>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
      >
        <X size={15} />
      </button>
    </div>
  );
}
