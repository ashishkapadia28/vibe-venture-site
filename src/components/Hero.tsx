"use client";

import { AnimatedSection } from "./AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-0 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2" />
      </div>

      <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32 text-center max-w-5xl flex flex-col justify-center pt-8 pb-12">
        <AnimatedSection delay={0.1}>
          <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6">
            DRIVING THE NEXT WAVE OF GROWTH
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-heading font-bold mb-6 leading-[1.1] tracking-tight">
            Marketing With<br />
            Integrated Strategy<br />
            <span className="text-primary">Design &</span> Technology
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            We are a result-driven digital marketing agency helping brand grow with data, creativity and technology.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20 flex items-center justify-center gap-2 group"
          >
            Get A Free Consultation
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-border bg-transparent text-foreground font-medium text-[15px] transition-all duration-300 hover:border-foreground/40 flex items-center justify-center gap-2 group"
          >
            Explore Services
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-[3px] border-background bg-secondary overflow-hidden relative">
              <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-[3px] border-background bg-secondary overflow-hidden relative">
              <img src="https://i.pravatar.cc/100?img=32" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-[3px] border-background bg-secondary overflow-hidden relative">
              <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-[3px] border-background bg-secondary overflow-hidden relative">
              <img src="https://i.pravatar.cc/100?img=44" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-[3px] border-background bg-secondary overflow-hidden relative">
              <img src="https://i.pravatar.cc/100?img=47" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="font-medium text-base text-foreground">
            <span className="font-bold">100+</span> Businesses Growing With Us
          </p>
        </AnimatedSection>
      </div>

      {/* Trusted Brands Footer Strip */}
      <div className="dashed-x w-full relative z-10">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="text-center py-6">
            <p className="text-muted-foreground font-semibold tracking-widest text-sm uppercase">
              TRUSTED BY 250+ BRANDS WORLDWIDE
            </p>
          </div>
          
          {/* Explicit horizontal line element forced onto integer pixel grid */}
          <div className="relative h-[2px] w-full">
            <div className="absolute top-0 bottom-0 -left-4 md:-left-8 -right-4 md:-right-8 dashed-x" />
          </div>

          <div className="flex items-center justify-between overflow-hidden">
            <div className="py-8 flex-1 flex justify-center relative group cursor-pointer">
              <span className="font-heading font-medium text-2xl tracking-widest opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">AMORE</span>
              {/* Vertical divider */}
              <div className="absolute right-0 top-0 bottom-0 w-[2px] dashed-y" />
            </div>
            <div className="py-8 flex-1 flex justify-center relative group cursor-pointer">
              <span className="font-heading font-medium text-2xl tracking-widest opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">TRISHIA</span>
              <div className="absolute right-0 top-0 bottom-0 w-[2px] dashed-y" />
            </div>
            <div className="py-8 flex-1 justify-center relative group cursor-pointer hidden sm:flex">
              <span className="font-heading font-medium text-2xl tracking-widest text-center opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">KRISHNA CLINIC</span>
              <div className="absolute right-0 top-0 bottom-0 w-[2px] dashed-y" />
            </div>
            <div className="py-8 flex-1 justify-center relative group cursor-pointer hidden md:flex">
              <span className="font-heading font-medium text-2xl tracking-widest opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">ORCHIES</span>
              <div className="absolute right-0 top-0 bottom-0 w-[2px] dashed-y" />
            </div>
            <div className="py-8 flex-1 justify-center group cursor-pointer hidden lg:flex">
              <span className="font-heading font-medium text-2xl tracking-widest opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">ARMONIA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
