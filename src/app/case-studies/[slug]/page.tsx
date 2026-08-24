import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface CaseStudyMetric {
  label: string;
  value: string;
}

interface CaseStudy {
  id: number | string;
  slug?: string;
  tag?: string;
  title: string;
  role?: string;
  industry?: string;
  timeline?: string | number;
  tech?: string[];
  overview?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  image?: string;
  metrics?: CaseStudyMetric[];
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  const baseUrl = process.env.ADMIN_API_URL || "http://localhost:3001";
  const apiUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  try {
    // Next dedupes identical fetches within the same request, so calling this
    // from both generateMetadata and the page component only hits the network once.
    const res = await fetch(`${apiUrl}/api/case-studies?is_published=true`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Failed to fetch case studies for detail page:", err);
    return [];
  }
}

function findStudy(caseStudies: CaseStudy[], slug: string) {
  const studyIndex = caseStudies.findIndex((s) => s.id.toString() === slug || s.slug === slug);
  const study = studyIndex !== -1 ? caseStudies[studyIndex] : null;
  return { study, studyIndex };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudies = await getCaseStudies();
  const { study } = findStudy(caseStudies, slug);

  if (!study) {
    return { title: "Case Study | Vibe Venture" };
  }

  const description = study.overview || study.impact || `See how Vibe Venture delivered results for this ${study.industry || ""} project.`.trim();

  return {
    title: `${study.title} | Vibe Venture Case Studies`,
    description,
    openGraph: {
      title: study.title,
      description,
      images: study.image ? [{ url: study.image, width: 1200, height: 630, alt: study.title }] : undefined,
      type: "article",
    },
  };
}

// Deep, immersive case study storytelling
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const caseStudies = await getCaseStudies();
  const { study, studyIndex } = findStudy(caseStudies, slug);

  const nextStudyIndex = caseStudies.length > 1 ? (studyIndex + 1) % caseStudies.length : -1;
  const nextProject = nextStudyIndex !== -1 ? caseStudies[nextStudyIndex] : null;

  if (!study) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="case-study-details">
        
        {/* ─── HERO SECTION ─── */}
        <section className="relative pt-32 pb-24 overflow-hidden min-h-[70vh] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src={study.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"} 
              alt={study.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background z-10" />
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10" />
          </div>

          <div className="container relative z-20 mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection>
              <Link 
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-12"
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </Link>
            </AnimatedSection>

            <div className="max-w-4xl">
              <AnimatedSection delay={0.1}>
                <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-primary" />
                  {study.tag}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-heading font-bold mb-6 leading-[1.1] tracking-tight text-foreground">
                  {study.title}
                </h1>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ─── PROJECT OVERVIEW GRID (BLUEPRINT STYLE) ─── */}
        <section className="relative z-20 -mt-16 mb-24">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection delay={0.3} className="bg-background relative">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
                
                {/* Role */}
                <div className="p-8 relative">
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Scope of Work</p>
                  <p className="font-medium text-foreground">{study.role}</p>
                </div>

                {/* Industry */}
                <div className="p-8 relative">
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Industry</p>
                  <p className="font-medium text-foreground">{study.industry}</p>
                </div>

                {/* Timeline */}
                <div className="p-8 relative">
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Timeline</p>
                  <p className="font-medium text-foreground">{study.timeline ? `${study.timeline} Months` : 'N/A'}</p>
                </div>

                {/* Tech Stack */}
                <div className="p-8 relative">
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {study.tech?.map((tech: string) => (
                      <span key={tech} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm bg-secondary text-foreground border border-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── STORY SECTIONS ─── */}
        <section className="pb-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            
            {/* Overview */}
            <AnimatedSection className="mb-20">
              <h2 className="text-3xl font-heading font-bold mb-6">Project Overview</h2>
              <p className="text-lg text-foreground/70 leading-relaxed font-medium">
                {study.overview}
              </p>
            </AnimatedSection>

            {/* The Challenge */}
            <AnimatedSection className="mb-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-border" />
                <h2 className="text-2xl font-heading font-bold text-muted-foreground">01. The Challenge</h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed pl-16">
                {study.challenge}
              </p>
            </AnimatedSection>

            {/* The Solution */}
            <AnimatedSection className="mb-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-border" />
                <h2 className="text-2xl font-heading font-bold text-muted-foreground">02. The Solution</h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed pl-16">
                {study.solution}
              </p>
            </AnimatedSection>

            {/* The Impact */}
            <AnimatedSection className="mb-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-primary" />
                <h2 className="text-2xl font-heading font-bold text-primary">03. The Impact</h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed pl-16 mb-12">
                {study.impact}
              </p>

              {/* Big Metrics Block */}
              <div className="pl-16">
                <div className="relative">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10">
                    {study.metrics?.map((metric, i) => (
                      <div key={i} className="p-8 flex flex-col justify-center items-center text-center relative bg-primary/5">
                        
                        <span className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-primary mb-2">
                          {metric.value}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </section>

        {/* ─── NEXT PROJECT CTA ─── */}
        {nextProject && (
          <section className="py-24 relative bg-secondary/20">
            
            <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
              <AnimatedSection>
                <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-6">
                  Next Case Study
                </p>
                <Link href={`/case-studies/${nextProject.slug || nextProject.id}`} className="group inline-block">
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 text-foreground group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </h2>
                  <div className="mx-auto flex items-center justify-center text-foreground group-hover:text-primary transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
                    <ArrowUpRight size={32} />
                  </div>
                </Link>
              </AnimatedSection>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}
