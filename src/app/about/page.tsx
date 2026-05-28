import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { TechStack } from "@/components/TechStack";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Trophy,
  Clock,
  Layers,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  CheckCircle2,
  Rocket,
  Target,
  HeartHandshake,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vibe Venture",
  description:
    "Meet the team behind Vibe Venture — a digital agency built on precision engineering, bold design, and a relentless drive to help businesses grow.",
};

const stats = [
  { icon: Users, value: "100+", label: "Businesses Served" },
  { icon: Trophy, value: "250+", label: "Projects Delivered" },
  { icon: Clock, value: "5+", label: "Years of Excellence" },
  { icon: Layers, value: "99%", label: "Client Satisfaction" },
];

const values = [
  {
    icon: Zap,
    title: "Move Fast, Build Right",
    description:
      "We ship with speed without sacrificing quality. Rapid delivery backed by rigorous engineering standards.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description:
      "Every solution is architected for longevity — scalable infrastructure, clean codebases, and future-ready stacks.",
  },
  {
    icon: TrendingUp,
    title: "Growth-First Thinking",
    description:
      "We don't just build products. We build engines for growth — optimizing for outcomes, not just outputs.",
  },
  {
    icon: HeartHandshake,
    title: "Partners, Not Vendors",
    description:
      "Your success is our success. We become true partners invested in every milestone of your digital journey.",
  },
  {
    icon: Target,
    title: "Precision Engineering",
    description:
      "We obsess over details that most miss — performance, accessibility, security, and pixel-perfect UX.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "With clients across continents, we bring cross-industry insights and international best practices to every project.",
  },
];


const techStack = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "Flutter",
  "PostgreSQL", "Redis", "AWS", "Vercel", "Docker", "Figma",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="about">

        {/* ─── HERO ─── */}
        <section className="relative pt-32 pb-0 overflow-hidden bg-background">
          {/* Background blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-x-1/2" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] translate-x-1/3" />
            <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] -translate-x-1/2" />
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
            <div className="max-w-4xl pt-8 pb-16">
              <AnimatedSection delay={0.05}>
                <div className="inline-flex items-center gap-2.5 px-3 py-1 mb-8 border border-dashed border-primary/40 bg-primary/5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                  <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
                    About Vibe Venture
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <h1 className="text-5xl md:text-6xl lg:text-[72px] font-heading font-bold mb-6 leading-[1.05] tracking-tight">
                  We Don't Just Build Websites.{" "}
                  <br className="hidden md:block" />
                  <span className="text-primary">We Build Growth Engines.</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.25}>
                <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl font-medium leading-relaxed">
                  Vibe Venture is a next-generation digital agency — fusing precision engineering with bold design to help ambitious businesses dominate their digital landscape.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.35} className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group"
                >
                  Start a Project
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-dashed border-border/80 bg-transparent text-foreground font-medium text-[15px] transition-all duration-300 hover:border-primary/60 hover:text-primary flex items-center justify-center gap-2 group"
                >
                  Our Services
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            </div>
          </div>

          {/* Stats strip */}
          <div className="relative">
            <div className="dashed-x w-full" />
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-dashed border-border/60">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <AnimatedSection
                      key={i}
                      delay={0.1 + i * 0.08}
                      className="border-r border-dashed border-border/60"
                    >
                      <div className="flex items-center gap-4 py-8 px-6">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
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

        {/* ─── OUR STORY ─── */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-dashed border-border/80">
              {/* Left – story text */}
              <div className="lg:col-span-7 p-10 md:p-16 bg-secondary/10 border-b lg:border-b-0 lg:border-r border-dashed border-border/80">
                <AnimatedSection delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-6 border border-dashed border-primary/40 bg-primary/5 rounded-md">
                    <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Our Story</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
                    Born from a conviction that digital <span className="text-primary">should be exceptional.</span>
                  </h2>
                  <p className="text-foreground/70 mb-5 leading-relaxed">
                    We started Vibe Venture because we saw too many businesses settling for mediocre digital experiences — slow websites, generic apps, and marketing that blends into the noise. We knew we could do better.
                  </p>
                  <p className="text-foreground/70 mb-5 leading-relaxed">
                    Our team of engineers, designers, and growth strategists come together with one shared mission: to build digital products that don't just work — they win.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    Today, we serve businesses across the globe, from ambitious startups to established enterprises, helping each one harness the full power of technology to grow faster and smarter.
                  </p>
                </AnimatedSection>
              </div>

              {/* Right – founder note / mission */}
              <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-between gap-8">
                <AnimatedSection delay={0.2}>
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-6 border border-dashed border-primary/40 bg-primary/5 rounded-md">
                      <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Our Mission</span>
                    </div>
                    <p className="text-2xl font-heading font-bold leading-snug">
                      "Empower businesses to thrive in the digital era through{" "}
                      <span className="text-primary">exceptional engineering</span> and{" "}
                      <span className="text-primary">bold design.</span>"
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-dashed border-border/80 pt-8">
                    {[
                      "100% custom-built solutions, no templates",
                      "Senior engineers & designers on every project",
                      "Results-driven approach with measurable KPIs",
                      "Transparent communication, always",
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{point}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CORE VALUES ─── */}
        <section className="py-24 bg-background relative">
          <div className="dashed-x w-full absolute top-0" />
          <div className="dashed-x w-full absolute bottom-0" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 border border-dashed border-primary/40 bg-primary/5 rounded-full">
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Our Values</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                  The principles that drive every pixel and every line of code
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-dashed border-border/80">
              {values.map((value, i) => {
                const Icon = value.icon;
                const isBottomRow = i >= 3;
                const isLastInRow = (i + 1) % 3 === 0;
                return (
                  <AnimatedSection
                    key={i}
                    delay={0.05 * i}
                    className={`p-8 md:p-10 group hover:bg-primary/5 transition-colors duration-300 ${!isLastInRow ? "border-r border-dashed border-border/80" : ""} ${!isBottomRow ? "border-b border-dashed border-border/80" : ""}`}
                  >
                    <div className="w-12 h-12 bg-primary/10 border border-dashed border-primary/30 rounded-md flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-heading font-bold mb-3">{value.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{value.description}</p>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── TECH STACK MARQUEE ─── */}
        <TechStack />

        {/* ─── MINI CTA STRIP ─── */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
