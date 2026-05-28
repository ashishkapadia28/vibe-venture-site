import { AnimatedSection } from "./AnimatedSection";
import Link from "next/link";
import { ArrowRight, Layers, Users, Trophy, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "100+", label: "Businesses Served" },
  { icon: Trophy, value: "250+", label: "Projects Delivered" },
  { icon: Clock, value: "5+", label: "Years of Excellence" },
  { icon: Layers, value: "4", label: "Core Service Lines" },
];

export function ServicesHero() {
  return (
    <section className="relative pt-32 pb-0 overflow-hidden bg-background">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-x-1/3" />
      </div>

      <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        {/* Hero text block */}
        <div className="max-w-4xl pt-8 pb-16">
          <AnimatedSection delay={0.1}>
            <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6">
              OUR SERVICES
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-heading font-bold mb-6 leading-[1.1] tracking-tight">
              Digital Services That<br />
              <span className="text-primary">Drive Real Growth</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl font-medium leading-relaxed">
              From strategy and design to development and marketing — we deliver end-to-end digital solutions that help brands grow, scale, and stand out.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center justify-center gap-2 group"
            >
              Get A Free Consultation
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-border bg-transparent text-foreground font-medium text-[15px] transition-all duration-300 hover:border-foreground/40 flex items-center justify-center gap-2 group"
            >
              Explore Services
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </div>

      {/* Stats strip — dashed borders top & bottom */}
      <div className="relative">
        <div className="dashed-x w-full" />
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
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={20} strokeWidth={1.75} />
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
        <div className="dashed-x w-full" />
      </div>
    </section>
  );
}
