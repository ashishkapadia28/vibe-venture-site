"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";
import { ArrowUpRight, ExternalLink, ArrowRight } from "lucide-react";

interface CaseStudy {
  id: number;
  tag: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  gradient: string;
  accentColor: string;
  image: string;
  slug?: string;
}

export function CaseStudies({ hideFooter = false }: { hideFooter?: boolean }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3001";
        const apiUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const res = await fetch(`${apiUrl}/api/case-studies?is_published=true`, {
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          setCaseStudies(data);
        }
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background relative flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground text-sm font-medium animate-pulse">Loading case studies...</p>
      </section>
    );
  }

  if (caseStudies.length === 0) {
    return null; // or empty state
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 max-w-none">
        
        {/* Header matched with Features.tsx */}
        <div className="relative mb-16">
          <div className="absolute -top-8 -left-8 -right-8 h-[1.5px] dashed-x" />
          
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8 pb-2">
            <div>
              <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
                Selected Work
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.1]">
                Case Studies
                <br />
                <span className="text-muted-foreground/60">that speak results</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
              From fintech infrastructure to AI-powered platforms—see how we turn complex engineering challenges into measurable business wins.
            </p>
          </AnimatedSection>

          <div className="absolute -bottom-8 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>

        {/* Case Study Cards using Blueprint Dashed Grid */}
        <div className="grid grid-cols-1 gap-8 mt-16">
          {caseStudies.map((study, index) => {
            const themeBase = study.accentColor ? study.accentColor.replace('text-', '') : 'primary';
            return (
            <AnimatedSection key={study.id} delay={index * 0.1} className="border border-dashed border-border/60">
              <Link
                href={`/case-studies/${study.slug || study.id}`}
                onMouseEnter={() => setHoveredId(study.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group block relative overflow-hidden bg-background transition-all duration-500 hover:bg-primary/5 lg:h-[360px]"
              >
                {/* Gradient BG on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-0 h-full">
                  {/* Left Content: 3/5 */}
                  <div className="lg:col-span-3 p-6 md:p-8 flex flex-col gap-6 border-r border-dashed border-border/60">
                    <div>
                      {/* Tag + Arrow */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm bg-${themeBase}/5 border border-${themeBase}/20 ${study.accentColor}`}>
                          {study.tag}
                        </span>
                        <div className={`w-10 h-10 rounded-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-${themeBase} group-hover:bg-${themeBase} group-hover:text-primary-foreground -translate-x-4 group-hover:translate-x-0`}>
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl md:text-2xl font-heading font-bold mb-2 leading-tight tracking-tight group-hover:text-${themeBase} transition-colors duration-300`}>
                        {study.title}
                      </h3>

                      {/* Description */}
                      <div>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {study.description}
                        </p>
                        <span className={`inline-flex items-center gap-1 mt-3 text-sm font-semibold text-${themeBase} group-hover:underline underline-offset-4`}>
                          Read more <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-5 border-t border-dashed border-border/60">
                      {study.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-sm border border-border/60 bg-secondary/30 text-muted-foreground uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Image: 2/5 */}
                  <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-0 bg-secondary/10 h-full">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 mix-blend-luminosity opacity-70 group-hover:opacity-100 group-hover:mix-blend-normal"
                    />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )})}
        </div>

        {/* Bottom CTA strip */}
        {!hideFooter && (
          <div className="relative mt-16">
            <div className="absolute top-0 -left-8 -right-8 h-[1.5px] dashed-x" />
            <AnimatedSection className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 pb-2">
              <p className="text-muted-foreground text-sm">
                Want to see more of our work?{" "}
                <Link href="/portfolio" className="text-primary font-semibold hover:underline underline-offset-4">
                  View Portfolio
                </Link>
              </p>
              <Link
                href="/case-studies"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center justify-center gap-1.5 group"
              >
                See All Case Studies
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
}
