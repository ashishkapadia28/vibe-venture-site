import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { Search, Lightbulb, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";
import type { ProcessStep } from "@/data/services";

const stepIcons = [Search, Lightbulb, PenTool, Code2, Rocket, TrendingUp];

export function ServiceProcess({ name, steps }: { name: string; steps: ProcessStep[] }) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="relative mb-16">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="HOW WE WORK"
              title={`Our ${name} Process`}
              subtitle={`${steps.length} clear steps — from first conversation to long-term growth. No fluff, no surprises.`}
              className="mx-auto text-center items-center"
            />
          </AnimatedSection>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            const number = String(index + 1).padStart(2, "0");
            return (
              <AnimatedSection key={index} delay={index * 0.08} className="h-full">
                <div className="card-hover group p-8 flex flex-col gap-5 h-full bg-white rounded-2xl shadow-sm border border-border/50">
                  <div className="flex items-center justify-end">
                    <div className="text-primary mt-1">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="relative">
                    <span className="text-[72px] font-heading font-black text-border/40 leading-none select-none absolute -top-2 -left-1 group-hover:text-primary/10 transition-colors duration-300">
                      {number}
                    </span>
                    <div className="relative z-10 pt-8">
                      <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
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
      </div>
    </section>
  );
}
