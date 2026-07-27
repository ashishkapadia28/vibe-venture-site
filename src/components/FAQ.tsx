"use client";

import { AnimatedSection } from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  spanClass: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Pricing",
    question: "What is your pricing model?",
    answer:
      "We offer milestone-based fixed pricing for defined scopes, and sprint-based retainers for ongoing product development. Every engagement starts with a free discovery call to accurately assess your needs.",
    spanClass: "md:col-span-2 lg:col-span-3",
  },
  {
    id: 2,
    category: "Timeline",
    question: "How long does a project take?",
    answer:
      "A focused MVP typically takes 6–10 weeks. A full-scale enterprise platform can range from 3 to 6 months depending on integrations and scope.",
    spanClass: "md:col-span-2 lg:col-span-2",
  },
  {
    id: 3,
    category: "Team",
    question: "Who will I be working with?",
    answer:
      "You get a dedicated cross-functional team: a Solutions Architect, 2–3 Senior Engineers, a UI/UX designer, and a PM. Unlike agencies that offshore, our core team is senior-level and involved from day one.",
    spanClass: "md:col-span-2 lg:col-span-2",
  },
  {
    id: 4,
    category: "Process",
    question: "What does your development process look like?",
    answer:
      "We follow an agile workflow. Every project starts with Discovery & Architecture, followed by iterative development sprints (2 weeks each). You get access to a staging environment and direct Slack communication.",
    spanClass: "md:col-span-2 lg:col-span-3",
  },
  {
    id: 5,
    category: "Support",
    question: "What happens after delivery?",
    answer:
      "Every project includes a 30-day post-launch warranty period to resolve any bugs. After that, we offer flexible monthly retainer packages for ongoing feature development and monitoring.",
    spanClass: "md:col-span-2 lg:col-span-3",
  },
  {
    id: 6,
    category: "Tech Stack",
    question: "What technologies do you use?",
    answer:
      "Our core stack centers around React, Next.js, Node.js, and TypeScript. We are cloud-native on AWS, GCP, and Vercel, ensuring high performance and massive scalability.",
    spanClass: "md:col-span-2 lg:col-span-2",
  },
];

export function FAQ() {
  return (
    <section className="py-32 bg-background text-foreground relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header - Bento Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <AnimatedSection>
            <span className="inline-block py-1 px-3 rounded-full border border-border text-xs font-bold tracking-[0.2em] uppercase mb-6 text-foreground/70">
              Clarity & Transparency
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground max-w-2xl leading-[1.1]">
              Everything you need to know.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full hover:scale-105 hover:bg-primary/90 transition-all duration-300 group shadow-2xl shadow-primary/20"
            >
              <div className="text-center flex flex-col items-center gap-1">
                <ArrowUpRight size={24} className="text-primary-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="text-[10px] font-bold tracking-widest text-primary-foreground uppercase mt-1">Ask Us</span>
              </div>
            </Link>
          </AnimatedSection>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {faqData.map((item, index) => (
            <AnimatedSection 
              key={item.id} 
              delay={index * 0.1}
              className={`group relative overflow-hidden rounded-[2rem] bg-secondary/5 border border-border p-8 hover:bg-secondary/10 hover:border-primary/50 transition-all duration-500 ${item.spanClass}`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-border bg-white text-foreground/70">
                    {item.category}
                  </span>
                  <span className="text-2xl font-bold text-foreground/10 group-hover:text-primary/20 transition-colors duration-500 font-heading">
                    0{item.id}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 leading-snug">
                    {item.question}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-500">
                    {item.answer}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
      </div>
    </section>
  );
}
