import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { ArrowUpRight, Zap } from "lucide-react";

export function ShopifyPartnerSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Abstract Background Glows */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <AnimatedSection>
            <SectionHeader
              badge="SHOPIFY PARTNER"
              title={<>Beyond Standard <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">E-Commerce.</span></>}
              subtitle="Certified Shopify Partners engineering scalable, high-converting digital experiences."
            />
          </AnimatedSection>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Card 1: Custom Themes (Wide) - Dotted Grid Texture */}
          <AnimatedSection delay={0.1} className="md:col-span-2 group">
            <div className="h-full bg-white/60 backdrop-blur-md rounded-3xl border border-border/50 shadow-sm p-6 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:bg-white/90 hover:shadow-md">
              {/* Custom Dots Pattern Background */}
              <div className="absolute inset-0 opacity-[0.4] bg-[url('/Images/dots_pattern.png')] bg-cover bg-center pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
              
              {/* Soft bottom fade for text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-gradient-to-t from-white/95 via-white/80 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-primary mb-6 border border-primary/10 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <ArrowUpRight size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 md:mb-3 drop-shadow-sm">Bespoke Theme Architecture</h3>
                  <p className="text-muted-foreground text-base md:text-lg max-w-md drop-shadow-sm">
                    Pixel-perfect, headless, or custom liquid. We build digital storefronts that perfectly reflect your high-end brand identity without compromising on speed.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Card 2: Lightning Fast (Tall) - Massive Dotted 99% */}
          <AnimatedSection delay={0.2} className="md:row-span-2 group">
            <div className="h-full bg-gradient-to-b from-primary/5 to-white/60 backdrop-blur-md rounded-3xl border border-border/50 shadow-sm p-6 md:p-10 flex flex-col justify-end relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-md">
              
              {/* Massive 99% Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center z-0 group-hover:scale-110 transition-transform duration-700 pointer-events-none md:-translate-y-12">
                <div className="text-[12rem] md:text-[18rem] font-heading font-black leading-none tracking-tighter bg-[url('/Images/dots_pattern.png')] bg-cover bg-center text-transparent bg-clip-text drop-shadow-sm inline-block opacity-80">
                  99<span className="text-6xl md:text-8xl">%</span>
                </div>
              </div>
              
              {/* Soft bottom fade for text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-white/95 via-white/80 to-transparent pointer-events-none z-0" />
              
              <div className="relative z-10 flex flex-col">
                <div className="mb-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-md border border-primary/10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Zap size={20} className="text-primary md:w-6 md:h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 drop-shadow-sm">Core Web Vitals</h3>
                <p className="text-muted-foreground text-sm md:text-base drop-shadow-sm">
                  Sub-second load times. We obsess over performance because speed directly correlates to revenue.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Card 3: Conversion Focused (Square) - Abstract Glow */}
          <AnimatedSection delay={0.3} className="group">
            <div className="h-full bg-white/60 backdrop-blur-md rounded-3xl border border-border/50 shadow-sm p-6 md:p-8 flex flex-col justify-end relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:bg-white/80 hover:shadow-md">
              
              {/* Ambient Glowing Orbs */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-colors duration-700 pointer-events-none" />
              
              <div className="absolute top-6 left-6 md:top-8 md:left-8 text-5xl md:text-6xl font-heading font-black text-foreground/5 group-hover:text-foreground/10 transition-colors z-10 pointer-events-none">
                CRO
              </div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">Conversion Focused</h3>
                <p className="text-muted-foreground text-sm">
                  Strategic UX layouts, friction-less checkouts, and up-sell flows designed to maximize your ROI.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Card 4: Seamless Ecosystem (Square) - Dark Accent Card */}
          <AnimatedSection delay={0.4} className="group">
            <div className="h-full bg-zinc-950 rounded-3xl border border-border/50 shadow-sm p-6 md:p-8 flex flex-col justify-end relative overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-md">
              
              {/* Real World Ecosystem/Tech Image - Bright Theme */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
              
              {/* Dark bottom fade for white text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg">Seamless Ecosystem</h3>
                <p className="text-white/80 text-sm drop-shadow-md">
                  Flawless integrations with ERPs, CRMs, marketing tools, and third-party logistics.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
