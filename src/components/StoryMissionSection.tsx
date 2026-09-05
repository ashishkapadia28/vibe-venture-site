"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";

export function StoryMissionSection() {
  const [hovered, setHovered] = useState<"vision" | "mission" | null>(null);

  const gridTemplateColumns =
    hovered === "vision" ? "1.6fr 1fr" : hovered === "mission" ? "1fr 1.6fr" : "1fr 1fr";

  const isVisionActive = hovered === "vision";
  const isMissionActive = hovered === "mission";

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch transition-[grid-template-columns] duration-500 ease-in-out"
          style={{ gridTemplateColumns }}
        >
          {/* Left – vision, real abstract image card */}
          <AnimatedSection delay={0.1}>
            <div
              onMouseEnter={() => setHovered("vision")}
              onMouseLeave={() => setHovered(null)}
              className="group relative h-full min-h-125 rounded-3xl overflow-hidden border border-border/60 shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/10"
            >
              <Image
                src="/abstract/about_our_vision.png"
                alt="Abstract representation of Vibe Venture's engineering craft"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />

              {/* Default label */}
              <div
                className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-500 ${
                  isVisionActive ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                }`}
              >
                <span className="text-2xl md:text-3xl font-heading font-bold tracking-[0.15em] text-white uppercase">
                  Our Vision
                </span>
              </div>

              {/* Hover-revealed content */}
              <div
                className={`relative z-10 h-full flex flex-col justify-end p-8 md:p-10 transition-all duration-500 ${
                  isVisionActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-5 border border-white/25 bg-white/10 backdrop-blur-sm rounded-md w-fit">
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">Our Vision</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight text-white">
                  To be the web, app &amp; AI development partner <span className="text-primary">ambitious brands grow with.</span>
                </h2>
                <p className="text-white/75 leading-relaxed text-sm">
                  Vibe Venture envisions a future where every business — from early-stage startups to global enterprises — can access enterprise-grade web development, mobile apps, and AI automation without enterprise price tags or timelines.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right – mission, bold color card */}
          <AnimatedSection delay={0.2}>
            <div
              onMouseEnter={() => setHovered("mission")}
              onMouseLeave={() => setHovered(null)}
              className="group relative h-full rounded-3xl text-primary-foreground overflow-hidden transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/30"
            >
              <Image
                src="/abstract/about_our_mission.png"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-linear-to-t transition-all duration-500 ${
                  isMissionActive ? "from-black/95 via-black/80 to-black/65" : "from-black/10 via-black/5 to-transparent"
                }`}
              />

              {/* Default label */}
              <div
                className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-500 ${
                  isMissionActive ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                }`}
              >
                <span className="text-2xl md:text-3xl font-heading font-bold tracking-[0.15em] text-white uppercase">
                  Our Mission
                </span>
              </div>

              {/* Hover-revealed content */}
              <div
                className={`relative z-10 h-full flex flex-col justify-end p-8 md:p-10 transition-all duration-500 ${
                  isMissionActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-5 border border-white/25 bg-white/10 backdrop-blur-sm rounded-md w-fit">
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">Our Mission</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight text-white">
                  Engineer growth for brands <span className="text-primary">that refuse to blend in.</span>
                </h2>
                <p className="text-white/75 leading-relaxed text-sm mb-6">
                  Our mission is to empower ambitious brands to thrive in the digital era through custom web development, mobile apps, and AI-powered automation — paired with conversion-focused design that turns visitors into customers.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
