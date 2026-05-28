"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden" id="maintenance">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2" />
      </div>



      {/* Top Navigation Bar / Logo */}
      <div className="w-full py-8 relative z-20 flex justify-center border-b border-border/50 bg-background/50 backdrop-blur-sm">
        <Image 
          src="/vibe_venture_logo.svg" 
          alt="Vibe Venture" 
          width={200} 
          height={60} 
          className="object-contain" 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center container relative z-10 mx-auto px-8 md:px-16 lg:px-24 xl:px-32 text-center max-w-4xl">


        <AnimatedSection delay={0.2}>
          <p className="text-primary font-bold tracking-widest text-sm uppercase mb-6 flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-primary" />
            SYSTEM UPGRADE IN PROGRESS
            <span className="w-12 h-[1px] bg-primary" />
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <h1 className="text-4xl md:text-6xl lg:text-[72px] font-heading font-bold mb-6 leading-[1.1] tracking-tight text-foreground">
            Under<br />
            <span className="text-primary">Maintenance</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
            We are currently upgrading our core infrastructure to provide you with a better experience. We will be back online shortly.
          </p>
        </AnimatedSection>
      </div>

      {/* Footer Details */}
      <div className="w-full py-8 relative z-20 border-t border-border/50 bg-background/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <div className="text-muted-foreground text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} Vibe Venture, Inc. All rights reserved.
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a href="mailto:hello@vibeventure.in" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
              <Mail size={16} />
              hello@vibeventure.in
            </a>
            <a href="tel:+916352380624" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
              <Phone size={16} />
              +91 63 5238 0624
            </a>
          </div>

        </div>
      </div>

    </main>
  );
}
