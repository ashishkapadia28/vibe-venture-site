"use client";

import { AnimatedSection } from "./AnimatedSection";
import { BentoWidget } from "./ui/BentoWidget";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Star, TrendingUp, Trophy } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden min-h-screen flex flex-col justify-center bg-background">
      <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Column: Typography & CTAs */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border mb-8">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                Top Rated Digital Agency
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-heading font-bold mb-6 leading-[1.05] tracking-tight text-foreground">
                Awesome<br />
                Solution For<br />
                Your Business
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl font-medium leading-relaxed">
                We strive to develop real-world web solutions that are ideal for small to large projects with bespoke requirements.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-between gap-4 group pl-6 pr-2 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20"
              >
                <span className="font-semibold text-base">Start A Project</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:rotate-45 group-hover:scale-105 transition-all duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-between gap-4 group pl-6 pr-2 py-2 rounded-full bg-transparent border border-border text-foreground hover:bg-gray-50 transition-all duration-300"
              >
                <span className="font-semibold text-base">Learn More</span>
                <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-foreground group-hover:bg-secondary/10 group-hover:scale-105 transition-all duration-300">
                  <ArrowRight size={20} />
                </div>
              </Link>
            </AnimatedSection>
          </div>

          {/* Right Column: Bento Widgets */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Main Image Widget */}
            <BentoWidget delay={0.3} className="absolute inset-0 m-auto w-[85%] h-[80%] z-10 p-0 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional at work" 
                fill
                priority
                className="object-cover rounded-[inherit]"
                sizes="(max-width: 768px) 85vw, 40vw"
              />
            </BentoWidget>

            {/* Floating Widget 1: Success Rate */}
            <BentoWidget delay={0.5} className="absolute -top-4 -left-4 md:top-4 md:left-4 z-20 w-48 bg-secondary text-secondary-foreground p-5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-green-400">+14%</span>
              </div>
              <h3 className="text-3xl font-bold font-heading mb-1">99%</h3>
              <p className="text-xs text-secondary-foreground/60">Success Rate</p>
              
              {/* Fake chart bars */}
              <div className="flex items-end gap-1.5 h-12 mt-4">
                {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                  <div key={i} className="w-full bg-primary rounded-t-sm" style={{ height: `${h}%`, opacity: h === 100 ? 1 : 0.6 }} />
                ))}
              </div>
            </BentoWidget>

            {/* Floating Widget 2: Award */}
            <BentoWidget delay={0.6} className="absolute -bottom-8 right-0 md:bottom-12 md:-right-8 z-20 w-56 bg-white p-5 shadow-xl">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Trophy size={24} className="text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading leading-tight text-foreground">Award Winning</h4>
                  <p className="text-xs text-foreground/60">Top Agency 2024</p>
                </div>
              </div>
            </BentoWidget>
            
            {/* Floating Widget 3: Rating */}
            <BentoWidget delay={0.7} className="absolute top-1/2 -right-4 md:-right-12 z-20 bg-white p-4 shadow-xl flex items-center gap-3 rounded-full">
              <div className="flex -space-x-2">
                <Image src="https://i.pravatar.cc/100?img=11" alt="User" width={32} height={32} className="rounded-full border-2 border-white" />
                <Image src="https://i.pravatar.cc/100?img=32" alt="User" width={32} height={32} className="rounded-full border-2 border-white" />
                <Image src="https://i.pravatar.cc/100?img=47" alt="User" width={32} height={32} className="rounded-full border-2 border-white" />
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold text-foreground">5.0</span>
              </div>
            </BentoWidget>
          </div>
        </div>
      </div>


    </section>
  );
}
