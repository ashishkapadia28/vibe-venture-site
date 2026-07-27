import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { AlertCircle, TrendingDown, Clock, SearchX } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    title: "Low Conversion Rates & High Bounce Rates",
    description: "Your website gets traffic, but visitors leave without taking action. Poor UX/UI and slow loading speeds are killing your ROI.",
  },
  {
    icon: Clock,
    title: "Manual Processes Stunting Growth",
    description: "Your team spends countless hours on repetitive tasks that should be automated. Operational bottlenecks prevent scaling.",
  },
  {
    icon: SearchX,
    title: "Invisible to Search Engines (Poor SEO)",
    description: "You have a great product, but potential clients can't find you on Google. Your competitors are capturing your market share.",
  }
];

export function ProblemStatement() {
  return (
    <section className="py-24 relative bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
        <div className="mb-16">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="THE DIGITAL GROWTH BARRIER"
              title={<>Why Most Businesses <span className="text-primary/90">Fail to Scale Online</span></>}
              subtitle="In today's hyper-competitive digital landscape, an outdated presence isn't just an inconvenience—it's actively costing you revenue. Here are the core challenges holding your business back:"
            />
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <AnimatedSection 
                key={index} 
                delay={index * 0.1}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 p-8 md:p-10 flex flex-col gap-6 transition-all duration-300 border border-border/50 group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading mb-3 text-foreground group-hover:text-primary/90 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {problem.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}
