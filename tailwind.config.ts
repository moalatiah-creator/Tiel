import type { Config } from "tailwindcss";

/**
 * Tiel design tokens — modeled directly on Airbnb's 2024/2025 visual system.
 *
 * Why we map these into Tailwind instead of raw CSS variables:
 *   1. Tailwind keeps the token → utility mapping explicit and greppable,
 *      so designers can audit usage by searching `text-hof` or `bg-rausch`.
 *   2. The semantic token names (rausch, hof, foggy, babu) echo Airbnb's
 *      internal naming. Keeping the same vocabulary shortens onboarding
 *      for anyone who's worked in their design system.
 *   3. The raw hex values are *also* exposed as CSS variables in
 *      `app/globals.css`, which lets us flip a `data-theme="dark"` attribute
 *      on <html> to support dark mode later without touching component code.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Airbnb uses a fairly tight breakpoint ladder. We keep `sm/md/lg/xl`
    // but tune the values so `md` kicks in at tablet and `lg` matches the
    // ~1128px content container they use for listing grids.
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1128px",
      xl: "1280px",
      "2xl": "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // 24px — matches Airbnb mobile gutter
        lg: "2.5rem",      // 40px — desktop gutter
      },
      screens: {
        lg: "1128px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Brand
        rausch: {
          DEFAULT: "var(--color-rausch)",         // #FF5A5F
          dark: "var(--color-rausch-dark)",       // hover/active pressed state
          gradientFrom: "#E61E4D",                // CTA gradient start
          gradientVia: "#E31C5F",
          gradientTo: "#D70466",                  // CTA gradient end
        },
        babu: "#00A699",       // Airbnb's teal accent (used on experiences)
        arches: "#FC642D",      // secondary accent (used on experience cards)

        // Neutrals
        hof: "var(--color-hof)",         // #484848 — headings
        foggy: "var(--color-foggy)",     // #767676 — muted body
        "gray-line": "var(--color-line)",// #EBEBEB — hairline border
        "gray-surface": "var(--color-surface)", // #F7F7F7 — section bg

        // Semantic
        success: "var(--color-success)", // #008A05
        star: "var(--color-star)",       // #FFB400

        // Utility
        overlay: "rgba(0,0,0,0.4)",
      },
      fontFamily: {
        // Cereal is Airbnb-proprietary; we substitute Circular Std (if
        // licensed) and fall back to Nunito Sans → system sans. Loaded via
        // `next/font` in app/layout.tsx.
        sans: ["var(--font-sans)", "Circular Std", "Nunito Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Matches the scale in §1 of the spec. Line heights default to 1.5
        // for body and 1.2 for headings via utilities (leading-tight).
        micro: ["12px", { lineHeight: "16px", letterSpacing: "0" }],
        caption: ["14px", { lineHeight: "20px" }],
        body: ["16px", { lineHeight: "24px" }],
        subsection: ["18px", { lineHeight: "22px", fontWeight: "600" }],
        cardtitle: ["22px", { lineHeight: "26px", fontWeight: "600" }],
        section: ["26px", { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "700" }],
        hero: ["32px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      // 8px base grid. We don't override Tailwind's full scale — we extend
      // the semantic aliases the spec calls out so `p-section` means
      // "section padding" rather than guessing `p-12`.
      spacing: {
        section: "48px",
        "section-mobile": "24px",
        gutter: "24px",
        "gutter-mobile": "16px",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        input: "8px",
        modal: "16px",
      },
      boxShadow: {
        // Exact values from §1 — matching Airbnb's DLS "elevation/2"
        // through "elevation/4".
        card: "0 6px 16px rgba(0,0,0,0.12)",
        "card-hover": "0 2px 16px rgba(0,0,0,0.12)",
        popover: "0 2px 16px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.08)",
        header: "0 1px 0 rgba(0,0,0,0.08)",
        modal: "0 8px 28px rgba(0,0,0,0.28)",
        // Focus ring in Airbnb's accessible black
        focus: "0 0 0 2px #ffffff, 0 0 0 4px #000000",
      },
      keyframes: {
        // Heart pop used on the save/wishlist action — spec calls it out
        // explicitly as an optimistic-UI micro-interaction.
        heartPop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
        // Skeleton shimmer — animates a light→lighter gray gradient across
        // the placeholder block.
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        // Used by the expanded search panel sliding down from the nav.
        slideDown: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        heartPop: "heartPop 280ms ease-out",
        shimmer: "shimmer 1.6s linear infinite",
        slideDown: "slideDown 260ms cubic-bezier(0.2, 0, 0, 1)",
        fadeIn: "fadeIn 200ms ease-out",
      },
      transitionTimingFunction: {
        // Airbnb's motion token — "easeOut" feels softer than the default
        // cubic-bezier and matches the morph between search states.
        airbnb: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
