import { Navbar } from "@/components/Navbar";
import { SecondaryHero } from "@/components/SecondaryHero";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/CTA";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Vibe Venture",
  description: "Explore our success stories and see how we help businesses solve complex problems and drive measurable growth through digital innovation.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="case-studies">
        <SecondaryHero
          eyebrow="Case Studies"
          title={
            <>
              Real Projects.<br />
              <span className="text-primary">Real Results.</span>
            </>
          }
          subtitle="We don't just build software. We engineer solutions that transform operations, accelerate growth, and drive massive ROI for our partners."
          ctas={[
            { text: "Start Your Project", href: "/contact" },
            { text: "Explore Work", href: "#portfolio", variant: "secondary" },
          ]}
        />

        <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
            <div className="relative mb-20">
              <AnimatedSection>
                <SectionHeader
                  alignment="center"
                  badge="OUR WORK"
                  title="Projects We're Proud Of"
                  subtitle="A look at real projects we've designed and built for real businesses."
                  className="mx-auto text-center items-center"
                />
              </AnimatedSection>
            </div>

            <div className="flex flex-col gap-8">
              {caseStudies.map((study, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <AnimatedSection key={study.slug} delay={0.05}>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="card-hover group grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-4xl overflow-hidden border border-border/50 shadow-sm bg-linear-to-br from-primary/8 via-white to-primary/5 lg:min-h-105"
                    >
                      <div className={cn("lg:col-span-6 flex flex-col justify-center p-8 lg:pt-9 lg:pb-10 lg:pl-9.5", isReversed && "lg:order-2")}>
                        <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
                          {study.tag}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 tracking-tight">
                          {study.title}
                        </h2>
                        <div className="space-y-4 mb-8">
                          {study.description.map((p, i) => (
                            <p key={i} className="text-muted-foreground leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          More Details
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>

                      <div
                        className={cn(
                          "relative lg:col-span-6 min-h-70 lg:my-5 rounded-3xl overflow-hidden",
                          isReversed ? "lg:order-1 lg:ml-5" : "lg:mr-5"
                        )}
                      >
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
