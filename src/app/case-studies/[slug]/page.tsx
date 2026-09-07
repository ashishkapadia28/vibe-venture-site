import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CaseStudyGallery } from "@/components/CaseStudyGallery";
import { ContactSection } from "@/components/ContactSection";
import { CTA } from "@/components/CTA";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import type { StorySection } from "@/data/caseStudies";
import type { Metadata } from "next";

function StoryPoints({ points }: { points: StorySection["points"] }) {
  return (
    <ul className="space-y-3 mt-6">
      {points.map((point, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <p className="text-foreground/70 leading-relaxed">
            <span className="font-semibold text-foreground">{point.lead}</span> {point.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

function findStudy(slug: string) {
  const studyIndex = caseStudies.findIndex((s) => s.slug === slug);
  const study = studyIndex !== -1 ? caseStudies[studyIndex] : null;
  return { study, studyIndex };
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { study } = findStudy(slug);

  if (!study) {
    return { title: "Case Study | Vibe Venture" };
  }

  const description = study.overview.text || study.impact || `See how Vibe Venture delivered results for this ${study.industry || ""} project.`.trim();

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

  const { study } = findStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="case-study-details">
        
        {/* ─── HERO SECTION ─── */}
        <section className="relative pt-40 pb-16 md:pb-20 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="max-w-4xl">
              <AnimatedSection delay={0.1}>
                <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-5">
                  {study.tag}
                </span>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.15] tracking-tight text-foreground">
                  {study.title}
                </h1>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.3} className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5 mt-10 pt-8 border-t border-border/60">
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5">Client</p>
                <p className="font-semibold text-foreground">{study.client}</p>
              </div>
              <div className="hidden sm:block w-px h-9 bg-border" />
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5">Scope of Work</p>
                <p className="font-semibold text-foreground">{study.role}</p>
              </div>
              <div className="hidden sm:block w-px h-9 bg-border" />
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5">Location</p>
                <p className="font-semibold text-foreground">{study.location}</p>
              </div>
              <div className="hidden sm:block w-px h-9 bg-border" />
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5">Industry</p>
                <p className="font-semibold text-foreground">{study.industry}</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── PROJECT GALLERY (HORIZONTAL SCROLL) ─── */}
        <section className="relative pb-24 bg-background">
          <AnimatedSection delay={0.2}>
            <CaseStudyGallery
              images={study.gallery && study.gallery.length > 0 ? study.gallery : [study.image]}
              title={study.title}
            />
          </AnimatedSection>
        </section>

        {/* ─── OVERVIEW ─── */}
        <section className="pb-24 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection className="max-w-3xl">
              <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
                OVERVIEW
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{study.overview.title}</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">{study.overview.text}</p>
              <StoryPoints points={study.overview.points} />
            </AnimatedSection>
          </div>
        </section>

        {/* ─── CHALLENGE / SOLUTION ─── */}
        <section className="pb-24 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <AnimatedSection>
                <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
                  CHALLENGES
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{study.challenge.title}</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">{study.challenge.text}</p>
                <StoryPoints points={study.challenge.points} />
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
                  SOLUTION
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{study.solution.title}</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">{study.solution.text}</p>
                <StoryPoints points={study.solution.points} />
              </AnimatedSection>
            </div>
          </div>
        </section>

        <ContactSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
