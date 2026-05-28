import { AnimatedSection } from "./AnimatedSection";
import { Search, Lightbulb, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We dive deep into your business, goals, and audience to build a clear picture of what success looks like.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy",
    description:
      "We define a tailored roadmap — the right channels, tech stack, and approach to hit your targets.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design",
    description:
      "Pixel-perfect wireframes and design systems crafted to be intuitive, branded, and conversion-focused.",
  },
  {
    number: "04",
    icon: Code2,
    title: "Build",
    description:
      "Clean, scalable code using modern frameworks. Every feature engineered for performance and reliability.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    description:
      "Rigorous QA, staging review, and a smooth go-live. We handle the deployment so you don't have to.",
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "Grow",
    description:
      "Post-launch support, analytics, and optimisation to keep your product improving and your metrics climbing.",
  },
];

export function ServicesProcess() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">

        {/* Section Header */}
        <div className="relative mb-16">
          <div className="absolute -top-8 -left-8 -right-8 h-[1.5px] dashed-x" />
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8">
            <div className="max-w-xl">
              <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
                HOW WE WORK
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold leading-[1.1] tracking-tight">
                A Process Built<br />
                <span className="text-primary">for Clarity & Speed</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-muted-foreground text-base leading-relaxed">
                Six clear steps — from first conversation to long-term growth. No fluff, no surprises.
              </p>
            </div>
          </AnimatedSection>
          <div className="absolute -bottom-8 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 border-l border-t border-dashed border-border/60">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimatedSection
                key={index}
                delay={index * 0.08}
                className="border-r border-b border-dashed border-border/60"
              >
                <div className="p-8 flex flex-col gap-5 h-full group hover:bg-primary/3 transition-colors duration-300">
                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-widest text-muted-foreground/50 uppercase">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Large step number watermark */}
                  <div className="relative">
                    <span className="text-[72px] font-heading font-black text-border/40 leading-none select-none absolute -top-2 -left-1 group-hover:text-primary/10 transition-colors duration-300">
                      {step.number}
                    </span>
                    <div className="relative z-10 pt-8">
                      <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-200">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom border */}
        <div className="relative mt-0">
          <div className="absolute top-0 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>

      </div>
    </section>
  );
}
