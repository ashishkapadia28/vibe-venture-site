"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { Code, Palette, Search, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "design",
    label: "UI/UX Design",
    icon: Palette,
    title: "Crafting Pixel-Perfect Experiences",
    description: "Our design team creates stunning, user-centric interfaces that not only look beautiful but drive conversions. We use a combination of modern glassmorphism, precise dotted-line accents, and bold typography to make your brand stand out.",
    color: "from-emerald-400 to-primary",
  },
  {
    id: "development",
    label: "Web Development",
    icon: Code,
    title: "Robust, Scalable Architecture",
    description: "Built on Next.js and Tailwind CSS, we ensure your web presence is blazingly fast. We integrate seamless animations, interactive tabs, and solid backend systems to give you an edge over the competition.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "seo",
    label: "SEO Optimization",
    icon: Search,
    title: "Rank Higher, Grow Faster",
    description: "We don't just build websites; we make sure they get seen. Our built-in SEO strategies, fast load times, and structured data ensure your site ranks at the top of search engine results.",
    color: "from-orange-400 to-rose-500",
  }
];

export function TabSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary font-medium text-sm mb-6 shadow-sm">
              <Sparkles size={16} />
              <span>Our Expertise</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground tracking-tight">Our Core Capabilities</h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Explore how we bring your vision to life through structured, professional workflows and cutting-edge technologies.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <div className="glass rounded-3xl p-2 md:p-3 shadow-2xl border border-border/50 relative overflow-hidden bg-white/40">
            {/* Tabs Header */}
            <div className="flex flex-col md:flex-row gap-2 p-2 relative z-20">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-medium transition-colors duration-300 z-10 focus:outline-none",
                      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2 text-base md:text-lg">
                      <Icon size={20} className={cn("transition-transform duration-300", isActive && "scale-110")} />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-8 md:p-14 relative min-h-[400px] flex items-center rounded-2xl overflow-hidden mt-2 bg-white/60 border border-border/30 shadow-inner">
              {/* Dynamic Gradient Background for Active Content */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`bg-${activeTab}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  className={cn(
                    "absolute top-0 right-0 w-full md:w-3/4 h-full bg-gradient-to-bl blur-3xl rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none",
                    activeTabData.color
                  )}
                />
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center w-full"
                >
                  <div className="space-y-8">
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                      {activeTabData.title}
                    </h3>
                    
                    <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-transparent rounded-full opacity-80" />
                    
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      {activeTabData.description}
                    </p>

                    <button className="flex items-center gap-2 text-primary font-semibold text-lg group">
                      Learn more about {activeTabData.label.toLowerCase()}
                      <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                    </button>
                  </div>
                  
                  <div className="hidden md:flex justify-center items-center relative">
                    {/* Visual Element depending on tab */}
                    <div className="relative w-72 h-72 flex items-center justify-center">
                       <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
                       <div className="absolute inset-4 border border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                       <div className="absolute inset-8 rounded-full glass flex items-center justify-center shadow-2xl bg-white/50 border border-white/80">
                          <activeTabData.icon size={80} strokeWidth={1.5} className="text-primary drop-shadow-sm" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
