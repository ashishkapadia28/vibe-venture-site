import { Navbar } from "@/components/Navbar";
import { SecondaryHero } from "@/components/SecondaryHero";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { Building2, Shield, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import { createClient } from "@supabase/supabase-js";

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

export const dynamic = 'force-dynamic';

export default async function IndustryPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "dummy";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: dbIndustries } = await supabase
    .from('industries')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <>
      <Navbar />
      <main className="flex-1" id="industries">
        
        {/* ─── HERO SECTION ─── */}
        <SecondaryHero
          eyebrow="Industries We Transform"
          title={
            <>
              Tailored Solutions for <br />
              <span className="text-primary">Every Vertical</span>
            </>
          }
          subtitle="We combine deep industry expertise with cutting-edge engineering to build digital products that solve complex challenges and drive measurable growth."
          ctas={[
            { text: "Get A Free Consultation", href: "/contact" },
            { text: "Explore Industries", href: "#industries", variant: "secondary" },
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

        {/* ─── INDUSTRIES SHOWCASE ─── */}
        <IndustryShowcase dbIndustries={dbIndustries || []} />

        {/* ─── WHY US SECTION ─── */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4">
                  Why industry leaders choose <span className="text-primary">Vibe Venture</span>
                </h2>
                <p className="text-foreground/70 text-lg">
                  We don&apos;t just write code; we understand business models.
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
