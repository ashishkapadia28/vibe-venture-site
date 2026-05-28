import { AnimatedSection } from "./AnimatedSection";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Vibe Venture completely transformed our online presence. Our conversion rates have doubled since launching the new site.",
    author: "Sarah Johnson",
    role: "CMO, TechNova",
    initials: "SJ"
  },
  {
    quote: "The attention to detail and smooth animations make our platform feel incredibly premium. Highly recommend their team.",
    author: "Michael Chang",
    role: "Founder, Elevate App",
    initials: "MC"
  },
  {
    quote: "Fast delivery, exceptional communication, and a final product that exceeded all our expectations.",
    author: "Elena Rodriguez",
    role: "Director, Studio 11",
    initials: "ER"
  }
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it. Here's what industry leaders think about our work.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="glass p-8 rounded-2xl relative h-full flex flex-col">
                <Quote size={40} className="text-primary/20 absolute top-6 right-6" />
                <p className="text-lg leading-relaxed mb-8 relative z-10 grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
