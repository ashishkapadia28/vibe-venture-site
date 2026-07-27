import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  alignment?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  alignment = "left",
  theme = "light",
  className
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "flex flex-col gap-4 max-w-2xl",
      alignment === "center" && "mx-auto text-center items-center",
      className
    )}>
      {badge && (
        <span className="w-fit inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
          {badge}
        </span>
      )}
      
      <h2 className={cn(
        "text-4xl md:text-5xl lg:text-[56px] font-heading font-bold leading-[1.1] tracking-tight",
        isDark ? "text-secondary-foreground" : "text-foreground"
      )}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn(
          "text-lg font-medium leading-relaxed max-w-xl",
          isDark ? "text-secondary-foreground/70" : "text-foreground/70"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
