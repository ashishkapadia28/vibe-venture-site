import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const services = [
  {
    image: "/Illustration/Services/Custom Web Development.png",
    title: "Custom Web Development",
    description:
      "Tailor-made websites and web apps built with Next.js, React, and modern stacks — engineered for speed, conversion, and scale.",
    href: "/services",
    highlight: true,
  },
  {
    image: "/Illustration/Services/SaaS Development.png",
    title: "SaaS Development",
    description:
      "Multi-tenant, subscription-ready SaaS products built to scale from first user to full growth.",
    href: "/services",
  },
  {
    image: "/Illustration/Services/Mobile App Development.png",
    title: "Mobile App Development",
    description:
      "Native and cross-platform iOS & Android apps built for seamless user experiences and high retention.",
    href: "/services",
  },
  {
    image: "/Illustration/Services/AI Automation.png",
    title: "AI Automation",
    description:
      "Automated pipelines that connect your tools and eliminate repetitive manual work.",
    href: "/services",
  },
  {
    image: "/Illustration/Services/Ecommerce Development.png",
    title: "Ecommerce Development",
    description:
      "End-to-end online store builds — catalog, checkout, and payments — built to convert.",
    href: "/services",
  },
  {
    image: "/Illustration/Services/UI-UX Design.png",
    title: "UI/UX Design",
    description:
      "User-centric design systems, wireframes, and pixel-perfect interfaces that make your product intuitive and beautiful.",
    href: "/services",
  },
  {
    image: "/Illustration/Services/Branding & Creative.png",
    title: "Branding & Creative",
    description:
      "Brand identity, logo design, and creative assets that make your business memorable.",
    href: "/services",
  },
  {
    image: "/Illustration/Services/Conversion Rate Optimization.png",
    title: "Conversion Rate Optimization",
    description:
      "Data-driven A/B testing and UX refinements that turn more visitors into paying customers.",
    href: "/services",
  },
  {
    image: "/Illustration/Services/API & Integrations Development.png",
    title: "API & Integrations Development",
    description:
      "Custom APIs and third-party integrations that connect your stack and keep data flowing.",
    href: "/services",
  },
];

export function Features() {
  return (
    <section className="py-24 relative bg-background overflow-hidden">
      {/* Subtle background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">

        <div className="relative mb-16">
          <AnimatedSection>
            <SectionHeader
              badge="WHAT WE DO"
              title={<>Services Built for<br /><span className="text-primary">Real Results</span></>}
              subtitle="We combine strategy, design, and technology to help brands grow — from zero to scale."
            />
          </AnimatedSection>
        </div>

        {/* Services Grid — shadow cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

          {services.map((service, index) => {
            return (
              <AnimatedSection key={index} delay={index * 0.08} className="h-full">
                <Link
                  href={service.href}
                  className="card-hover group relative flex flex-col gap-3 p-6 h-full bg-white rounded-2xl shadow-sm border border-border/50"
                >
                  {/* Illustration */}
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={service.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-semibold text-foreground tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom border + CTA strip */}
        <div className="relative mt-0">
          <AnimatedSection className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 pb-2">
            <p className="text-muted-foreground text-sm">
              Don&apos;t see what you need?{" "}
              <Link href="/contact" className="text-primary font-semibold hover:underline underline-offset-4">
                Let&apos;s talk
              </Link>
            </p>
            <Link
              href="/services"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center justify-center gap-1.5 group"
            >
              View All Services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}
