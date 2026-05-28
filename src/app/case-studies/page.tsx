import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Vibe Venture",
  description: "Explore our success stories and see how we help businesses solve complex problems and drive measurable growth through digital innovation.",
};

const allCaseStudies = [
  {
    id: 1,
    client: "Fintech Nexus",
    category: "Financial Services",
    title: "Engineering a 50,000 TPS Payment Engine",
    description: "Dismantled a failing legacy monolith and engineered a hyper-resilient, event-driven payment fabric capable of processing enterprise transaction volumes with zero dropped packets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    metrics: [{ label: "Transactions", value: "50k/s" }, { label: "Uptime", value: "99.999%" }],
    slug: "/case-studies/fintech-nexus"
  },
  {
    id: 2,
    client: "CloudScale AI",
    category: "Enterprise Cloud",
    title: "Revolutionizing Global Content Delivery",
    description: "Engineered a fully decoupled, edge-rendered headless CMS leveraging Next.js App Router. Plunged global publishing cycles from 3 days to under 4 minutes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    metrics: [{ label: "Velocity", value: "100x" }, { label: "Performance", value: "100/100" }],
    slug: "/case-studies/cloudscale-ai"
  },
  {
    id: 3,
    client: "Apex Logistics",
    category: "Logistics & Supply Chain",
    title: "AI-Powered Real-time Fleet Optimization",
    description: "Built a high-frequency WebSocket tracking engine that processes live telemetry for over 100,000 active fleet vehicles, integrating deep ML route prediction.",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80",
    metrics: [{ label: "Fuel Savings", value: "22%" }, { label: "Active Nodes", value: "100k+" }],
    slug: "/case-studies/apex-logistics"
  },
  {
    id: 4,
    client: "HealthSync",
    category: "Healthcare",
    title: "Military-Grade Telemedicine Infrastructure",
    description: "Architected a zero-trust, HIPAA-compliant video consultation matrix connecting patients with specialists through end-to-end encrypted WebRTC streams.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    metrics: [{ label: "Adoption", value: "+300%" }, { label: "Compliance", value: "HIPAA" }],
    slug: "/case-studies/healthsync"
  },
  {
    id: 5,
    client: "RetailEdge",
    category: "E-Commerce",
    title: "Decoupled MACH Architecture Migration",
    description: "Executed a surgical modernization of an aging monolithic e-commerce stack into a unified MACH ecosystem, igniting mobile conversions by eliminating render blocking.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=800&q=80",
    metrics: [{ label: "Conversion", value: "+45%" }, { label: "Mobile Rev", value: "2.5x" }],
    slug: "/case-studies/retailedge"
  },
  {
    id: 6,
    client: "EduTech Global",
    category: "Education",
    title: "Massively Scalable Interactive LMS",
    description: "Forged a horizontally scalable learning environment capable of streaming to tens of thousands of concurrent users with real-time gamification and analytics.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    metrics: [{ label: "Engagement", value: "+60%" }, { label: "Concurrency", value: "10k+" }],
    slug: "/case-studies/edutech-global"
  }
];

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="case-studies">
        {/* ─── HERO SECTION ─── */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-background">
          {/* Background gradient blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2" />
          </div>

          <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-4xl pt-8 pb-8">
              <AnimatedSection delay={0.1}>
                <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6">
                  OUR PORTFOLIO
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                  Real Challenges.<br />
                  <span className="text-primary">Real Results.</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl font-medium leading-relaxed">
                  We don't just build software. We engineer solutions that transform operations, accelerate growth, and drive massive ROI for our partners.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#portfolio-grid"
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-border bg-transparent text-foreground font-medium text-[15px] transition-all duration-300 hover:border-foreground/40 flex items-center justify-center gap-2 group"
                >
                  Explore Work
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ─── BENTO GRID CASE STUDIES (THEME MATCHED) ─── */}
        <section id="portfolio-grid" className="pb-32 bg-background relative z-10 pt-16 -mt-16">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            {/* The Zero-Gap Blueprint Grid */}
            <div className="relative mt-8">
              {/* Outer grid borders (Top and Left) */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top z-20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left z-20 pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 relative z-10">
                {allCaseStudies.map((study, index) => {
                  // Determine grid spanning based on index for a bento box look
                  let spanClass = "col-span-1";
                  if (index === 0) spanClass = "md:col-span-2 lg:col-span-2"; // First item large
                  if (index === 5) spanClass = "md:col-span-2 lg:col-span-3"; // Last item full width

                  return (
                    <AnimatedSection 
                      key={study.id} 
                      delay={index * 0.1}
                      className={`${spanClass} group bg-background relative overflow-hidden flex flex-col`}
                    >
                      {/* Grid Item Outer Borders (Bottom and Right) */}
                      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 pointer-events-none" />
                      <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y z-20 pointer-events-none" />

                      <Link href={study.slug} className="flex flex-col h-full relative z-10">
                        
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                        {/* Header / Meta */}
                        <div className="p-6 md:p-8 flex items-center justify-between relative z-10">
                          {/* Inner border bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 opacity-40 pointer-events-none" />
                          
                          <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm bg-secondary/50 text-foreground border border-border/50 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                            {study.category}
                          </span>
                          <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>

                        {/* Flex Container for Image + Content based on Span */}
                        <div className={`flex flex-1 ${index === 0 || index === 5 ? 'flex-col md:flex-row' : 'flex-col'} relative z-10`}>
                          
                          {/* Image Section */}
                          <div className={`relative overflow-hidden ${index === 0 || index === 5 ? 'w-full md:w-1/2' : 'w-full h-48 md:h-56'}`}>
                            {/* Inner borders for image section */}
                            {index === 0 || index === 5 ? (
                              <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y z-20 opacity-40 pointer-events-none hidden md:block" />
                            ) : null}
                            <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 opacity-40 pointer-events-none ${index === 0 || index === 5 ? 'md:hidden' : ''}`} />
                            
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            <img 
                              src={study.image} 
                              alt={study.title}
                              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                          </div>

                          {/* Content Section */}
                          <div className={`p-6 md:p-8 flex flex-col flex-1 justify-between relative ${index === 0 || index === 5 ? 'w-full md:w-1/2' : 'w-full'}`}>
                            <div>
                              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                                {study.client}
                              </p>
                              <h2 className={`${index === 0 || index === 5 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'} font-heading font-bold mb-4 leading-[1.15] group-hover:text-primary transition-colors duration-300`}>
                                {study.title}
                              </h2>
                              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                {study.description}
                              </p>
                            </div>

                            {/* Metrics */}
                            <div className="relative pt-6 mt-auto">
                              {/* Inner border top for metrics */}
                              <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top z-20 opacity-40 pointer-events-none" />
                              
                              <div className="flex items-center gap-6">
                                {study.metrics.map((metric, i) => (
                                  <div key={i} className="flex flex-col gap-1">
                                    <span className={`${index === 0 || index === 5 ? 'text-2xl' : 'text-xl'} font-heading font-black tracking-tight text-foreground`}>
                                      {metric.value}
                                    </span>
                                    <span className="text-[9px] text-muted-foreground font-bold tracking-widest uppercase">
                                      {metric.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>
                      </Link>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ─── CTA SECTION ─── */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
