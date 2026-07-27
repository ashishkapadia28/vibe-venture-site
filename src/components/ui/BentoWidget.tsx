import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoWidgetProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glass?: boolean;
}

export function BentoWidget({
  children,
  className,
  delay = 0,
  glass = false,
}: BentoWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-4xl overflow-hidden p-6",
        glass ? "bg-background/70 backdrop-blur-xl border border-border/50" : "bg-background shadow-xl shadow-foreground/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
