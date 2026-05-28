import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { Building2, Shield, TrendingUp, ArrowRight, Users } from "lucide-react";
import type { Metadata } from "next";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries | Vibe Venture",
  description: "Discover how Vibe Venture transforms businesses across finance, healthcare, e-commerce, logistics, and more with cutting-edge digital solutions.",
};

const stats = [
  { icon: Building2, value: "10+", label: "Industries Served" },
  { icon: Shield, value: "100%", label: "Compliant Systems" },
  { icon: TrendingUp, value: "2x", label: "Average Growth" },
  { icon: Users, value: "50+", label: "Enterprise Partners" },
];

export default function IndustryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="industries">
        
        {/* ─── HERO SECTION ─── */}
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
                  INDUSTRIES WE TRANSFORM
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                  Tailored Solutions for <br />
                  <span className="text-primary">Every Vertical</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl font-medium leading-relaxed">
                  We combine deep industry expertise with cutting-edge engineering to build digital products that solve complex challenges and drive measurable growth.
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
                  href="#industries"
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-border bg-transparent text-foreground font-medium text-[15px] transition-all duration-300 hover:border-foreground/40 flex items-center justify-center gap-2 group"
                >
                  Explore Industries
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

        {/* ─── INDUSTRIES SHOWCASE ─── */}
        <IndustryShowcase />

        {/* ─── WHY US SECTION ─── */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4">
                  Why industry leaders choose <span className="text-primary">Vibe Venture</span>
                </h2>
                <p className="text-foreground/70 text-lg">
                  We don't just write code; we understand business models.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-dashed border-border/80">
              <AnimatedSection className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-dashed border-border/80">
                <div className="text-primary mb-6">
                  <Building2 size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Domain Expertise</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Our teams are structured around industry verticals, bringing deep domain knowledge to your specific business challenges.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-dashed border-border/80">
                <div className="text-primary mb-6">
                  <Shield size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Enterprise Security</h3>
                <p className="text-foreground/70 leading-relaxed">
                  From GDPR to HIPAA, we build with compliance and security as foundational pillars, not afterthoughts.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="p-8 md:p-10">
                <div className="text-primary mb-6">
                  <TrendingUp size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Scalable Architecture</h3>
                <p className="text-foreground/70 leading-relaxed">
                  We architect systems that can handle your growth trajectory, ensuring zero downtime during critical scaling phases.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
