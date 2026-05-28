"use client";

import { AnimatedSection } from "./AnimatedSection";
import Link from "next/link";
import { ArrowRight, Phone, Mail, Calendar } from "lucide-react";

export function BackupCTA() {
  return (
    <section className="pt-24 pb-8 bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* The Rectangle CTA Banner - Wider max-width */}
        <div className="max-w-7xl mx-auto rounded-xl border border-dashed border-border/80 bg-secondary/10 overflow-hidden relative">
          
          {/* Subtle abstract blobs inside the rectangle */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
            
            {/* Left Column: Copy (Reduced vertical padding, wider column if needed, keeping 7/5 ratio) */}
            <div className="lg:col-span-7 px-8 py-10 md:px-12 md:py-12 lg:px-16 lg:py-14 border-b lg:border-b-0 lg:border-r border-dashed border-border/80 flex flex-col justify-center relative">
              
              <AnimatedSection>
                <div className="inline-flex items-center gap-2.5 px-3 py-1 mb-6 border border-dashed border-primary/40 bg-primary/5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
                    Accepting New Projects
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-4">
                  Ready to Build <br />
                  <span className="text-primary">Exceptional?</span>
                </h2>
                
                <p className="text-muted-foreground text-base leading-relaxed max-w-lg mb-8">
                  Partner with an IT consulting firm that treats your business goals as their own. From enterprise architecture to rapid deployment, we deliver technology that scales.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-8 md:gap-12 pt-6 border-t border-dashed border-border/80">
                  <div>
                    <div className="text-2xl font-heading font-bold text-foreground">250+</div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mt-1">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-foreground">98%</div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mt-1">Retention</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Actions */}
            <div className="lg:col-span-5 flex flex-col bg-background/50">
              <AnimatedSection delay={0.1} className="h-full flex flex-col">
                
                {/* Main Action Banner */}
                <Link href="/contact" className="flex-1 px-8 py-10 md:px-10 md:py-12 border-b border-dashed border-border/80 group hover:bg-primary hover:text-primary-foreground transition-colors duration-300 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                    <Calendar size={140} strokeWidth={1} />
                  </div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl border border-dashed border-primary/30 bg-primary/10 text-primary group-hover:border-primary-foreground/30 group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground flex items-center justify-center mb-4 transition-all duration-300">
                      <Calendar size={18} />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2">Strategy Session</h3>
                    <p className="text-muted-foreground group-hover:text-primary-foreground/80 mb-6 max-w-[260px] transition-colors duration-300 leading-relaxed text-sm">
                      Discuss technical challenges with our senior architects. Get a roadmap in 48 hours.
                    </p>
                    <div className="flex items-center gap-2 font-semibold text-sm group-hover:text-primary-foreground transition-colors duration-300 uppercase tracking-wider">
                      Book Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2">
                  <Link href="tel:+910000000000" className="px-6 py-6 border-r border-dashed border-border/80 group hover:bg-primary/5 transition-colors duration-300 flex flex-col items-center text-center justify-center relative overflow-hidden">
                    <Phone size={20} className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                    <span className="text-sm font-semibold tracking-wide relative z-10">Call Direct</span>
                  </Link>
                  <Link href="mailto:hello@vibeventure.com" className="px-6 py-6 group hover:bg-primary/5 transition-colors duration-300 flex flex-col items-center text-center justify-center relative overflow-hidden">
                    <Mail size={20} className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                    <span className="text-sm font-semibold tracking-wide relative z-10">Email Us</span>
                  </Link>
                </div>

              </AnimatedSection>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
