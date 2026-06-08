import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { OpenPositions } from "@/components/OpenPositions";

async function getJobs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/api/jobs?is_active=true`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.warn("API responded with an error, falling back to empty array.");
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Failed to fetch jobs from API, falling back to empty array:", error);
    return [];
  }
}

export default async function CareersPage() {
  const openRoles = await getJobs();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="careers">
        
        {/* ─── HERO SECTION ─── */}
        <section className="relative pt-32 pb-12 overflow-hidden flex flex-col justify-center">
          
          {/* Background Gradients */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2" />
          </div>

          <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-4xl pt-8 pb-4">
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
                <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl font-medium leading-relaxed">
                  We are a syndicate of elite engineers, designers, and strategists. We don't hire employees; we partner with relentless problem solvers.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row gap-4 mb-4">
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

        {/* ─── OPEN ROLES ─── */}
        <OpenPositions openRoles={openRoles} />



        <CTA />
      </main>
      <Footer />
    </>
  );
}
