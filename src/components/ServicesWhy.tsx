import { AnimatedSection } from "./AnimatedSection";
import { CheckCircle2, Zap, HeartHandshake, BarChart2 } from "lucide-react";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Results Over Promises",
    description:
      "We don't pitch vanity metrics. Every deliverable is tied to business outcomes — leads, conversions, and revenue.",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description:
      "Rapid delivery cycles with rigorous quality gates. We ship fast because we plan well — never rushed, never sloppy.",
  },
  {
    icon: HeartHandshake,
    title: "True Partnership",
    description:
      "We embed into your team. You'll have a dedicated point of contact, full transparency, and weekly progress reviews.",
  },
  {
    icon: BarChart2,
    title: "Data at Every Step",
    description:
      "From strategy through post-launch, every decision is backed by real analytics — A/B tests, heatmaps, and user data.",
  },
];

const differentiators = [
  "5+ years of cross-industry experience",
  "In-house designers, developers & marketers",
  "Dedicated account manager for every client",
  "Post-launch support & maintenance included",
  "Transparent pricing — no hidden fees",
  "Proven frameworks refined across 250+ projects",
];

export function ServicesWhy() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* subtle blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">

        {/* Header */}
        <div className="relative mb-16">
          <div className="absolute -top-8 -left-8 -right-8 h-[1.5px] dashed-x" />
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8">
            <div className="max-w-xl">
              <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
                WHY VIBE VENTURE
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold leading-[1.1] tracking-tight">
                Built Different.<br />
                <span className="text-primary">Proven to Perform.</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-muted-foreground text-base leading-relaxed">
                Hundreds of brands have trusted us to build, grow, and scale. Here's what sets us apart.
              </p>
            </div>
          </AnimatedSection>
          <div className="absolute -bottom-8 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>

        {/* Two-column layout: reasons grid + differentiators list */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-0 border-l border-t border-dashed border-border/60">

          {/* Left — 2×2 reasons */}
          <div className="border-r border-b border-dashed border-border/60 grid grid-cols-1 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 0.08}
                  className={`border-r border-b border-dashed border-border/60 ${index % 2 === 1 ? "sm:border-r-0" : ""}`}
                >
                  <div className="p-7 flex flex-col gap-4 h-full group hover:bg-primary/3 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1.5 tracking-tight group-hover:text-primary transition-colors duration-200">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Right — differentiators checklist */}
          <AnimatedSection delay={0.2} className="border-r border-b border-dashed border-border/60">
            <div className="p-8 lg:p-10 flex flex-col justify-center h-full gap-6">
              <p className="text-[11px] font-bold tracking-widest text-muted-foreground/50 uppercase">
                AT A GLANCE
              </p>
              <ul className="flex flex-col gap-0 border-t border-dashed border-border/60">
                {differentiators.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 py-4 border-b border-dashed border-border/60 group"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-primary">
                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

        </div>

        {/* Bottom border spacer */}
        <div className="relative mt-0">
          <div className="absolute top-0 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>

      </div>
    </section>
  );
}
