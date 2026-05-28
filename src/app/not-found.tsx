"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="not-found">
        <section className="relative pt-32 pb-0 overflow-hidden min-h-screen flex flex-col justify-center">
          {/* Background Gradients */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2" />
          </div>

          <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32 text-center max-w-5xl flex flex-col justify-center pt-8 pb-12">
            <AnimatedSection delay={0.1}>
              <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6 flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-primary" />
                ERROR 404
                <span className="w-12 h-[1px] bg-primary" />
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-[64px] font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Looks Like You've Hit<br />
                <span className="text-primary">A Dead End</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                The coordinate you requested does not exist in our current architecture. It may have been deprecated, moved, or never built at all. Let's get you back to the homepage.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group mx-auto"
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Return to Home
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
