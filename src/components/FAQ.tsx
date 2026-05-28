"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Pricing",
    question: "What is your pricing model?",
    answer:
      "We work with both fixed-price and time-and-material models depending on project scope and complexity. For well-defined projects, we offer milestone-based fixed pricing. For larger enterprise engagements or ongoing product development, we structure retainers or sprint-based billing. Every engagement starts with a free discovery call to assess your needs.",
  },
  {
    id: 2,
    category: "Timeline",
    question: "How long does a typical project take?",
    answer:
      "A focused MVP typically takes 6–10 weeks. A full-scale enterprise platform can range from 3 to 6 months depending on integrations, team size, and scope. We are transparent from day one—after the discovery phase, we give you a detailed project timeline with clearly defined deliverables and milestones before we write a single line of code.",
  },
  {
    id: 3,
    category: "Process",
    question: "What does your development process look like?",
    answer:
      "We follow an agile, sprint-based development workflow. Every project starts with a Discovery & Architecture phase, followed by iterative development sprints (2 weeks each). You get access to a staging environment and direct Slack communication with your team throughout. We close with a thorough QA cycle, deployment, and a 30-day post-launch support window.",
  },
  {
    id: 4,
    category: "Team",
    question: "Who will I be working with?",
    answer:
      "You get a dedicated cross-functional team: a Solutions Architect, 2–3 Senior Engineers, a UI/UX designer, a QA engineer, and a project manager. You will have a single point of contact (your PM) for all communications. Unlike agencies that offshore all work, our core engineering team is senior-level and involved from day one.",
  },
  {
    id: 5,
    category: "Technology",
    question: "What technologies do you specialize in?",
    answer:
      "Our core stack is centered around React, Next.js, Node.js, and TypeScript for web applications. On the backend, we work with PostgreSQL, MongoDB, Redis, and Kafka. We are cloud-native on AWS, GCP, and Vercel. For mobile, we build with React Native and Flutter. We always recommend the right technology for your use case rather than pushing a single stack.",
  },
  {
    id: 6,
    category: "Security",
    question: "How do you handle security and compliance?",
    answer:
      "Security is not an afterthought—it is built into every layer of our development process. We follow OWASP secure coding guidelines, perform regular dependency audits, implement encryption at rest and in transit, and offer optional penetration testing. For regulated industries (fintech, healthcare), we have experience building SOC 2 and HIPAA-compliant infrastructure.",
  },
  {
    id: 7,
    category: "Support",
    question: "What happens after the project is delivered?",
    answer:
      "Every project includes a 30-day post-launch warranty period where we resolve any bugs at no additional cost. After that, we offer flexible monthly retainer packages for ongoing maintenance, feature development, and monitoring. We don't disappear after delivery—many of our clients have been with us for 3+ years.",
  },
  {
    id: 8,
    category: "Process",
    question: "Can you work with an existing codebase or team?",
    answer:
      "Absolutely. We regularly perform code audits and take over legacy codebases. We can integrate directly with your in-house engineering team as an extension, handle a specific module of your platform, or gradually refactor an existing system. We adapt to your workflow and tooling, not the other way around.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 max-w-none relative z-10">
        <div className="relative">
          {/* Top dashed border */}
          <div className="absolute -top-12 -left-8 -right-8 h-[1.5px] dashed-x" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-l border-t border-dashed border-border/60">
            {/* Left: Sticky header */}
            <div className="lg:col-span-2 border-r border-b border-dashed border-border/60 relative h-full">
              <div className="p-8 md:p-12 lg:sticky lg:top-32">
                <AnimatedSection>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 bg-primary/5 border border-primary/20 rounded-sm">
                      <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
                        FAQ
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight leading-[1.1] mb-6">
                      Got a question?
                      <br />
                      <span className="text-muted-foreground/60">We have answers</span>
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      Still have questions? Drop us a line — we respond to every serious inquiry within one business day.
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-sm hover:bg-primary transition-all duration-300 text-sm active:scale-[0.98]"
                    >
                      Ask a Question
                    </a>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Right: Accordion */}
            <div className="lg:col-span-3 flex flex-col border-r border-b border-dashed border-border/60 divide-y divide-dashed divide-border/60 bg-secondary/5">
              {faqData.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 0.05}>
                  <div
                    className="p-5 md:p-6 cursor-pointer group hover:bg-primary/5 transition-colors duration-300"
                    onClick={() => toggle(item.id)}
                  >
                    {/* Question row */}
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="hidden sm:block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm border border-border/60 bg-background text-muted-foreground whitespace-nowrap shrink-0">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                          {item.question}
                        </h3>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {openId === item.id ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {openId === item.id && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <p className="text-base text-muted-foreground leading-relaxed pt-6 pb-2">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Bottom dashed border */}
          <div className="absolute -bottom-12 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>
      </div>
    </section>
  );
}
