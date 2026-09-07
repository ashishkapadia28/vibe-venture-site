import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Zap, Target, Award, Sparkles, Users } from "lucide-react";

/**
 * Maps the icon name strings stored in services.json's whyPoints to their
 * lucide-react components — same string-in-JSON / resolve-at-read-time
 * pattern as serviceIcons.ts.
 */
export const whyIcons: Record<string, LucideIcon> = {
  ShieldCheck,
  Zap,
  Target,
  Award,
  Sparkles,
  Users,
};
