import { AnimatedSection } from "./AnimatedSection";
import { SecondaryHero } from "./SecondaryHero";
import { Layers, Users, Trophy, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "100+", label: "Businesses Served" },
  { icon: Trophy, value: "250+", label: "Projects Delivered" },
  { icon: Clock, value: "1+", label: "Years of Excellence" },
  { icon: Layers, value: "4", label: "Core Service Lines" },
];

export function ServicesHero() {
  return (
    <>
      <SecondaryHero
        eyebrow="Our Services"
        title={
          <>
            Digital Services That<br />
            <span className="text-primary">Drive Real Growth</span>
          </>
        }
        subtitle="From strategy and design to development and marketing — we deliver end-to-end digital solutions that help brands grow, scale, and stand out."
        ctas={[
          { text: "Get A Free Consultation", href: "/contact" },
          { text: "Explore Services", href: "#services", variant: "secondary" },
        ]}
      />

      {/* Stats strip — dashed borders top & bottom */}
      <div className="relative bg-background">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-dashed border-border/60">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={0.1 + index * 0.08}
                  className="border-r border-dashed border-border/60"
                >
                  <div className="flex items-center gap-4 py-8 px-6">
                    <div className="flex items-center justify-center text-primary shrink-0">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-foreground leading-none mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
