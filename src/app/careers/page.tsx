import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { ArrowRight, ArrowUpRight, Code2, Cpu, Globe, Rocket, Shield, Terminal, Zap } from "lucide-react";
import Link from "next/link";

const coreValues = [
  {
    id: 1,
    title: "Radical Ownership",
    description: "No red tape. No middle management. You build it, you own it, you run it.",
    icon: <Shield className="w-6 h-6 text-primary" />
  },
  {
    id: 2,
    title: "Obsessive Craftsmanship",
    description: "We don't ship 'good enough'. We engineer masterpieces that scale infinitely.",
    icon: <Code2 className="w-6 h-6 text-primary" />
  },
  {
    id: 3,
    title: "Velocity Over Perfection",
    description: "Move brutally fast. Break things in staging, deploy flawlessly to production.",
    icon: <Zap className="w-6 h-6 text-primary" />
  },
  {
    id: 4,
    title: "Remote First, Async Always",
    description: "Work from a beach or a bunker. We care about output, not hours online.",
    icon: <Globe className="w-6 h-6 text-primary" />
  }
];

const openRoles = [
  {
    id: 1,
    title: "Senior Go Engineer",
    department: "Core Architecture",
    location: "Remote (Global)",
    type: "Full-Time"
  },
  {
    id: 2,
    title: "Principal Frontend Architect",
    department: "Web Experience",
    location: "Remote (Global)",
    type: "Full-Time"
  },
  {
    id: 3,
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote (Americas/EU)",
    type: "Full-Time"
  },
  {
    id: 4,
    title: "DevOps / SRE Lead",
    department: "Infrastructure",
    location: "Remote (Global)",
    type: "Full-Time"
  }
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="careers">
        
        {/* ─── HERO SECTION ─── */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[60vh] flex flex-col justify-center">
          
          {/* Background Gradients */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2" />
          </div>

          <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-4xl pt-8 pb-8">
              <AnimatedSection delay={0.1}>
                <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-4">
                  JOIN THE COLLECTIVE
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                  Build The Future With<br />
                  <span className="text-primary">Vibe Venture</span>
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl font-medium leading-relaxed">
                  We are a syndicate of elite engineers, designers, and strategists. We don't hire employees; we partner with relentless problem solvers.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row gap-4 mb-14">
                <Link
                  href="#open-roles"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  View Open Roles
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ─── CORE VALUES (BENTO GRID) ─── */}
        <section className="py-24 relative z-10 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 tracking-tight">
                How We Operate
              </h2>
            </AnimatedSection>

            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top z-20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left z-20 pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative z-10">
                {coreValues.map((value, index) => (
                  <AnimatedSection 
                    key={value.id} 
                    delay={index * 0.1}
                    className="p-10 md:p-14 group bg-background relative overflow-hidden flex flex-col justify-center"
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y z-20 pointer-events-none" />

                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full border border-border/50 flex items-center justify-center mb-6 bg-secondary group-hover:border-primary group-hover:scale-110 transition-all duration-500">
                        {value.icon}
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PERKS & BENEFITS ─── */}
        <section className="py-24 relative z-10 bg-secondary/30">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                <div className="md:w-1/3">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight">
                    The Perks
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We expect elite performance, so we provide an elite environment. No gimmicks like ping pong tables—just aggressive benefits that actually matter.
                  </p>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="flex gap-4">
                    <Terminal className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1 text-foreground">Top-Tier Hardware</h4>
                      <p className="text-sm text-muted-foreground">M-Series MacBooks, ultrawide monitors, and any gear you need.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Globe className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1 text-foreground">100% Remote Forever</h4>
                      <p className="text-sm text-muted-foreground">Work from anywhere. We cover your co-working space.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Rocket className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1 text-foreground">Unlimited PTO</h4>
                      <p className="text-sm text-muted-foreground">Mandatory minimums to ensure you actually disconnect and recharge.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Cpu className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1 text-foreground">Continuous Learning</h4>
                      <p className="text-sm text-muted-foreground">$3k annual stipend for courses, conferences, or books.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── OPEN ROLES ─── */}
        <section id="open-roles" className="py-32 relative z-10 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
                Open Positions
              </h2>
              <p className="text-muted-foreground mb-16 max-w-2xl">
                Ready to build? Check out our current openings. If you don't see a perfect fit, pitch us anyway.
              </p>
            </AnimatedSection>

            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] dashed-x-top z-20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-[1.5px] dashed-y-left z-20 pointer-events-none" />
              
              <div className="flex flex-col relative z-10">
                {openRoles.map((role, index) => (
                  <AnimatedSection 
                    key={role.id} 
                    delay={index * 0.1}
                    className="p-6 md:p-8 group bg-background relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] dashed-x z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1.5px] dashed-y z-20 pointer-events-none" />
                    
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                    <div className="relative z-10 flex flex-col gap-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                        {role.department}
                      </span>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        {role.title}
                      </h3>
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs font-medium text-muted-foreground px-3 py-1 bg-secondary rounded-sm">
                          {role.location}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground px-3 py-1 border border-border/60 rounded-sm">
                          {role.type}
                        </span>
                      </div>
                    </div>

                    <a 
                      href="mailto:careers@vibeventure.com" 
                      className="relative z-10 w-full md:w-auto px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-bold text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowUpRight size={16} />
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            </div>
            
            {/* Spontaneous Application */}
            <AnimatedSection delay={0.4} className="mt-16">
              <p className="text-muted-foreground mb-4">Don't see a perfect fit?</p>
              <a href="mailto:careers@vibeventure.com" className="inline-flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors border-b border-primary pb-1">
                Pitch Yourself Directly <ArrowRight size={16} />
              </a>
            </AnimatedSection>
            
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
