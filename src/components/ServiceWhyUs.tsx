import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import type { WhyPoint } from "@/data/services";

const lgColsByCount: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
};

export function ServiceWhyUs({ name, whyPoints }: { name: string; whyPoints: WhyPoint[] }) {
  const lgCols = lgColsByCount[whyPoints.length] ?? "lg:grid-cols-4";

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="relative mb-16">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="WHY US"
              title={`Why ${name} With Vibe Venture`}
              subtitle="Here's what sets our approach apart — and why clients trust us to deliver."
              className="mx-auto text-center items-center"
            />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.1}>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60`}>
            {whyPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <div key={i} className="card-hover bg-white p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-primary" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-muted-foreground/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
