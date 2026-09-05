"use client";

import { AnimatedSection } from "./AnimatedSection";
import type { CSSProperties, ReactNode } from "react";
import { TbApi } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiFlutter,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiGraphql,
  SiPrisma,
  SiVercel,
  SiDocker,
  SiTailwindcss,
  SiGithub,
} from "react-icons/si";

type PillIcon = (props: { size?: number; className?: string; style?: CSSProperties }) => ReactNode;

function FigmaIcon({ size = 18, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" className={className} style={style}>
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#F24E1E" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#FF7262" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

const row1 = [
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Flutter", icon: SiFlutter, color: "#027DFC" },
];

const row2 = [
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "REST API", icon: TbApi, color: "#8B5CF6" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
];

const row3 = [
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Figma", icon: FigmaIcon, color: undefined },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GitHub Actions", icon: SiGithub, color: "#181717" },
];

function TechPill({ name, icon: Icon, color }: { name: string; icon: PillIcon; color?: string }) {
  return (
    <div className="card-hover flex items-center gap-3 px-5 py-3 border border-border/50 bg-white hover:border-primary/40 transition-all duration-300 rounded-full mx-2.5 shrink-0 group cursor-default shadow-sm">
      <Icon
        size={18}
        style={color ? { color } : undefined}
        className="shrink-0 group-hover:scale-110 transition-transform duration-200"
      />
      <span className="text-sm font-semibold text-foreground/70 whitespace-nowrap group-hover:text-foreground transition-colors">{name}</span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: { name: string; icon: PillIcon; color?: string }[];
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
          <TechPill key={i} name={item.name} icon={item.icon} color={item.color} />
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ── Left: Content card ── */}
          <div className="card-hover rounded-3xl p-10 md:p-12 bg-white border border-border/50 shadow-sm relative overflow-hidden flex flex-col justify-center">
            {/* Subtle glow */}
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 border border-primary/30 bg-white rounded-full shadow-sm">
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
            </div>
          </div>

          {/* ── Right: Infinite Marquee Rows ── */}
          <div className="relative overflow-hidden flex flex-col justify-center">
            {/* Fade masks */}
            <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="py-10 flex flex-col gap-4">
              <MarqueeRow items={row1} direction="left" speed={24} />
              <MarqueeRow items={row2} direction="right" speed={28} />
              <MarqueeRow items={row3} direction="left" speed={22} />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
