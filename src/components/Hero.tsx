"use client";

import { AnimatedSection } from "./AnimatedSection";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

const reviewers = [
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=32",
  "https://i.pravatar.cc/100?img=47",
  "https://i.pravatar.cc/100?img=15",
];

function GoogleIcon(props: { size?: number }) {
  const size = props.size ?? 16;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center bg-linear-to-b from-primary/10 via-background to-background">
      {/* Abstract low-opacity background elements */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/Images/dots_pattern.png')] bg-cover bg-center"
        style={{
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 30%, black, transparent)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-225 bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border mb-8">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              Web, App &amp; AI Development Agency
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.15] tracking-tight text-foreground max-w-3xl mx-auto">
              Custom Web, App &amp; AI Solutions That Grow Your Business
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Vibe Venture partners with ambitious brands to design, build, and scale digital products — from your first launch to long-term growth.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20"
            >
              Get a Free Consultation
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-full bg-white border border-border text-foreground font-medium text-[15px] transition-all duration-300 hover:bg-gray-50 shadow-sm"
            >
              Explore Our Services
            </Link>
          </AnimatedSection>

          {/* Trust widget */}
          <AnimatedSection delay={0.5} className="flex flex-col items-center gap-2.5">
            <div className="inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-4 py-2 shadow-sm ring-1 ring-border">
              <div className="flex -space-x-2.5">
                {reviewers.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="Client"
                    width={30}
                    height={30}
                    className="rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="w-px h-5 bg-border" />
              <div className="flex items-center gap-1.5">
                <GoogleIcon size={16} />
                <span className="text-xs font-semibold text-foreground/70">4.5</span>
                <div className="flex items-center text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                  <div className="relative w-3 h-3">
                    <Star size={12} className="absolute inset-0 text-yellow-400/30" />
                    <div className="absolute inset-0 overflow-hidden w-1.5">
                      <Star size={12} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground/60">
              Backed by a team committed to quality and real results.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
