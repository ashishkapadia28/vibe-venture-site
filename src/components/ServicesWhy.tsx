import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { CheckCircle2, XCircle } from "lucide-react";

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
      {/* subtle blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="THE VIBE VENTURE DIFFERENCE"
              title={<>Traditional Agencies <br /><span className="text-primary">vs. Vibe Venture</span></>}
              subtitle="We don't just build websites; we build growth engines. Here is why hundreds of brands choose us over the old agency model."
            />
          </AnimatedSection>
        </div>

        {/* Comparison Table / Cards */}
        <div className="mt-16 max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-2 gap-8 mb-6 px-6">
            <div className="text-lg font-heading font-bold text-muted-foreground/60 text-center uppercase tracking-wider">
              Traditional Agencies
            </div>
            <div className="text-lg font-heading font-bold text-primary text-center uppercase tracking-wider">
              Vibe Venture
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {comparison.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 p-2 relative overflow-hidden group">
                  
                  {/* Them */}
                  <div className="flex-1 p-6 md:p-8 rounded-2xl bg-secondary/5 flex items-start gap-4">
                    <XCircle className="text-red-400 shrink-0 mt-0.5" size={24} />
                    <p className="text-foreground/70 font-medium leading-relaxed">
                      {item.them}
                    </p>
                  </div>

                  {/* VS Badge (Desktop only) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-xs font-bold text-muted-foreground z-10">
                    VS
                  </div>

                  {/* Us */}
                  <div className="flex-1 p-6 md:p-8 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 flex items-start gap-4">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={24} />
                    <p className="text-foreground font-semibold leading-relaxed">
                      {item.us}
                    </p>
                  </div>

                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
