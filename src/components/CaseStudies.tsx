"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { BentoWidget } from "./ui/BentoWidget";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const portfolioItems = [
  {
    id: 1,
    title: "Arpanex",
    category: "End-to-End Website & Brand",
    image: "/client/arpanex/arpanex_home_img.png",
    colSpan: "md:col-span-2",
  },
  {
    id: 2,
    title: "Echovyn",
    category: "Brand Design",
    image: "/client/echovyn/home_page_img.png",
    colSpan: "md:col-span-1",
  },
  {
    id: 3,
    title: "Nyrly",
    category: "Retails POS",
    image: "/client/nyrly/nyrly_home_img.png",
    colSpan: "md:col-span-1",
  },
  {
    id: 4,
    title: "Vediq Care",
    category: "Clinic Management Software",
    image: "/client/VediqCare/VediqCare_home_img.png",
    colSpan: "md:col-span-2",
  }
];

export function CaseStudies() {
  return (
    <section className="py-32 relative bg-secondary overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
        <AnimatedSection delay={0.1} className="mb-16">
          <SectionHeader 
            title="Take A Look At Our Recent Work"
            theme="dark"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <AnimatedSection 
              key={item.id} 
              delay={0.2 + (index * 0.1)} 
              className={item.colSpan}
            >
              <BentoWidget 
                className="group relative h-[400px] w-full p-0 cursor-pointer overflow-hidden border-0 bg-secondary"
              >
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-white text-foreground flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </BentoWidget>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection delay={0.5} className="mt-16 text-center">
          <button className="px-8 py-4 rounded-full border border-secondary-foreground/20 text-secondary-foreground font-semibold text-base transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-2 mx-auto">
            View All Projects
          </button>
        </AnimatedSection>

      </div>
    </section>
  );
}
