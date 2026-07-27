import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { Metadata } from "next";
import { MapPin, Mail, Phone, ShieldCheck, Star } from "lucide-react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Book a Strategy Call | Vibe Venture",
  description: "Schedule a free strategy session with Vibe Venture to scale your brand.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background relative z-10 overflow-hidden min-h-screen flex items-center">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-8 max-w-[1300px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Content & Trust */}
            <div className="flex flex-col">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 border border-primary/20 bg-primary/10 rounded-full shadow-sm shadow-primary/5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary text-[12px] font-bold tracking-widest uppercase">
                      Free Strategy Session
                    </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-heading font-bold mb-6 tracking-tight leading-[1.05]">
                  Ready to Scale? <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">Let's Talk.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed max-w-xl">
                  Schedule a 30-minute discovery call with our growth experts. We'll audit your current digital presence and outline a tailored roadmap to achieve your goals — zero obligations.
                </p>

                <div className="flex flex-wrap gap-4 mt-10">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-secondary/50 px-4 py-2 rounded-full border border-border">
                    <ShieldCheck size={18} className="text-primary" />
                    100% Confidential
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-secondary/50 px-4 py-2 rounded-full border border-border">
                    <Star size={18} className="text-primary" />
                    Trusted by 50+ Brands
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 max-w-xl">
                  {/* Contact Cards */}
                  <div className="p-6 rounded-2xl border border-border/50 bg-white/50 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-1">Email Us</h4>
                    <a href="mailto:ashish@vibeventure.in" className="text-muted-foreground text-sm hover:text-primary transition-colors">ashish@vibeventure.in</a>
                    <a href="mailto:sibtain@vibeventure.in" className="text-muted-foreground text-sm hover:text-primary transition-colors">sibtain@vibeventure.in</a>
                  </div>

                  <div className="p-6 rounded-2xl border border-border/50 bg-white/50 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Phone size={20} />
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-1">Call Us</h4>
                    <a href="tel:+916352380624" className="text-muted-foreground text-sm hover:text-primary transition-colors">+91 63 5238 0624</a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Side: Calendar Embed */}
            <div className="relative w-full mt-10 lg:mt-0">
              <AnimatedSection delay={0.2} className="relative z-10">
                {/* Glassmorphism Container */}
                <div className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-3 sm:p-6 lg:p-8 overflow-hidden relative">
                  {/* Decorative corner glow inside card */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/15 blur-2xl rounded-full" />
                  
                  <div className="relative z-10 w-full rounded-xl overflow-hidden bg-white shadow-inner border border-border/30">
                    <CalendlyEmbed />
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Floating decorative elements behind the card */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-primary/30 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-tr from-blue-500/20 to-primary/30 rounded-full blur-3xl pointer-events-none" />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
