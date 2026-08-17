import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { Check, X } from "lucide-react";

const comparison = [
  {
    them: "Pitch vanity metrics (likes, impressions) that don't pay bills.",
    us: "Focus on real business outcomes: qualified leads, conversions, and revenue.",
  },
  {
    them: "Slow, rigid delivery cycles that delay your product launch.",
    us: "Rapid, agile delivery with rigorous quality gates — fast but never sloppy.",
  },
  {
    them: "Treat you like just another transaction or support ticket.",
    us: "True partnership. We embed into your team with a dedicated point of contact.",
  },
  {
    them: "Design and strategy based on guesswork or internal opinions.",
    us: "Data at every step. Decisions backed by A/B tests, heatmaps, and analytics.",
  },
  {
    them: "Hidden fees, scope creep, and unpredictable pricing models.",
    us: "100% transparent pricing and proven frameworks refined across 250+ projects.",
  }
];

export function ServicesWhy() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <AnimatedSection>
            <SectionHeader
              badge="Why Vibe Venture" 
              title={<>What Makes Us Different</>}
              subtitle="Choosing the right agency is harder than it looks. Most say the same things and make the same promises. This comparison shows exactly how we operate versus the industry standard."
            />
          </AnimatedSection>
        </div>

        {/* Bespoke Vibe Venture Minimalist Layout */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-6xl mx-auto mt-16">
            
            {/* Minimalist Headers (Desktop) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-4">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] border-b border-border/50 pb-3">
                The Old Agency Model
              </h3>
              <h3 className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] border-b border-primary/20 pb-3">
                The Vibe Venture Standard
              </h3>
            </div>

            {/* List Content */}
            <div className="flex flex-col">
              {comparison.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 py-5 md:py-6 border-b border-border/40 last:border-b-0 group">
                  
                  {/* Them */}
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                    <span className="md:hidden text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      Old Model
                    </span>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 flex items-center justify-center">
                        <X size={16} className="text-red-400" strokeWidth={2.5} />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed flex-1">
                        {item.them}
                      </p>
                    </div>
                  </div>

                  {/* Us */}
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                    <span className="md:hidden text-[9px] font-bold text-primary uppercase tracking-widest">
                      Vibe Venture
                    </span>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 flex items-center justify-center">
                        <Check size={16} className="text-primary" strokeWidth={3} />
                      </div>
                      <p className="text-foreground font-medium text-sm md:text-base leading-relaxed flex-1">
                        {item.us}
                      </p>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
