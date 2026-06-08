"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  metric: string;
  avatar: string;
  category: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: "Vibe Venture completely rebuilt our web portals. They migrated our legacy Angular codebase to serverless Next.js, optimizing mobile load speed by 180%.",
    author: "Sarah Jenkins",
    role: "CMO",
    company: "TechNova",
    rating: 5,
    metric: "+180% Page Speed Boost",
    category: "SaaS & AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    quote: "Migrating our B2B pipeline was a massive challenge. Vibe Venture executed the cloud migration with zero downtime, boosting read speeds by 300%.",
    author: "Dr. Marcus Vance",
    role: "CTO",
    company: "Fintech Nexus",
    rating: 5,
    metric: "0ms Transaction Downtime",
    category: "Fintech & Web3",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    quote: "Their solutions architects designed a scalable headless CMS framework that slashed our content publishing cycles by 70%. Highly optimized.",
    author: "Jane Sterling",
    role: "VP of Product",
    company: "CloudScale AI",
    rating: 5,
    metric: "-70% Editor Cycle Time",
    category: "SaaS & AI",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 4,
    quote: "Our tracking dashboard required real-time WebSocket syncing and high concurrency. Vibe Venture delivered a bulletproof dashboard.",
    author: "Vikram Mehta",
    role: "Director of Operations",
    company: "Apex Logistics",
    rating: 5,
    metric: "100k+ Active Concurrencies",
    category: "Enterprise Cloud",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 5,
    quote: "Their frontend development patterns and layout optimization reduced our customer checkout bounce rate by 34%. Strategic tech partners.",
    author: "Michael Chang",
    role: "Co-Founder & CEO",
    company: "Elevate Platform",
    rating: 5,
    metric: "-34% Checkout Bounce",
    category: "SaaS & AI",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 6,
    quote: "Exceptional security audit outcomes. They designed our real-time monitoring infrastructure with state-of-the-art encryption protocols.",
    author: "Elena Rostova",
    role: "VP of Engineering",
    company: "Aether Billing",
    rating: 5,
    metric: "100% Security Audit Score",
    category: "Fintech & Web3",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 7,
    quote: "Outstanding code quality. The clean architecture and documentation made handoff to our internal engineering team seamless.",
    author: "Alex Mercer",
    role: "Lead Architect",
    company: "DevCorp Solutions",
    rating: 5,
    metric: "Clean Code Architecture",
    category: "Enterprise Cloud",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 8,
    quote: "They optimized our database query patterns, turning 12-second reporting wait times into sub-second loads. Highly recommend their architects.",
    author: "Sophia Alavi",
    role: "VP Operations",
    company: "Zenith SaaS",
    rating: 5,
    metric: "<1s Database Reports",
    category: "SaaS & AI",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 9,
    quote: "Highly communicative, fast iterations, and a robust microservices deployment pipeline that cut our DevOps overhead by 45%.",
    author: "Kofi Anan",
    role: "Founder",
    company: "AgriTech Africa",
    rating: 5,
    metric: "-45% DevOps Server Cost",
    category: "Enterprise Cloud",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80"
  }
];



