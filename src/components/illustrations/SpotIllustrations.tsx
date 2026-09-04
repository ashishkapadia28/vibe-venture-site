// Custom black-and-white line-art spot illustrations.
// Consistent canvas (0 0 140 140), single stroke weight, round joins,
// `currentColor` so they inherit `text-foreground` from the parent card.
// Small accent dots use `fill="currentColor"`; occlusion patches (so
// overlapping linework doesn't look like a crossed mess) use `fill="var(--background)"`.

import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 140 140",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type IllustrationProps = SVGProps<SVGSVGElement>;

/* ── Problem Statement ─────────────────────────────────────────── */

export function LowConversionIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* tipped-over cart */}
      <g transform="rotate(-18 40 78)">
        <path d="M18 55 h10 l8 32 h34" />
        <circle cx="34" cy="96" r="5" />
        <circle cx="58" cy="96" r="5" />
        <path d="M31 55 h34 l-6 22 h-24 z" />
      </g>
      {/* spilled items */}
      <rect x="72" y="70" width="12" height="12" rx="2" transform="rotate(20 78 76)" />
      <circle cx="96" cy="88" r="7" />
      {/* big X above */}
      <path d="M90 28 100 38 M100 28 90 38" />
      {/* running figure bouncing away */}
      <circle cx="118" cy="55" r="6" />
      <path d="M118 61 v14 M118 68 l-9 6 M118 68 l10 4 M118 75 l-7 12 M118 75 l9 10" />
      {/* motion lines */}
      <path d="M78 50 88 47 M74 58 84 56" strokeDasharray="1 7" />
    </svg>
  );
}

export function ManualProcessesIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* stack of papers */}
      <rect x="22" y="70" width="46" height="14" rx="2" />
      <rect x="26" y="58" width="46" height="14" rx="2" fill="var(--background)" />
      <rect x="30" y="46" width="46" height="14" rx="2" fill="var(--background)" />
      <path d="M38 52 h20 M38 64 h20 M34 76 h24" />
      {/* clock */}
      <circle cx="104" cy="40" r="18" />
      <path d="M104 30 v10 l8 6" />
      {/* gear */}
      <circle cx="108" cy="92" r="12" />
      <circle cx="108" cy="92" r="4" fill="var(--background)" />
      <path d="M108 76 v6 M108 102 v6 M124 92 h-6 M92 92 h6 M119 81 l-4 4 M97 103 l-4 4 M119 103 l-4-4 M97 81 l-4-4" />
      {/* exasperated stick figure */}
      <circle cx="42" cy="100" r="7" />
      <path d="M42 107 v16 M42 112 l-11 -6 M42 112 l11 -6 M42 123 l-8 10 M42 123 l8 10" />
      <circle cx="30" cy="92" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InvisibleSEOIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* faded browser window */}
      <rect x="24" y="20" width="80" height="58" rx="6" strokeDasharray="4 5" />
      <path d="M24 34 h80" strokeDasharray="4 5" />
      <circle cx="33" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="40" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="47" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <path d="M40 56 q10 -14 20 0 q10 14 20 0" strokeDasharray="4 5" />
      {/* floating question mark */}
      <path d="M92 44 q0 -8 8 -8 t8 8 q0 6 -8 8 v4" />
      <circle cx="100" cy="66" r="1.8" fill="currentColor" stroke="none" />
      {/* magnifying glass */}
      <circle cx="52" cy="102" r="16" />
      <path d="M63 113 l14 14" />
      {/* sparkle of confusion */}
      <path d="M108 96 l3 3 l3 -3 l-3 -3 z" />
    </svg>
  );
}

/* ── Features / What We Do ─────────────────────────────────────── */

