import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import Link from "next/link";
import {
  Code2,
  Smartphone,
  PenTool,
  Megaphone,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    tag: "01",
    title: "Web Development",
    description:
      "Tailor-made websites and web apps built with Next.js, React, and modern stacks — engineered for speed, conversion, and scale.",
    href: "/services/web",
    highlight: true,
  },
  {
    icon: Smartphone,
    tag: "02",
    title: "Mobile Apps",
    description:
      "Native and cross-platform iOS & Android apps built for seamless user experiences and high retention.",
    href: "/services/mobile",
  },
  {
    icon: PenTool,
    tag: "03",
    title: "UI/UX Design",
    description:
      "User-centric design systems, wireframes, and pixel-perfect interfaces that make your product intuitive and beautiful.",
    href: "/services/design",
  },
  {
    icon: Megaphone,
    tag: "04",
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across SEO, paid ads, and social media to drive real ROI and sustainable growth.",
    href: "/services/marketing",
  },
  {
    icon: BarChart3,
    tag: "05",
    title: "Analytics & Strategy",
    description:
      "Deep insights and performance dashboards that turn raw data into clear decisions for your business.",
    href: "/services/analytics",
  },
  {
    icon: Shield,
    tag: "06",
    title: "Secure & Scalable Infrastructure",
    description:
      "Enterprise-grade cloud architecture, security audits, and DevOps pipelines built to grow with you.",
    href: "/services/infrastructure",
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
            const Icon = service.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.08} className="h-full">
                <Link
                  href={service.href}
                  className="group relative flex flex-col gap-5 p-8 h-full min-h-[220px] bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 overflow-hidden"
                >
                  {/* Tag number */}
                  <span className="text-[11px] font-bold tracking-widest text-muted-foreground/50 uppercase relative z-10">
                    {service.tag}
                  </span>

                  {/* Icon */}
                  <div className="text-primary relative z-10 mb-1">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow link */}
                  <div className="flex items-center gap-1 text-primary text-[13px] font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 relative z-10">
                    Learn more
                    <ArrowRight size={14} />
                  </div>

                  {/* Hover subtle glow at top right */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom border + CTA strip */}
        <div className="relative mt-0">
          <AnimatedSection className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 pb-2">
            <p className="text-muted-foreground text-sm">
              Don't see what you need?{" "}
              <Link href="/contact" className="text-primary font-semibold hover:underline underline-offset-4">
                Let's talk
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