export function Testimonials() {
  // We manage the order of the deck using a state array
  const [cards, setCards] = useState<Testimonial[]>(testimonialsData);

  // When a card is dragged out and dropped, we move it to the back of the deck
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If the card is dragged far enough horizontally or vertically
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        // Move the top card (last in array) to the beginning (bottom of the deck)
        const topCard = newCards.pop();
        if (topCard) {
          newCards.unshift(topCard);
        }
        return newCards;
      });
    }
  };

  // We are mapping the cards. The last item in the array is the top card.
  // We only show the top 4 cards for performance and visuals.
  const visibleCardsCount = 4;

  return (
    <section className="py-24 bg-background relative overflow-hidden z-10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header matched with Features.tsx */}
        <div className="relative mb-16 z-30">
          <div className="absolute -top-8 -left-8 -right-8 h-[1.5px] dashed-x" />
          
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8 pb-2">
            <div className="text-left">
              <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
                TESTIMONIALS
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.1]">
                Trusted by leaders
                <br />
                <span className="text-muted-foreground/60">from various industries</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed text-left">
              Learn why professionals trust our solutions to complete their customer journeys.
            </p>
          </AnimatedSection>

          <div className="absolute -bottom-8 -left-8 -right-8 h-[1.5px] dashed-x" />
        </div>

        {/* Avatars Arch Grid Container */}
        <div className="relative w-full h-[360px] md:h-[400px] mb-8 overflow-hidden rounded-3xl bg-secondary/5 px-4 md:px-12 flex flex-col justify-end">
          
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 items-center relative z-10 w-full h-full pt-12 pb-6">
            
            {/* Column 1 */}
            <div className="hidden lg:flex flex-col gap-4 relative h-full justify-center translate-y-16">
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[0].avatar} alt={testimonialsData[0].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
            </div>

            {/* Column 2 */}
            <div className="hidden lg:flex flex-col gap-4 relative h-full justify-center translate-y-8">
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[1].avatar} alt={testimonialsData[1].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[2].avatar} alt={testimonialsData[2].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="hidden md:flex flex-col gap-4 relative h-full justify-center translate-y-2">
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[3].avatar} alt={testimonialsData[3].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4 relative h-full justify-center -translate-y-4">
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 border-primary scale-105">
                <Image src={testimonialsData[4].avatar} alt={testimonialsData[4].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
            </div>

            {/* Column 5 - Center */}
            <div className="flex flex-col gap-4 relative h-full justify-center -translate-y-10">
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[5].avatar} alt={testimonialsData[5].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
            </div>

            {/* Column 6 */}
            <div className="flex flex-col gap-4 relative h-full justify-center -translate-y-4">
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[6].avatar} alt={testimonialsData[6].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
            </div>

            {/* Column 7 */}
            <div className="hidden md:flex flex-col gap-4 relative h-full justify-center translate-y-2">
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[7].avatar} alt={testimonialsData[7].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
            </div>

            {/* Column 8 */}
            <div className="hidden lg:flex flex-col gap-4 relative h-full justify-center translate-y-8">
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src={testimonialsData[8].avatar} alt={testimonialsData[8].author} fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
            </div>

            {/* Column 9 */}
            <div className="hidden lg:flex flex-col gap-4 relative h-full justify-center translate-y-16">
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80" alt="Client" fill sizes="(max-width: 768px) 100vw, 20vw" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="w-full aspect-4/5 rounded-2xl bg-linear-to-br from-secondary/30 via-secondary/10 to-transparent border border-border/10 backdrop-blur-sm" />
            </div>

          </div>

          {/* Fade overlays on top and bottom of the arch container */}
          <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-background to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background via-background/90 to-transparent pointer-events-none z-20" />
        </div>

        {/* Playable 3D Card Stack Container (Framer Motion Swipable) */}
        <div className="text-center max-w-4xl mx-auto relative z-30 mt-16">
          <AnimatedSection>
            <div className="relative w-full max-w-xl mx-auto h-[290px] md:h-[250px] mb-12 select-none perspective-[1000px]">
              <AnimatePresence>
                {cards.map((testimonial, index) => {
                  // We only care about rendering the last N cards for performance
                  if (index < cards.length - visibleCardsCount) return null;

                  // Distance from the top card (0 is top, 1 is the one right behind it, etc)
                  const reverseIndex = cards.length - 1 - index;
                  
                  // Top card is fully draggable, others are visually stacked behind
                  const isTop = reverseIndex === 0;

                  return (
                    <motion.div
                      key={testimonial.id}
                      className={`absolute inset-0 bg-background rounded-3xl p-6 md:p-8 text-left border origin-bottom ${
                        isTop ? 'cursor-grab active:cursor-grabbing z-30 border-border/50 shadow-2xl' :
                        reverseIndex === 1 ? 'z-20 border-border/30 shadow-lg pointer-events-none' :
                        'z-10 border-border/20 shadow-md pointer-events-none'
                      }`}
                      drag={isTop ? true : false}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.8}
                      onDragEnd={(e, info) => handleDragEnd(e, info)}
                      initial={{ 
                        opacity: 0, 
                        y: 100, 
                        scale: 0.8 
                      }}
                      animate={{ 
                        opacity: reverseIndex >= visibleCardsCount ? 0 : 1 - (reverseIndex * 0.25),
                        y: reverseIndex * 16,
                        scale: 1 - (reverseIndex * 0.05),
                        rotate: isTop ? 0 : reverseIndex % 2 === 0 ? -2 : 1.5,
                        zIndex: 30 - reverseIndex
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 0.2 }
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                      whileHover={isTop ? { scale: 1.02, rotate: 0.5 } : {}}
                      whileDrag={isTop ? { scale: 1.05, cursor: "grabbing" } : {}}
                    >
                      <Quote size={40} className="text-primary/10 absolute top-4 left-4 pointer-events-none" />
                      
                      <div className="flex flex-col h-full justify-between relative z-10 pointer-events-none">
                        <div>
                          <div className="flex gap-0.5 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                          <p className="text-sm md:text-base text-foreground font-medium italic leading-relaxed line-clamp-3 md:line-clamp-4">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-solid border-border/40">
                          <div>
                            <h4 className="font-bold text-xs text-foreground tracking-tight">{testimonial.author}</h4>
                            <p className="text-[10px] text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full text-[9px] font-bold text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {testimonial.metric}
                          </div>
                        </div>
                      </div>

                      {isTop && (
                        <span className="absolute bottom-3 right-4 text-[8px] font-bold tracking-wider text-muted-foreground/40 uppercase pointer-events-none">
                          Swipe to Shuffle
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}
