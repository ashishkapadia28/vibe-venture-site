import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SecondaryHero } from "@/components/SecondaryHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { Gauge, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tools | Vibe Venture",
  description: "Free tools from Vibe Venture to help you understand and improve your website.",
};

const tools = [
  {
    icon: Gauge,
    name: "Website Checker",
    description: "Get a free, instant analysis of your website's performance, SEO, and mobile-friendliness.",
    href: "/tools/website-checker",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="tools">
        <SecondaryHero
          eyebrow="Free Tools"
          title="Tools Built to Help You Grow"
          subtitle="Free, practical tools from Vibe Venture — no signup required to get started."
        />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tools.map((tool, i) => (
                <AnimatedSection key={tool.name} delay={i * 0.08}>
                  <Link
                    href={tool.href}
                    className="card-hover group flex flex-col gap-4 p-6 h-full bg-white rounded-2xl shadow-sm border border-border/50"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                      <tool.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Try it free
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
