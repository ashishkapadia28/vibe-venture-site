"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";

const AUTO_SCROLL_SPEED = 0.5; // px per frame — smooth, not fast

export function CaseStudyGallery({ images, title }: { images: string[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const loopImages = useMemo(() => (images.length > 1 ? [...images, ...images] : images), [images]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || images.length <= 1) return;

    let frameId: number;

    const tick = () => {
      if (!pausedRef.current) {
        const halfWidth = el.scrollWidth / 2;
        el.scrollLeft += AUTO_SCROLL_SPEED;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [images.length]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
        className="flex gap-5 overflow-x-auto pb-2 scrollbar-none"
      >
        {loopImages.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 w-[80vw] sm:w-96 md:w-105 aspect-square rounded-4xl overflow-hidden border border-border/50 bg-white"
          >
            <Image
              src={src}
              alt={`${title} — image ${(i % images.length) + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 420px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-background to-background/0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-background to-background/0 pointer-events-none" />
    </div>
  );
}
