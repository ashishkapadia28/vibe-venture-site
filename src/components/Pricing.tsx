import { AnimatedSection } from "./AnimatedSection";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$999",
    description: "Perfect for small businesses looking to establish a digital presence.",
    features: ["Custom 5-page design", "Mobile responsive", "Basic SEO setup", "Contact form integration", "1 Month Support"],
    highlight: false,
    cta: "Start Basic"
  },
  {
    name: "Professional",
    price: "$2,499",
    description: "Ideal for growing companies needing advanced functionality and animations.",
    features: ["Custom 10-page design", "Premium animations", "Advanced SEO optimization", "CMS integration", "Analytics setup", "3 Months Support"],
    highlight: true,
    cta: "Go Pro"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large-scale operations and complex web apps.",
    features: ["Unlimited pages", "Custom web application", "E-commerce integration", "Dedicated project manager", "Priority 24/7 Support", "Custom API development"],
    highlight: false,
    cta: "Contact Us"
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg">
              Invest in a digital asset that pays for itself. No hidden fees, just pure value.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className={cn(
                "glass p-8 rounded-2xl relative h-full flex flex-col",
                plan.highlight && "border-primary/50 shadow-2xl shadow-primary/10 scale-105 bg-background/50"
              )}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold font-heading">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/project</span>}
                </div>
                <p className="text-muted-foreground mb-8 pb-8 border-b border-border">
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-8 grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    "w-full py-4 rounded-full font-medium text-center transition-all duration-300 hover:shadow-sm hover:shadow-primary/10",
                    plan.highlight 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20" 
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
