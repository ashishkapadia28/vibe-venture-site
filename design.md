# Vibe Venture — Design System Rules

This documents the design system actually implemented on the homepage (`src/app/page.tsx` and the components it renders: `Hero`, `AgencyIntro`, `ClientLogos`, `ShopifyPartnerSection`, `ProblemStatement`, `Features`, `ServicesWhy`, `Testimonials`, `ContactSection`, `CTA`, `Navbar`, `Footer`). Treat it as the source of truth — any bug fix or refactor must keep the site visually identical unless a design change is explicitly requested. When a component elsewhere in the app diverges from this doc (e.g. the green shadow in `ContactForm.tsx`), the doc wins and the component is the bug.

## 1. Color tokens (`src/app/globals.css`)

Only edit colors through these CSS variables — never hardcode a hex/rgba color inline.

| Token | Value | Use |
|---|---|---|
| `--background` | `#FDFBF7` | Page background (warm cream, not pure white) |
| `--foreground` | `#1A1A1A` | Body text |
| `--primary` | `#7C3AED` | **The only brand accent — vibrant violet.** Buttons, links, icons, badges, glows |
| `--primary-foreground` | `#FFFFFF` | Text/icons on top of `--primary` |
| `--secondary` | `#121212` | Dark charcoal section backgrounds (CTA banner, dark bento widgets) |
| `--secondary-foreground` | `#FFFFFF` | Text on dark sections |
| `--accent` | `#F4F0EA` | Muted light background variant |
| `--muted` | `#EBE6DF` | Muted surface fill |
| `--muted-foreground` | `#6B7280` | De-emphasized text |
| `--border` | `#E5E7EB` | Hairline borders |

Opacity modifiers (`text-foreground/70`, `bg-primary/10`, `bg-primary/5`) are used constantly for hierarchy instead of introducing new colors — prefer `/opacity` on an existing token over a new one.

**Known violation to fix, not to copy:** `src/components/ContactForm.tsx`'s submit button uses `hover:shadow-[0_0_20px_rgba(4,173,127,0.3)]` — that's green, left over from an earlier palette. The correct glow is violet, e.g. `hover:shadow-primary/20` or `rgba(124,58,237,0.3)`.

## 2. Typography