export function WebDevIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* laptop */}
      <rect x="30" y="24" width="66" height="46" rx="4" />
      <path d="M20 84 h96 l-8 -10 h-80 z" />
      {/* code tags on screen */}
      <path d="M52 40 l-8 8 8 8 M74 40 l8 8 -8 8 M66 38 l-6 20" />
      {/* stick figure typing */}
      <circle cx="112" cy="96" r="7" />
      <path d="M112 103 v14 M112 108 l-10 4 M112 108 l10 4" />
      <path d="M96 128 q16 -10 32 0" />
      {/* coffee cup */}
      <path d="M18 100 h16 v10 a8 8 0 0 1 -16 0 z" />
      <path d="M34 102 q6 0 6 5 t-6 5" />
      <path d="M22 92 q2 -4 0 -6 M28 92 q2 -4 0 -6" strokeDasharray="1 4" />
    </svg>
  );
}

export function MobileAppsIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* phone */}
      <rect x="44" y="14" width="52" height="94" rx="10" />
      <path d="M62 22 h16" />
      {/* app grid */}
      <rect x="52" y="34" width="14" height="14" rx="3" />
      <rect x="74" y="34" width="14" height="14" rx="3" fill="var(--background)" />
      <rect x="52" y="56" width="14" height="14" rx="3" fill="var(--background)" />
      <rect x="74" y="56" width="14" height="14" rx="3" />
      <rect x="52" y="78" width="14" height="14" rx="3" fill="var(--background)" />
      <rect x="74" y="78" width="14" height="14" rx="3" fill="var(--background)" />
      {/* tap ripple */}
      <circle cx="81" cy="63" r="14" strokeDasharray="3 5" />
      {/* notification bubble */}
      <circle cx="104" cy="24" r="9" />
      <path d="M104 20 v6 M104 28 v0.2" />
      {/* tapping finger */}
      <path d="M20 100 q4 -18 20 -18" />
      <circle cx="18" cy="98" r="4" />
    </svg>
  );
}

export function UIUXIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* artboard */}
      <rect x="18" y="22" width="72" height="86" rx="4" />
      <rect x="28" y="34" width="30" height="22" rx="2" />
      <path d="M28 66 h52 M28 76 h52 M28 86 h34" />
      {/* bezier path being drawn */}
      <path d="M96 40 q22 6 10 34 t18 30" strokeDasharray="0" />
      <circle cx="96" cy="40" r="3" />
      <circle cx="106" cy="74" r="3" />
      <circle cx="124" cy="104" r="3" />
      {/* pen nib */}
      <path d="M118 92 l14 -14 6 6 -14 14 z" />
      {/* color swatches */}
      <circle cx="30" cy="118" r="6" fill="currentColor" />
      <circle cx="46" cy="118" r="6" />
      <circle cx="62" cy="118" r="6" strokeDasharray="2 3" />
    </svg>
  );
}

export function CMSDevelopmentIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* CMS panel */}
      <rect x="16" y="20" width="108" height="82" rx="6" />
      <path d="M16 36 h108" />
      <circle cx="26" cy="28" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="33" cy="28" r="1.6" fill="currentColor" stroke="none" />
      {/* sidebar page list */}
      <path d="M50 36 v66" />
      <rect x="24" y="44" width="18" height="8" rx="2" fill="var(--background)" />
      <rect x="24" y="58" width="18" height="8" rx="2" />
      <rect x="24" y="72" width="18" height="8" rx="2" fill="var(--background)" />
      {/* content lines */}
      <path d="M60 46 h52 M60 56 h52 M60 66 h34" />
      <rect x="60" y="78" width="30" height="14" rx="3" />
      {/* editing pencil */}
      <path d="M104 76 l14 -14 6 6 -14 14 h-6 z" />
    </svg>
  );
}

export function SaaSDevelopmentIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* cloud */}
      <path d="M40 42 q-4 -12 10 -12 q5 -10 15 -3 q12 -5 15 9 q10 0 8 12 h-46 q-10 0 -8 -9 q-2 -7 6 -7 z" />
      {/* connecting lines */}
      <path d="M56 51 v14 M76 51 v10 l14 8" strokeDasharray="1 6" />
      {/* subscription layers */}
      <rect x="26" y="70" width="44" height="16" rx="3" fill="var(--background)" />
      <rect x="34" y="86" width="44" height="16" rx="3" />
      <rect x="42" y="102" width="44" height="16" rx="3" fill="var(--background)" />
      {/* orbiting device */}
      <rect x="98" y="78" width="24" height="34" rx="4" />
      <path d="M106 84 h8" />
    </svg>
  );
}

