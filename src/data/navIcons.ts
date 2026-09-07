import type { ComponentType } from "react";
import { Palette, Code2, TrendingUp, Gauge } from "lucide-react";
import { TbStethoscope } from "react-icons/tb";

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

/**
 * Maps icon name strings used in navbar.json (category headers, dropdown
 * items, image-list items) to their React icon components — same
 * string-in-JSON / resolve-at-read-time pattern as serviceIcons.ts.
 */
export const navIcons: Record<string, IconComponent> = {
  Palette,
  Code2,
  TrendingUp,
  Gauge,
  TbStethoscope,
};