- `--font-sans` → **Inter** (`--font-inter`, loaded in `layout.tsx`) — body text, default.
- `--font-heading` → **Outfit** (`--font-outfit`) — every heading uses `font-heading`.
- Scale (Tailwind classes actually in use, don't invent new sizes):
  - Hero H1: `text-5xl md:text-6xl lg:text-[72px] font-heading font-bold leading-[1.05] tracking-tight`
  - Section H2: `text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.1] tracking-tight` (this is what `SectionHeader` renders — reuse the component, don't hand-roll headings in new sections)
  - Card/widget H3/H4: `text-lg`–`text-2xl font-heading font-bold`
  - Body/lead paragraph: `text-lg md:text-xl text-foreground/70 font-medium leading-relaxed`
  - Small body: `text-base leading-relaxed` or `text-sm`
  - Eyebrow/label: `text-[11px]`–`text-sm font-bold tracking-widest uppercase`

## 3. Layout

- **Container**: every section wraps content in
  `<div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">` — this exact padding scale is the site-wide horizontal rhythm. Don't introduce a different `px-*` scale in a new section.
- **Section vertical rhythm**: `py-24` is the default section padding. Hero is the exception (`pt-32 pb-16 lg:pt-40 lg:pb-24`, plus `min-h-screen`) because it sits under the fixed navbar.
- **Grid gaps**: `gap-6` for card grids, `gap-8`–`gap-16` for major layout blocks.

## 4. Radius & elevation

- Pills/buttons: `rounded-full`.
- Cards: `rounded-2xl` (Features cards), `rounded-3xl` (Navbar mega-menu), `rounded-4xl` (`BentoWidget`), `rounded-[2rem]` (CTA banner — an intentional one-off for the biggest surface on the page).
- Shadows: `shadow-sm` (resting), `hover:shadow-xl` + `hover:-translate-y-1` (card hover lift), `shadow-xl shadow-foreground/5` (bento widgets), `hover:shadow-sm hover:shadow-primary/20` (primary buttons — a *tinted* glow, always using `--primary`, never a raw color).

## 5. Buttons (copy these exactly, don't rederive)

Primary:
```
px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px]
transition-all duration-300 hover:bg-primary/90 hover:shadow-sm hover:shadow-primary/20
flex items-center justify-center gap-1.5 group
```
paired with `<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />`.

Secondary (on light bg):
```
px-6 py-3 rounded-full bg-white border border-border text-foreground font-medium text-[15px]
transition-all duration-300 hover:bg-gray-50 shadow-sm
```

Outline-on-primary (used on dark/`--secondary` sections): swap to `border border-primary text-primary hover:bg-primary hover:text-primary-foreground`.

## 6. `SectionHeader` component (`src/components/ui/SectionHeader.tsx`)

Every content section's heading block goes through this component, not custom markup:
- `badge` → pill: `bg-primary/10 text-primary ring-1 ring-inset ring-primary/20`
- `title` → the H2 scale above, supports a `<span className="text-primary">` for the emphasized word/phrase
- `subtitle` → `text-foreground/70` (or `/70` on `secondary-foreground` when `theme="dark"`)
- `alignment="left" | "center"`, `theme="light" | "dark"` — reuse these props for section variants instead of new classes.

## 7. Motion

Two motion primitives, both from Framer Motion — use these, don't hand-write new `motion.div` variants for standard content reveals:

- **`AnimatedSection`** (`src/components/AnimatedSection.tsx`) — wraps any block that should fade+slide in once on scroll. `initial opacity:0` + a 40px offset in `direction` (default `"up"`), animates to `opacity:1, x:0, y:0` on `useInView` (`once: true, margin: "-100px"`), `duration: 0.8`, easing `[0.21, 0.47, 0.32, 0.98]`. Stagger siblings with `delay={index * 0.08}`–`0.1`.
- **`BentoWidget`** (`src/components/ui/BentoWidget.tsx`) — for floating card/widget elements specifically (Hero's floating stat cards, etc.): `initial y:20 opacity:0`, `whileInView` trigger (`margin: "-50px"`), `duration: 0.6`, easing `[0.22, 1, 0.36, 1]`, base classes `rounded-4xl overflow-hidden p-6` with either the solid-shadow variant or `glass` (`bg-background/70 backdrop-blur-xl border border-border/50`).

Don't add new easing curves or durations for the same kind of reveal — reuse these two.

## 8. Decorative background treatment

Recurring pattern across sections (Features, CTA, Career hero, etc.): one or two soft blurred blobs pinned to a corner, absolutely positioned, `pointer-events-none`, `z-0`, behind a `relative z-10` content wrapper:
```
<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/4" />
```
Always `bg-primary/5` or `bg-primary/10` — never a different hue — and always non-interactive.

## 9. Icons

`lucide-react` throughout. Decorative/feature icons: `strokeWidth={1.5}`, size 24–32. Inline UI icons (arrows, chevrons): default stroke, size 14–20. Icon color follows the surface: `text-primary` on light/white, inherits `currentColor` on dark badges.

## 10. Guardrails when fixing bugs

1. Don't introduce a new color — if something needs an accent, it's `--primary` at some opacity, or a real Tailwind gray for pure UI chrome (borders, disabled states), never a bespoke hex.
2. Don't reinvent the button/card/heading recipes above — copy the existing class strings.
3. Any new section header goes through `SectionHeader`; any new scroll-reveal goes through `AnimatedSection`.
4. Container padding is always `px-8 md:px-16 lg:px-24 xl:px-32` inside `container mx-auto`.
5. If a fix requires touching a `.tsx` file's className, diff it mentally against this doc before committing — the goal of every bugfix in this pass is *zero visual regression* on the homepage.