export function AIAutomationIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* looping workflow nodes */}
      <circle cx="40" cy="34" r="12" />
      <circle cx="100" cy="34" r="12" fill="var(--background)" />
      <circle cx="100" cy="94" r="12" />
      <circle cx="40" cy="94" r="12" fill="var(--background)" />
      {/* connecting loop with arrows */}
      <path d="M52 34 h36" />
      <path d="M84 34 l-6 -5 M84 34 l-6 5" />
      <path d="M100 46 v36" />
      <path d="M100 78 l-5 -6 M100 78 l5 -6" />
      <path d="M88 94 h-36" />
      <path d="M56 94 l6 -5 M56 94 l6 5" />
      <path d="M40 82 v-36" />
      <path d="M40 50 l-5 6 M40 50 l5 6" />
      {/* center gear */}
      <circle cx="70" cy="64" r="11" fill="var(--background)" />
      <circle cx="70" cy="64" r="4" />
      <path d="M70 51 v4 M70 73 v4 M83 64 h-4 M61 64 h-4 M79 55 l-3 3 M58 70 l-3 3 M79 73 l-3 -3 M58 58 l-3 -3" />
    </svg>
  );
}

export function ConversionRateOptimizationIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* upward funnel — most dots make it through */}
      <path d="M20 96 h40 l-8 -60 h-24 z" />
      <circle cx="32" cy="90" r="3" fill="currentColor" stroke="none" />
      <circle cx="40" cy="80" r="3" fill="currentColor" stroke="none" />
      <circle cx="35" cy="60" r="3" fill="currentColor" stroke="none" />
      <circle cx="40" cy="40" r="3" fill="currentColor" stroke="none" />
      {/* success flag at the top */}
      <path d="M40 36 v-22" />
      <path d="M40 14 l18 7 -18 7 z" fill="var(--background)" />
      {/* A/B test toggle, B winning */}
      <rect x="78" y="24" width="22" height="16" rx="4" fill="var(--background)" />
      <rect x="78" y="46" width="22" height="16" rx="4" />
      <path d="M83 54 l4 4 9 -9" />
      {/* upward growth arrow */}
      <path d="M74 114 l14 -20 12 10 20 -32" />
      <path d="M114 64 h10 v10" />
    </svg>
  );
}

export function EcommerceIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* storefront screen */}
      <rect x="18" y="16" width="88" height="60" rx="5" />
      <path d="M18 30 h88" />
      {/* product grid */}
      <rect x="28" y="38" width="16" height="16" rx="2" fill="var(--background)" />
      <rect x="50" y="38" width="16" height="16" rx="2" />
      <rect x="72" y="38" width="16" height="16" rx="2" fill="var(--background)" />
      {/* cart */}
      <path d="M30 96 h10 l8 30 h44" />
      <circle cx="52" cy="130" r="5" />
      <circle cx="76" cy="130" r="5" />
      <path d="M44 96 h48 l-6 20 h-36 z" />
      {/* arrow into cart */}
      <path d="M112 60 v24 M106 78 l6 6 6 -6" />
    </svg>
  );
}

export function BrandingCreativeIllustration(props: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      {/* palette */}
      <path d="M70 18 a42 38 0 1 0 30 72 q6 0 6 -8 q0 -6 -6 -8 q-6 -2 -6 -8 q0 -6 8 -6 h6 a12 12 0 0 0 0 -24 q-4 0 -8 -2 a38 38 0 0 0 -30 -16 z" />
      <circle cx="52" cy="42" r="6" fill="currentColor" />
      <circle cx="38" cy="62" r="6" fill="var(--background)" />
      <circle cx="48" cy="84" r="6" />
      <circle cx="72" cy="94" r="6" fill="var(--background)" />
      {/* pen nib drawing a logo mark */}
      <path d="M108 88 l16 -16 6 6 -16 16 h-6 z" />
      <path d="M100 106 q6 -10 14 -10" strokeDasharray="1 6" />
    </svg>
  );
}
