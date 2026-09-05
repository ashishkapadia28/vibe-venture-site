import { Navbar } from "@/components/Navbar";
import { SecondaryHero } from "@/components/SecondaryHero";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { ContactSection } from "@/components/ContactSection";
import { StoryMissionSection } from "@/components/StoryMissionSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { TbBrandLinkedin } from "react-icons/tb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vibe Venture",
  description:
    "Meet the team behind Vibe Venture — a digital agency built on precision engineering, bold design, and a relentless drive to help businesses grow.",
};

const values = [
  {
    image: "/Illustration/about/move_fast_build_right.png",
    title: "Move Fast, Build Right",
    description:
      "We ship with speed without sacrificing quality. Rapid delivery backed by rigorous engineering standards.",
  },
  {
    image: "/Illustration/about/built_to_last.png",
    title: "Built to Last",
    description:
      "Every solution is architected for longevity — scalable infrastructure, clean codebases, and future-ready stacks.",
  },
  {
    image: "/Illustration/about/growth_first_thinking.png",
    title: "Growth-First Thinking",
    description:
      "We don't just build products. We build engines for growth — optimizing for outcomes, not just outputs.",
  },
  {
    image: "/Illustration/about/partners_not_endors.png",
    title: "Partners, Not Vendors",
    description:
      "Your success is our success. We become true partners invested in every milestone of your digital journey.",
  },
  {
    image: "/Illustration/about/precision_engineering.png",
    title: "Precision Engineering",
    description:
      "We obsess over details that most miss — performance, accessibility, security, and pixel-perfect UX.",
  },
  {
    image: "/Illustration/about/global_perspective.png",
    title: "Global Perspective",
    description:
      "With clients across continents, we bring cross-industry insights and international best practices to every project.",
  },
];

const founders = [
  {
    name: "Ashish Kapadia",
    title: "CEO & Co-Founder",
    bio: "Co-founded Vibe Venture to help ambitious brands build digital products that actually move the needle — not just look good.",
    photo: "/ashish_kapadia.png",
    linkedin: "https://www.linkedin.com/in/ashish-kapadiya/",
  },
  {
    name: "Sibtain Nadolia",
    title: "Co-Founder",
    bio: "Co-founded Vibe Venture with a focus on turning bold ideas into scalable, well-engineered products.",
    photo: "/sibtain_nadolia.png",
    linkedin: "https://www.linkedin.com/in/sibtainnandoliya",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="about">

        {/* ─── HERO ─── */}
        <SecondaryHero
          eyebrow="About Vibe Venture"
          title={
            <>
              We Don&apos;t Just Build Products.{" "}
              <br className="hidden md:block" />
              <span className="text-primary">We Build Growth Engines.</span>
            </>
          }
          subtitle="Vibe Venture is a next-generation digital agency — fusing precision engineering with bold design to help ambitious businesses dominate their digital landscape."
          ctas={[
            { text: "Start a Project", href: "/contact" },
            { text: "Our Services", href: "/services", variant: "secondary" },
          ]}
        />

        {/* ─── BRAND INTRO ─── */}
        <section className="relative pt-20 pb-4 md:pt-24 overflow-hidden bg-background">
          {/* Giant faint background icon */}
          <div className="absolute -bottom-20 -right-20 w-125 h-125 opacity-[0.05] rotate-12 pointer-events-none">
            <Image src="/vibe_venture_Icon.svg" alt="" fill className="object-contain" />
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
            <AnimatedSection>
              <div className="flex items-center gap-11 mb-6">
                <Image
                  src="/vibe_venture_Icon.svg"
                  alt="Vibe Venture"
                  width={128}
                  height={134}
                  className="shrink-0"
                />
                <div>
                  <p className="text-lg text-foreground/60 font-medium leading-none">Vibe Venture —</p>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mt-1">
                    Built With Intent
                  </h2>
                </div>
              </div>
              <div className="space-y-4 max-w-3xl">
                <p className="text-foreground/70 leading-relaxed">
                  Vibe Venture is a full-service web, app &amp; AI development agency built for brands that refuse to blend in. We partner with startups, growing businesses, and enterprises to design, engineer, and scale digital products — from high-performance websites and mobile apps to custom software and AI-driven automation. Every engagement starts with a simple question: what will actually move the needle for your business, not just your brand.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Our team of senior engineers, designers, and growth strategists works as an extension of yours — no templates, no cookie-cutter playbooks, no juniors learning on your dime. We combine precision engineering with bold, conversion-focused design so that everything we ship is measured against real outcomes: faster load times, higher conversions, stronger retention, and revenue you can actually track back to the work.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  What sets Vibe Venture apart is intent. We don&apos;t chase trends or pad timelines — we scope tight, build fast, and iterate based on data, not guesswork. Whether you need a scalable e-commerce platform, a custom SaaS product, an AI automation pipeline, or a complete brand and UI/UX overhaul, we bring the technical depth and strategic clarity to get it right the first time. That&apos;s what &ldquo;Built With Intent&rdquo; means to us.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── OUR STORY / OUR MISSION ─── */}
        <StoryMissionSection />

        {/* ─── CORE VALUES ─── */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Subtle background gradient blobs */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-150 h-150 bg-primary/5 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />
          </div>

          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
            <div className="relative mb-16">
              <AnimatedSection>
                <SectionHeader
                  alignment="center"
                  badge="OUR VALUES"
                  title="The principles that drive every pixel and every line of code"
                  subtitle="These aren't wall posters — they're how every project, sprint, and decision at Vibe Venture actually gets made."
                  className="mx-auto text-center items-center"
                />
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <AnimatedSection key={i} delay={i * 0.08} className="h-full">
                  <div className="card-hover group relative flex flex-col gap-3 p-6 h-full bg-white rounded-2xl shadow-sm border border-border/50">
                    {/* Illustration */}
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={value.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg font-semibold text-foreground tracking-tight">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MEET OUR FOUNDERS ─── */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
            <div className="relative mb-16">
              <AnimatedSection>
                <SectionHeader
                  alignment="center"
                  badge="MEET THE TEAM"
                  title="Meet Our Founders"
                  subtitle="The two people behind every decision, every line of code, and every client relationship at Vibe Venture."
                  className="mx-auto text-center items-center"
                />
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-425 mx-auto">
              {founders.map((founder, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="group relative w-full aspect-7/6 rounded-2xl overflow-hidden bg-secondary/20 shadow-sm">
                    {/* Photo */}
                    {founder.photo ? (
                      <Image
                        src={founder.photo}
                        alt={founder.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <span className="text-4xl font-heading font-bold text-primary/25">
                          {founder.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="text-[11px] tracking-widest uppercase text-muted-foreground/70">
                          Photo coming soon
                        </span>
                      </div>
                    )}

                    {/* Overlaid content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-white">{founder.name}</h3>
                          <p className="text-sm text-white/70">{founder.title}</p>
                        </div>
                        <Link
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${founder.name} on LinkedIn`}
                          className="shrink-0 flex items-center justify-center text-white hover:text-primary transition-colors"
                        >
                          <TbBrandLinkedin size={24} />
                        </Link>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{founder.bio}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LET'S COLLABORATE ─── */}
        <ContactSection />

        {/* ─── MINI CTA STRIP ─── */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
