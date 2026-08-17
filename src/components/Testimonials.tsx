"use client";

import { AnimatedSection } from "./AnimatedSection";
import { Star, Play, Quote } from "lucide-react";
import Image from "next/image";

import { SectionHeader } from "./ui/SectionHeader";

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden z-10">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        
        <div className="mb-16 z-30">
          <AnimatedSection>
            <SectionHeader
              theme="dark"
              badge="CLIENT SUCCESS"
              title={<>Hear from our <br /><span className="text-white/60">trusted partners</span></>}
              subtitle="See how we help businesses transform their ideas into cohesive brands, digital experiences, and everything in between."
            />
          </AnimatedSection>
        </div>

        {/* Video Testimonial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-12">
          
          {/* Left: Video Player */}
          <AnimatedSection delay={0.2} className="lg:col-span-7 relative group cursor-pointer">
            <div className="relative w-full aspect-video rounded-4xl overflow-hidden bg-secondary-foreground/5 border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80" 
                alt="Client Video Testimonial" 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent opacity-80" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary/90 group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-xl shadow-black/20">
                  <Play size={32} className="text-white ml-2" fill="currentColor" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Client Quote & Info */}
          <AnimatedSection delay={0.4} className="lg:col-span-5 flex flex-col justify-center px-4 md:px-8">
            <Quote size={48} className="text-primary/20 mb-6" />
            
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
              ))}
            </div>

            <h3 className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-white mb-10">
              “Vibe Venture understood exactly how we wanted to present Arpanex and brought our complete brand and digital presence together really well.”
            </h3>

            <div className="flex items-center gap-4 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-lg font-bold text-white">Arpan Patel</h4>
                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold mt-1">Arpanex Group of Companies</p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
