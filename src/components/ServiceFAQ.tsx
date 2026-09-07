"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/data/services";

export function ServiceFAQ({ name, faqs }: { name: string; faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Ambient gradient blob */}
      <div className="absolute -top-20 -left-16 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="relative mb-16">
          <AnimatedSection>
            <SectionHeader
              alignment="center"
              badge="FAQS"
              title={
                <>
                  {name} <span className="text-primary">FAQs</span>
                </>
              }
              subtitle="Straight answers to the questions we hear most before a project kicks off."
              className="mx-auto text-center items-center"
            />
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="flex flex-col gap-2 max-w-2xl mx-auto">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-3.5"
                  >
                    <span className="font-semibold text-foreground">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-foreground/70 text-center">
            Still have questions?{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline underline-offset-4">
              Let&apos;s talk.
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
