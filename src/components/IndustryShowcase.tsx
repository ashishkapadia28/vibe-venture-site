"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";

const fallbackIndustries = [
  {
    id: "finance",
    title: "FinTech & Banking",
    description: "Secure, scalable, and compliant financial technology solutions that drive digital transformation and enhance customer experiences.",
    icon: LucideIcons.Building2,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    stats: ["Bank-grade Security", "Real-time Processing", "Regulatory Compliance"]
  },
  {
    id: "healthcare",
    title: "Healthcare & MedTech",
    description: "HIPAA-compliant platforms, telemedicine apps, and health data management systems designed for modern patient care.",
    icon: LucideIcons.HeartPulse,
    image: "https://images.unsplash.com/photo-1538108149393-cebb47cbd241?auto=format&fit=crop&q=80&w=1200",
    stats: ["HIPAA Compliant", "Telehealth Solutions", "EHR Integration"]
  }
];

export function IndustryShowcase({ dbIndustries }: { dbIndustries?: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Transform DB industries or use fallback
  const industries = dbIndustries && dbIndustries.length > 0 ? dbIndustries.map(ind => ({
    id: ind.id,
    title: ind.name,
    description: ind.description || "Transforming businesses with custom digital solutions.",
    icon: (LucideIcons as any)[ind.icon_name || "Building2"] || LucideIcons.Building2,
    image: ind.image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    stats: ind.stats?.length > 0 ? ind.stats : ["Domain Expertise", "Secure Architecture", "Scalable Growth"]
  })) : fallbackIndustries;

  const activeIndustry = industries[activeIndex];
  const ActiveIcon = activeIndustry.icon;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/5 border-y border-dashed border-border/60 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Explore Our <span className="text-primary">Domain Expertise</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl">
              Select an industry below to see how our targeted solutions and technological capabilities can transform your business vertical.
            </p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-5">

          {/* TOP: Tabs */}
          <div className="w-full flex justify-start lg:justify-center overflow-x-auto border-b border-border/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="flex flex-nowrap items-center w-max min-w-full lg:min-w-0">
              {industries.map((ind, i) => {
                const Icon = ind.icon;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "group relative flex items-center justify-center gap-2.5 px-6 py-4 whitespace-nowrap transition-colors duration-300",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/10"
                    )}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="transition-transform group-hover:scale-110" />
                    <span className={cn("text-[15px] transition-all", isActive ? "font-bold tracking-wide" : "font-medium")}>
                      {ind.title}
                    </span>

                    {/* Active Bottom Border */}
                    {isActive && (
                      <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(var(--primary),0.3)] animate-in fade-in zoom-in-90 duration-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM: Content Display */}
          <div className="w-full">
            <AnimatedSection>
              <div className="bg-background border border-dashed border-border/80 rounded-lg overflow-hidden flex flex-col lg:flex-row relative group shadow-sm">

                {/* Image Area - Take Half Space on Desktop */}
                <div className="relative h-64 sm:h-80 lg:h-auto lg:w-1/2 shrink-0 overflow-hidden bg-muted">
                  {industries.map((ind, i) => (
                    <Image
                      key={ind.id}
                      src={ind.image}
                      alt={ind.title}
                      fill
                      priority={i === 0}
                      className={cn(
                        "object-cover transition-all duration-700 ease-in-out",
                        i === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                      )}
                    />
                  ))}
                  {/* Gradients to blend image into the content section smoothly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background z-20" />

                  {/* Floating badge inside image (mobile only since we show title on right in desktop) */}
                  <div className="lg:hidden absolute bottom-6 left-8 z-30 flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-xl border border-primary/30 flex items-center justify-center text-primary">
                      <ActiveIcon size={24} />
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-foreground drop-shadow-md">
                      {activeIndustry.title}
                    </h3>
                  </div>
                </div>

                {/* Content Area - Take Half Space on Desktop */}
                <div className="p-8 md:p-10 lg:p-14 flex flex-col justify-center lg:w-1/2 relative z-30">
                  <div className="hidden lg:flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <ActiveIcon size={28} />
                    </div>
                    <h3 className="text-4xl font-heading font-bold text-foreground leading-tight">
                      {activeIndustry.title}
                    </h3>
                  </div>

                  <p className="text-lg text-foreground/80 leading-relaxed mb-10">
                    {activeIndustry.description}
                  </p>

                  <div className="flex flex-col gap-4 mb-10">
                    {activeIndustry.stats.map((stat: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        <span className="text-[15px] font-medium text-foreground">{stat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-dashed border-border/60">
                    <Link
                      href={`/contact?industry=${activeIndustry.title}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group/link"
                    >
                      <span>Discuss {activeIndustry.title} Solutions</span>
                      <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
