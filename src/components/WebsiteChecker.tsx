"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import {
  Search, Loader2, AlertTriangle, AlertCircle, Info,
  Lock, Mail, X, CheckCircle2, Gauge,
} from "lucide-react";

interface AnalysisIssue {
  severity: "high" | "medium" | "low";
  message: string;
}

interface AnalysisResult {
  url: string;
  overallScore: number;
  categories: { name: string; score: number }[];
  issues: AnalysisIssue[];
  improvements: string[];
  meta: { responseTimeMs: number; htmlSizeKB: number; title: string | null; imageCount: number };
}

function scoreColor(score: number) {
  if (score >= 90) return "#22c55e"; // green
  if (score >= 50) return "#f59e0b"; // amber
  return "#ef4444"; // red
}

function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const strokeWidth = size * 0.09;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-border/50" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-heading font-black" style={{ color }}>{score}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Score</span>
      </div>
    </div>
  );
}

function CategoryBar({ name, score }: { name: string; score: number }) {
  const color = scoreColor(score);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-border/50 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

const severityIcon = { high: AlertTriangle, medium: AlertCircle, low: Info };
const severityColor = { high: "text-red-500", medium: "text-amber-500", low: "text-muted-foreground" };

async function postJSON<T>(url: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || "Something went wrong. Please try again." };
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

function SkeletonRow({ wide = "85%" }: { wide?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-4.5 h-4.5 rounded-full bg-border/60 shrink-0 mt-0.5" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 rounded-full bg-border/60" style={{ width: wide }} />
        <div className="h-3 rounded-full bg-border/40" style={{ width: "45%" }} />
      </div>
    </div>
  );
}

export function WebsiteChecker() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus("loading");
    setErrorMsg("");
    setResult(null);

    const res = await postJSON<AnalysisResult>("/api/tools/analyze-website", { url: url.trim() });
    if (!res.ok) {
      setErrorMsg(res.error);
      setStatus("error");
      return;
    }
    setResult(res.data);
    setStatus("success");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    setEmailStatus("submitting");
    setEmailError("");

    const res = await postJSON("/api/tools/website-report", { email, url: result.url, report: result });
    if (!res.ok) {
      setEmailError(res.error);
      setEmailStatus("error");
      return;
    }
    setEmailStatus("success");
  };

  return (
    <>
      {/* ─── HERO WITH ANALYZER ─── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-linear-to-b from-primary/10 via-background to-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-225 bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border mb-8">
                <Gauge size={16} className="text-primary" />
                Free Website Analysis
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.15] tracking-tight text-foreground">
                Is Your Website Losing You Customers?
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                Get a free, instant snapshot of your site&apos;s performance, SEO, and mobile-friendliness — no signup required to see your score.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="w-full max-w-xl">
              <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourwebsite.com"
                  aria-label="Website URL to analyze"
                  className="flex-1 bg-white border border-border/60 shadow-sm rounded-xl px-5 py-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                >
                  {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  {status === "loading" ? "Analyzing..." : "Analyze for Free"}
                </button>
              </form>
              {status === "error" && (
                <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {errorMsg}
                </p>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      {result && (
        <section className="py-16 md:py-24 bg-background relative">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <p className="text-sm text-muted-foreground mb-2 text-center">Results for</p>
                <p className="text-lg font-semibold text-foreground mb-10 text-center break-all">{result.url}</p>
              </AnimatedSection>

              {/* Score chart */}
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-8 md:p-10 mb-8 flex flex-col md:flex-row items-center gap-10">
                  <ScoreRing score={result.overallScore} />
                  <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {result.categories.map((category) => (
                      <CategoryBar key={category.name} name={category.name} score={category.score} />
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Top improvements */}
              {result.improvements.length > 0 && (
                <AnimatedSection delay={0.15}>
                  <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-8 md:p-10 mb-8">
                    <h2 className="text-xl font-heading font-bold mb-6">Top {result.improvements.length} Improvements</h2>
                    <div className="flex flex-col gap-4">
                      {result.improvements.map((improvement, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-sm text-foreground/80 leading-relaxed pt-0.5">{improvement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Issues found — half visible, half locked */}
              <AnimatedSection delay={0.2}>
                <div className="relative bg-white rounded-3xl border border-border/50 shadow-sm p-8 md:p-10 mb-8 overflow-hidden">
                  <h2 className="text-xl font-heading font-bold mb-6">What&apos;s Hurting Your Score</h2>
                  {result.issues.length > 0 ? (() => {
                    const visibleCount = Math.max(1, Math.ceil(result.issues.length / 2));
                    const visibleIssues = result.issues.slice(0, visibleCount);
                    const lockedIssues = result.issues.slice(visibleCount);
                    return (
                      <>
                        <div className="flex flex-col gap-4">
                          {visibleIssues.map((issue, i) => {
                            const Icon = severityIcon[issue.severity];
                            return (
                              <div key={i} className="flex items-start gap-3">
                                <Icon size={18} className={`shrink-0 mt-0.5 ${severityColor[issue.severity]}`} />
                                <p className="text-sm text-foreground/80 leading-relaxed">{issue.message}</p>
                              </div>
                            );
                          })}
                        </div>
                        {lockedIssues.length > 0 && (
                          <div className="relative mt-4 pt-4 border-t border-border/50">
                            <div className="flex flex-col gap-4">
                              {lockedIssues.map((_, i) => (
                                <SkeletonRow key={i} wide={i % 2 === 0 ? "80%" : "65%"} />
                              ))}
                            </div>
                            <div className="flex justify-center mt-2">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1.5">
                                <Lock size={12} />
                                +{lockedIssues.length} more in the full report
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })() : (
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      No major issues found in our checks — nice work.
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Fully locked full report */}
              <AnimatedSection delay={0.25}>
                <div className="relative rounded-3xl border border-border/50 shadow-sm overflow-hidden bg-white">
                  <div className="p-8 md:p-10 select-none pointer-events-none">
                    <div className="h-5 rounded-full bg-border/60 mb-6" style={{ width: "45%" }} />
                    <div className="flex flex-col gap-5">
                      <SkeletonRow wide="90%" />
                      <SkeletonRow wide="75%" />
                      <SkeletonRow wide="82%" />
                      <SkeletonRow wide="68%" />
                      <SkeletonRow wide="78%" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                      <Lock size={24} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-lg text-foreground mb-1">Unlock Your Full Report</p>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Get the complete breakdown and action plan sent straight to your inbox.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowEmailModal(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90"
                    >
                      <Mail size={16} />
                      Download Full Report
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* ─── EMAIL MODAL ─── */}
      {showEmailModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 sm:p-6 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background border border-border/60 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => { setShowEmailModal(false); setEmailStatus("idle"); setEmail(""); }}
              aria-label="Close"
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-all p-2 bg-secondary/50 hover:bg-secondary rounded-full z-10"
            >
              <X size={18} />
            </button>

            <div className="p-8">
              {emailStatus === "success" ? (
                <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in duration-500">
                  <CheckCircle2 size={48} className="text-primary mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">You&apos;re All Set!</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Your full report for {result?.url} will be sent to {email} shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-heading font-bold mb-2">Get Your Full Report</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your email and we&apos;ll send the complete analysis to your inbox.
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      aria-label="Email address"
                      className="w-full bg-background border border-border/60 shadow-sm rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                    />
                    {emailStatus === "error" && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{emailError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={emailStatus === "submitting"}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {emailStatus === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                      {emailStatus === "submitting" ? "Sending..." : "Send My Report"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
