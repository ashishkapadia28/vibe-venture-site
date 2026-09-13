"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { Search, Loader2 } from "lucide-react";

interface ApplicationStatus {
  status: string;
  job_title?: string;
  applied_at?: string;
}

export function TrackApplication() {
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ApplicationStatus | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/applications/track/${encodeURIComponent(trackingId.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="track-application">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="relative mb-12">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="TRACK APPLICATION"
              title="Already Applied?"
              subtitle="Enter the Application ID you received after applying to check your current status."
              className="mx-auto text-center items-center"
            />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.1} className="max-w-lg mx-auto">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. VV-8F3K2A"
              aria-label="Application tracking ID"
              className="flex-1 bg-white border border-border/60 shadow-sm rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              Track
            </button>
          </form>

          {error && (
            <p className="mt-4 text-sm text-center text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-6 bg-white border border-border/50 shadow-sm rounded-2xl p-6 text-center">
              {result.job_title && (
                <p className="text-sm text-muted-foreground mb-1">{result.job_title}</p>
              )}
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Status</p>
              <p className="text-xl font-heading font-bold text-primary">{result.status}</p>
              {result.applied_at && (
                <p className="text-xs text-muted-foreground mt-3">Applied on {result.applied_at}</p>
              )}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
