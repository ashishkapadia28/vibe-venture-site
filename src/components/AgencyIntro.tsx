"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { BentoWidget } from "./ui/BentoWidget";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";

export function AgencyIntro() {
  return (
    <section className="py-24 relative bg-background overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Images */}
          <div className="w-full lg:w-[45%] relative h-[500px]">
            {/* Main Image */}
            <BentoWidget delay={0.1} className="absolute left-0 bottom-0 w-[80%] h-[85%] p-0">
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
                alt="Team working together" 
                fill
                className="object-cover rounded-[inherit]"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </BentoWidget>

            {/* Overlapping small image */}
            <BentoWidget delay={0.2} className="absolute right-0 top-1/4 w-[40%] h-[35%] p-0 border-4 border-background z-20 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
                alt="Colleagues discussing" 
                fill
                className="object-cover rounded-[inherit]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </BentoWidget>

            {/* Floating Experience Badge */}
            <AnimatedSection 
              delay={0.3} 
              className="absolute left-1/2 top-[15%] -translate-x-1/2 z-30 bg-green-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="text-3xl font-heading font-bold leading-none">28+</div>
              <div className="text-xs font-medium leading-tight">
                Years of<br />Experience
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <AnimatedSection delay={0.2}>
              <SectionHeader 
                title={
                  <>
                    Powerful Agency<br />
                    For Corporate<br />
                    Business.
                  </>
                }
                subtitle="We strive to develop real-world web solutions that are ideal for small to large projects with bespoke project requirements."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <Link 
                href="/about"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 inline-flex items-center justify-center gap-1.5 group"
              >
                More About Us
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
