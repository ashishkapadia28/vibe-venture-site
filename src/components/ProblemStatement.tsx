import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

const problems = [
  {
    image: "/Illustration/Low Conversion Rates & High Bounce Rates.png",
    title: "Low Conversion Rates & High Bounce Rates",
    description: "Your website gets traffic, but visitors leave without taking action. Poor UX/UI and slow loading speeds are killing your ROI.",
  },
  {
    image: "/Illustration/Manual Processes Stunting Growth.png",
    title: "Manual Processes Stunting Growth",
    description: "Your team spends countless hours on repetitive tasks that should be automated. Operational bottlenecks prevent scaling.",
  },
  {
    image: "/Illustration/Invisible to Search Engines (Poor SEO).png",
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
              badge="THE DIGITAL GROWTH BARRIER"
              title={<>Why Most Businesses <span className="text-primary/90">Fail to Scale Online</span></>}
              subtitle="In today's hyper-competitive digital landscape, an outdated presence isn't just an inconvenience—it's actively costing you revenue. Here are the core challenges holding your business back:"
            />
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            return (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
                className="card-hover bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-3 border border-border/50"
              >
                <div className="text-foreground">
                  <div className="w-20 h-20 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={problem.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-bold font-heading text-foreground">
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
