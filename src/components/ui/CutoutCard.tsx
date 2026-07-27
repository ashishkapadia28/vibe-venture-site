import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CutoutCardProps {
  imageSrc: string;
  altText: string;
  buttonContent: React.ReactNode;
  className?: string;
  contentPosition?: "bottom-left" | "bottom-right";
}

export function CutoutCard({
  imageSrc,
  altText,
  buttonContent,
  className,
  contentPosition = "bottom-left"
}: CutoutCardProps) {
  const isLeft = contentPosition === "bottom-left";

  return (
    <div className={cn("relative w-full h-full rounded-[2rem] overflow-hidden group", className)}>
      {/* Background Image */}
      <Image 
        src={imageSrc} 
        alt={altText} 
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw" 
      />

      {/* Overlay Content Panel */}
      <div className={cn(
        "absolute bottom-0 bg-background p-4 z-10 flex items-center gap-4",
        isLeft 
          ? "left-0 rounded-tr-[2rem] pr-6 pt-6" 
          : "right-0 rounded-tl-[2rem] pl-6 pt-6"
      )}>
        {buttonContent}
        
        {isLeft ? (
          <>
            {/* Top-left inverted corner */}
            <div className="absolute -top-8 left-0 w-8 h-8 bg-transparent rounded-bl-[2rem] shadow-[-16px_16px_0_16px_var(--color-background)] pointer-events-none" />
            {/* Bottom-right inverted corner */}
            <div className="absolute bottom-0 -right-8 w-8 h-8 bg-transparent rounded-bl-[2rem] shadow-[-16px_16px_0_16px_var(--color-background)] pointer-events-none" />
          </>
        ) : (
          <>
            {/* Top-right inverted corner */}
            <div className="absolute -top-8 right-0 w-8 h-8 bg-transparent rounded-br-[2rem] shadow-[16px_16px_0_16px_var(--color-background)] pointer-events-none" />
            {/* Bottom-left inverted corner */}
            <div className="absolute bottom-0 -left-8 w-8 h-8 bg-transparent rounded-br-[2rem] shadow-[16px_16px_0_16px_var(--color-background)] pointer-events-none" />
          </>
        )}
      </div>
    </div>
  );
}
