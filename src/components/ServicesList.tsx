import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { services } from "@/data/services";

export function ServicesList() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="services-list">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="relative mb-16">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="WHAT WE DO"
              title="Everything You Need, Under One Roof"
              subtitle="Seven core disciplines, each backed by senior specialists and a track record of shipping products that perform."
              className="mx-auto text-center items-center"
            />
          </AnimatedSection>
        </div>

        <div className="divide-y divide-dashed divide-border/80">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.slug} delay={i * 0.05} className="py-12 first:pt-0 last:pb-0">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Main service */}
                  <div className="lg:w-80 shrink-0">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5">
                      <Icon size={28} />
                    </div>
                    <Link href={`/${service.slug}`} className="group">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                      {service.description}
                    </p>
                  </div>

                  {/* Sub-services */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
                    {service.subServices.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.slug}
                          href={`/${service.slug}/${sub.slug}`}
                          className="card-hover flex flex-col items-center text-center gap-2.5 p-5 bg-white rounded-xl border border-border/50 shadow-sm"
                        >
                          <div className="flex items-center justify-center text-primary">
                            <SubIcon size={22} />
                          </div>
                          <span className="text-sm font-medium text-foreground/80">{sub.name}</span>
                        </Link>
                      );
                    })}
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
