"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";

interface Metric {
  value: string;
  suffix?: string;
  label: string;
  description: string;
  className?: string;
}

const metrics: Metric[] = [
  {
    value: "150",
    suffix: "+",
    label: "Projects Delivered",
    description: "Across fintech, SaaS, logistics and enterprise platforms. We engineer scalable systems that drive real business growth.",
    className: "md:col-span-2",
  },
  {
    value: "99.9",
    suffix: "%",
    label: "Uptime SLA",
    description: "Zero-downtime deployments",
    className: "md:col-span-1",
  },
  {
    value: "8",
    suffix: "×",
    label: "Performance Gain",
    description: "Average load time improvement",
    className: "md:col-span-1",
  },
  {
    value: "12",
    suffix: "+",
    label: "Countries Served",
    description: "Global digital footprint",
    className: "md:col-span-1",
  },
  {
    value: "0",
    suffix: "",
    label: "Security Breaches",
    description: "SOC 2 compliant pipelines",
    className: "md:col-span-1",
  },
  {
    value: "40",
    suffix: "+",
    label: "Enterprise Clients",
    description: "Fortune 500 companies and high-growth startups worldwide.",
    className: "md:col-span-2",
  },
];

function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {isInView ? value : "0"}
      {suffix}
    </motion.span>
  );
}

export function Metrics() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
        {/* Section Header matched with Features.tsx */}
        <div className="relative mb-16">
          {/* Top dashed border */}
          <div className="absolute -top-8 -left-8 -right-8 h-[1.5px] dashed-x" />

          <AnimatedSection className="pt-8 pb-2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground mb-3">
              Our Impact
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
              Numbers that define our success. We deliver measurable business outcomes backed by rock-solid data.
            </p>
          </AnimatedSection>

          {/* Bottom dashed border */}
          <div className="absolute -bottom-8 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>

        {/* Clean Grid Layout exactly matching Features.tsx blueprint grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 mt-16 border-l border-t border-dashed border-border/60">
          {metrics.map((metric, index) => {
            return (
              <AnimatedSection 
                key={metric.label} 
                delay={index * 0.1}
                className={cn(metric.className, "h-full border-r border-b border-dashed border-border/60")}
              >
                <div className="bg-background relative p-8 transition-colors duration-300 hover:bg-primary/5 h-full flex flex-col justify-between group">
                  <div className="mb-8">
                    <div className="text-5xl lg:text-6xl font-heading font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                      <CountUp value={metric.value} suffix={metric.suffix} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground text-base mb-2">
                      {metric.label}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
