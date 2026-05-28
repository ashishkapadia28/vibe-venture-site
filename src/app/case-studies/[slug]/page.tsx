import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Deep, immersive case study storytelling
const caseStudyDetails: Record<string, any> = {
  "fintech-nexus": {
    client: "Fintech Nexus",
    title: "Engineering a 50,000 TPS Payment Engine for the Global Economy",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
    overview: "Fintech Nexus, a rapidly scaling payment processor, hit a critical infrastructure ceiling. We partnered with their engineering leadership to completely dismantle their legacy monolith and rebuild a hyper-resilient, event-driven payment fabric capable of processing enterprise transaction volumes with zero dropped packets.",
    role: "Core Architecture & Platform Engineering",
    timeline: "8 Months",
    industry: "Global Finance",
    techStack: ["Go", "Kafka", "PostgreSQL", "Redis Enterprise", "AWS EKS", "Terraform"],
    challenge: "Success was killing the product. During peak trading hours, the existing monolithic architecture was buckling under the pressure of 10,000 transactions per second (TPS). Cascading database locks, extreme memory pressure, and sporadic API timeouts were actively threatening their compliance status and bleeding enterprise clients.",
    solution: "We executed a high-stakes, zero-downtime strangler fig migration. By decoupling the core monolith into 15 highly specialized, domain-driven microservices written in Go, we eliminated the processing bottlenecks. We introduced Apache Kafka as the central nervous system for asynchronous, guaranteed event delivery, and deployed an active-active, globally distributed PostgreSQL cluster supported by Redis for sub-millisecond data retrieval.",
    impact: "The transformation was absolute. The new infrastructure comfortably absorbs 50,000+ TPS with P99 latency dropping from 800ms to a blistering 42ms. We secured 99.999% uptime in the first operational year and implemented aggressive autoscaling policies that instantly slashed their AWS infrastructure burn rate by over 40%.",
    metrics: [
      { label: "Peak Throughput", value: "50k/s" },
      { label: "P99 Latency", value: "42ms" },
      { label: "Cloud Spend", value: "-40%" }
    ],
    nextProject: { name: "CloudScale AI", slug: "cloudscale-ai" }
  },
  "cloudscale-ai": {
    client: "CloudScale AI",
    title: "Revolutionizing Global Content Delivery with Edge Compute",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
    overview: "CloudScale AI required an extreme modernization of their digital presence. They needed a custom, headless content architecture that could serve highly personalized marketing assets to millions of global users instantly, without sacrificing the editorial freedom of their marketing department.",
    role: "Frontend Architecture & Headless CMS",
    timeline: "6 Months",
    industry: "Enterprise AI Solutions",
    techStack: ["Next.js", "TypeScript", "Sanity Studio", "Vercel Edge", "Tailwind CSS"],
    challenge: "The marketing velocity was paralyzed by a rigid, legacy monolithic CMS. Global campaigns were taking up to 72 hours to publish across different regional nodes. Worse, the legacy bloated frontend was heavily penalizing their Core Web Vitals, actively destroying their SEO rankings and increasing bounce rates.",
    solution: "We engineered a fully decoupled, statically generated frontend leveraging Next.js App Router and deployed directly to Vercel's Edge Network. We integrated Sanity as the unified headless CMS, giving the marketing team real-time, block-based visual editing. By utilizing On-Demand Incremental Static Regeneration (ISR), we ensured that cache invalidation happens globally within milliseconds of a publish event.",
    impact: "The results completely reshaped their marketing operations. Global publishing cycles plummeted from 3 days to under 4 minutes. The new edge-rendered architecture secured a flawless 100/100 Google Lighthouse performance score across all pages, triggering a 45% surge in organic traffic and a massive increase in lead conversion.",
    metrics: [
      { label: "Publish Velocity", value: "100x" },
      { label: "Performance", value: "100/100" },
      { label: "Organic Growth", value: "+45%" }
    ],
    nextProject: { name: "Apex Logistics", slug: "apex-logistics" }
  },
  "apex-logistics": {
    client: "Apex Logistics",
    title: "AI-Powered Real-time Fleet Optimization",
    heroImage: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1920&q=80",
    overview: "Apex Logistics managed a fleet of 100,000+ vehicles globally. We engineered a high-frequency tracking engine that processes live telemetry and applies deep machine learning to dynamically optimize routes in real-time.",
    role: "Data Engineering & AI",
    timeline: "10 Months",
    industry: "Logistics & Supply Chain",
    techStack: ["Python", "TensorFlow", "WebSockets", "ClickHouse", "Google Cloud"],
    challenge: "The sheer volume of telemetry data was overwhelming their legacy systems. Dispatchers were dealing with 15-minute data lags, rendering real-time rerouting impossible and resulting in millions of dollars wasted in inefficient fuel burn and delayed deliveries.",
    solution: "We built a scalable ingestion pipeline utilizing WebSockets and ClickHouse for sub-second analytical querying. We layered a custom TensorFlow model over this data stream to predict traffic patterns, weather disruptions, and optimal routing dynamically, updating every driver's navigation system instantly.",
    impact: "The operational efficiency gains were staggering. The platform eliminated data lag entirely, enabling the ML models to reduce global fleet fuel consumption by 22% in the first quarter, saving the enterprise over $14M annually while dramatically improving on-time delivery rates.",
    metrics: [
      { label: "Fuel Savings", value: "22%" },
      { label: "Data Latency", value: "<50ms" },
      { label: "Cost Reduced", value: "$14M/yr" }
    ],
    nextProject: { name: "HealthSync", slug: "healthsync" }
  },
  "healthsync": {
    client: "HealthSync",
    title: "Military-Grade Telemedicine Infrastructure",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80",
    overview: "HealthSync required a completely bulletproof virtual care platform. We architected a zero-trust, HIPAA-compliant video consultation matrix connecting patients with specialists through end-to-end encrypted WebRTC streams.",
    role: "Security Architecture & Full-Stack",
    timeline: "12 Months",
    industry: "Healthcare",
    techStack: ["React Native", "WebRTC", "Node.js", "AES-256", "AWS GovCloud"],
    challenge: "Patient data privacy is non-negotiable. Standard video APIs failed HealthSync's rigorous penetration testing and HIPAA compliance audits. Furthermore, the platform needed to function flawlessly on low-bandwidth connections in rural areas.",
    solution: "We engineered a proprietary WebRTC streaming architecture wrapped in AES-256 end-to-end encryption. The backend operates on a zero-trust model deployed within AWS GovCloud. We also implemented advanced adaptive bitrate streaming algorithms to maintain stable video connections on 3G cellular networks.",
    impact: "HealthSync cleared every federal security audit with zero critical vulnerabilities. Patient adoption surged by over 300% within six months, as the platform proved reliable even in remote geographical locations, fundamentally expanding access to critical care.",
    metrics: [
      { label: "Adoption", value: "+300%" },
      { label: "Compliance", value: "HIPAA" },
      { label: "Uptime", value: "99.99%" }
    ],
    nextProject: { name: "RetailEdge", slug: "retailedge" }
  },
  "retailedge": {
    client: "RetailEdge",
    title: "Decoupled MACH Architecture Migration",
    heroImage: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=1920&q=80",
    overview: "RetailEdge was losing the mobile commerce war. We executed a surgical modernization of their aging monolithic e-commerce stack into a unified MACH ecosystem, igniting mobile conversions.",
    role: "E-Commerce Architecture",
    timeline: "9 Months",
    industry: "E-Commerce",
    techStack: ["Next.js", "GraphQL", "CommerceTools", "Algolia", "Vercel"],
    challenge: "Their monolithic architecture tied the frontend presentation directly to the backend database. This resulted in agonizing 8-second page loads on mobile devices. Every UI update required a full backend deployment, crippling their marketing agility during flash sales.",
    solution: "We adopted a strict MACH (Microservices, API-first, Cloud-native, Headless) philosophy. We decoupled the frontend using Next.js and integrated CommerceTools via GraphQL. Algolia was implemented to provide sub-millisecond, typo-tolerant search across millions of SKUs.",
    impact: "By eliminating render-blocking scripts and delivering static assets globally via CDN, mobile page loads dropped to 1.2 seconds. This direct friction reduction resulted in a 45% spike in overall conversion rates and a 2.5x increase in mobile revenue.",
    metrics: [
      { label: "Conversion", value: "+45%" },
      { label: "Mobile Rev", value: "2.5x" },
      { label: "Page Load", value: "1.2s" }
    ],
    nextProject: { name: "EduTech Global", slug: "edutech-global" }
  },
  "edutech-global": {
    client: "EduTech Global",
    title: "Massively Scalable Interactive LMS",
    heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
    overview: "EduTech Global needed to handle the pandemic-induced surge in online learning. We forged a horizontally scalable learning environment capable of streaming to tens of thousands of concurrent users.",
    role: "Cloud Infrastructure & Video Streaming",
    timeline: "7 Months",
    industry: "Education",
    techStack: ["React", "Go", "WebRTC", "Redis", "Kubernetes"],
    challenge: "During peak examination periods, concurrent user spikes would overload the servers, causing video streams to buffer indefinitely and interactive quiz responses to drop, leading to massive user frustration and severe brand damage.",
    solution: "We rebuilt the backend leveraging Go's highly concurrent goroutines, orchestrating deployment via auto-scaling Kubernetes clusters. Real-time interactions (chat, polls, quizzes) were routed through a highly available Redis pub/sub layer, completely separating the video payload from the interactive data.",
    impact: "The new architecture effortlessly sustained a peak load of 45,000 concurrent students without a single dropped connection. Engagement metrics increased by 60%, and the system's robust stability allowed EduTech Global to successfully secure their Series B funding.",
    metrics: [
      { label: "Engagement", value: "+60%" },
      { label: "Concurrency", value: "45k+" },
      { label: "Downtime", value: "Zero" }
    ],
    nextProject: { name: "Fintech Nexus", slug: "fintech-nexus" }
  }
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Use a fallback if the specific slug isn't in our mock database
  const study = caseStudyDetails[slug] || {
    client: "Undisclosed Enterprise",
    title: "Architecting the Future of Digital Scale",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    overview: "A sweeping digital transformation initiative that completely modernized legacy infrastructure, enabling unprecedented global scale, extreme high availability, and rapid feature velocity.",
    role: "Strategic Architecture & Engineering",
    timeline: "12 Months",
    industry: "Deep Tech",
    techStack: ["React", "Node.js", "Docker", "Kubernetes", "AWS"],
    challenge: "The client was drowning in technical debt. Siloed data environments and fragile deployment pipelines meant that launching even minor features took weeks, and global expansion was completely stalled due to localized infrastructure limitations.",
    solution: "We orchestrated a merciless cloud migration. We ripped out the legacy systems and instituted a modular, API-first microservices architecture backed by automated CI/CD pipelines and highly available Kubernetes clusters.",
    impact: "The infrastructure is now bulletproof. Feature delivery accelerated by 300%, and the system comfortably supports millions of concurrent users across 15+ countries without breaking a sweat.",
    metrics: [
      { label: "Delivery Velocity", value: "3x Faster" },
      { label: "Availability", value: "99.99%" },
      { label: "Global Reach", value: "15+ Regions" }
    ],
    nextProject: { name: "Fintech Nexus", slug: "fintech-nexus" }
  };

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
            <img 
              src={study.heroImage} 
              alt={study.title}
              className="w-full h-full object-cover"
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
                  {study.client}
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
              <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top pointer-events-none z-20" />
              <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left pointer-events-none z-20" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
                
                {/* Role */}
                <div className="p-8 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y pointer-events-none" />
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Role</p>
                  <p className="font-medium text-foreground">{study.role}</p>
                </div>

                {/* Industry */}
                <div className="p-8 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y pointer-events-none" />
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Industry</p>
                  <p className="font-medium text-foreground">{study.industry}</p>
                </div>

                {/* Timeline */}
                <div className="p-8 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y pointer-events-none" />
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Timeline</p>
                  <p className="font-medium text-foreground">{study.timeline}</p>
                </div>

                {/* Tech Stack */}
                <div className="p-8 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y pointer-events-none" />
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech: string) => (
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
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top pointer-events-none z-20" />
                  <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left pointer-events-none z-20" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10">
                    {study.metrics.map((metric: any, i: number) => (
                      <div key={i} className="p-8 flex flex-col justify-center items-center text-center relative bg-primary/5">
                        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y pointer-events-none" />
                        
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
        <section className="py-24 relative bg-secondary/20">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
            <AnimatedSection>
              <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-6">
                Next Case Study
              </p>
              <Link href={`/case-studies/${study.nextProject.slug}`} className="group inline-block">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 text-foreground group-hover:text-primary transition-colors">
                  {study.nextProject.name}
                </h2>
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-border flex items-center justify-center text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <ArrowUpRight size={24} />
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
