"use client";

import { AnimatedSection } from "./AnimatedSection";
import { CutoutCard } from "./ui/CutoutCard";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function CutoutBanner() {
  return (
    <section className="py-24 relative bg-background overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
        <AnimatedSection delay={0.2} className="h-[500px] lg:h-[600px] w-full">
          <CutoutCard 
            imageSrc="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
            altText="Creative team brainstorming"
            contentPosition="bottom-left"
            buttonContent={
              <>
                <button className="flex items-center gap-3 group px-6 py-4 rounded-full bg-accent hover:bg-accent/80 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-foreground group-hover:text-primary transition-colors shadow-sm">
                    <ArrowUpRight size={14} />
                  </div>
                  <span className="font-semibold text-foreground text-sm">View Portfolio</span>
                </button>
                <button className="px-6 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90 flex items-center gap-2 group">
                  Start A Project
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </>
            }
          />
        </AnimatedSection>
        
      </div>
    </section>
  );
}
