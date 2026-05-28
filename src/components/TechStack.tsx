"use client";

import { AnimatedSection } from "./AnimatedSection";
import { CheckCircle2, Layers, TrendingUp, Zap } from "lucide-react";

const row1 = [
  { name: "Next.js", emoji: "▲" },
  { name: "React", emoji: "⚛" },
  { name: "TypeScript", emoji: "TS" },
  { name: "Node.js", emoji: "⬡" },
  { name: "Python", emoji: "🐍" },
  { name: "Flutter", emoji: "◆" },
];

const row2 = [
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Redis", emoji: "⚡" },
  { name: "MongoDB", emoji: "🍃" },
  { name: "GraphQL", emoji: "◈" },
  { name: "REST API", emoji: "↔" },
  { name: "Prisma", emoji: "▷" },
];

const row3 = [
  { name: "AWS", emoji: "☁" },
  { name: "Vercel", emoji: "▲" },
  { name: "Docker", emoji: "🐳" },
  { name: "Figma", emoji: "✦" },
  { name: "Tailwind CSS", emoji: "🌊" },
  { name: "GitHub Actions", emoji: "⚙" },
];

function TechPill({ name, emoji }: { name: string; emoji: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 border border-dashed border-border/80 bg-background hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 rounded-lg mx-2.5 shrink-0 group cursor-default shadow-sm">
      <span className="text-primary font-bold text-sm select-none w-5 text-center group-hover:scale-110 transition-transform duration-200">{emoji}</span>
      <span className="text-sm font-semibold text-foreground/70 whitespace-nowrap group-hover:text-foreground transition-colors">{name}</span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: { name: string; emoji: string }[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full py-1">
      <div
        className="flex w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <TechPill key={i} name={item.name} emoji={item.emoji} />
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="py-0 bg-background relative overflow-hidden">
      <div className="dashed-x w-full" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="border border-dashed border-border/80 overflow-hidden">

          {/* ── Top: Content ── */}
          <div className="p-10 md:p-16 bg-secondary/10 border-b border-dashed border-border/80 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              <AnimatedSection className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 border border-dashed border-primary/40 bg-primary/5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full" />
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Our Tech Stack</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">
                  Built With <span className="text-primary">Best-in-Class</span> Technologies
                </h2>
                <p className="text-foreground/60 leading-relaxed">
                  We pick and master tools that deliver speed, reliability, and developer happiness — so your product scales without friction.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
                {[
                  { icon: Zap, label: "Performance-first architecture" },
                  { icon: Layers, label: "Modular & scalable codebases" },
                  { icon: TrendingUp, label: "Future-ready tech choices" },
                  { icon: CheckCircle2, label: "Battle-tested in production" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 bg-background border border-dashed border-border/80 rounded-md px-4 py-3">
                      <div className="w-7 h-7 bg-primary/10 border border-dashed border-primary/30 rounded-md flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-primary" />
                      </div>
                      <span className="text-sm text-foreground/70 font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </AnimatedSection>
            </div>
          </div>

          {/* ── Bottom: Infinite Marquee Rows ── */}
          <div className="bg-background relative overflow-hidden">
            {/* Fade masks */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

            <div className="py-10 flex flex-col gap-4">
              <MarqueeRow items={row1} direction="left" speed={30} />
              <MarqueeRow items={row2} direction="right" speed={35} />
              <MarqueeRow items={row3} direction="left" speed={27} />
            </div>
          </div>

        </div>
      </div>

      <div className="dashed-x w-full" />
    </section>
  );
}
