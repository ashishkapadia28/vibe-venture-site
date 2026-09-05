"use client";

import { AnimatedSection } from "./AnimatedSection";
import Link from "next/link";
import type { ReactNode } from "react";

interface SecondaryHeroCta {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface SecondaryHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  ctas?: SecondaryHeroCta[];
}

export function SecondaryHero({ eyebrow, title, subtitle, ctas = [] }: SecondaryHeroProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-background flex flex-col justify-center">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-0 right-0 w-100 h-100 bg-primary/5 rounded-full blur-[100px] translate-x-1/3" />
      </div>

      <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-4xl pt-8 pb-4">
          <AnimatedSection delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border mb-8">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              {eyebrow}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.15] tracking-tight text-foreground">
              {title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-2xl font-medium leading-relaxed">
              {subtitle}
            </p>
          </AnimatedSection>

          {ctas.length > 0 && (
            <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row gap-4">
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className={
                    cta.variant === "secondary"
                      ? "w-full sm:w-auto px-9 py-3 rounded-full border border-border bg-transparent text-foreground font-medium text-[15px] transition-all duration-300 hover:border-foreground/40 flex items-center justify-center"
                      : "w-full sm:w-auto px-9 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center justify-center"
                  }
                >
                  {cta.text}
                </Link>
              ))}
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
