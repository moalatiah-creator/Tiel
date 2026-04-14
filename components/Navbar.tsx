"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, Menu, Search, User } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Navbar — the sticky, morphing top navigation.
 *
 * Two visual states:
 *   1. EXPANDED (default, at top of page): logo / nav tabs / full search
 *      pill with three segments on its own row below the brand row.
 *   2. CONDENSED (after ~120px scroll): single row with a compact search
 *      pill on the right of the logo. Matches Airbnb's scroll morph.
 *
 * A third "OPEN" state (clicking the search pill) renders the full
 * search panel overlay — that panel is intentionally a separate
 * component (SearchPanel) wired up by the parent layout so that modal
 * focus / keyboard trap logic can live outside the sticky header.
 *
 * Why this is a client component:
 *   - `scroll` is a client-only event.
 *   - We rely on `useState` for the condensed toggle.
 *   - Server-rendering the top half still works; we just hydrate the
 *     interactive bits on the client.
 */
export function Navbar({
  onOpenSearch,
}: {
  /** Called when any segment of the search pill is clicked. The parent
   *  owns the search-panel overlay so the nav stays lightweight. */
  onOpenSearch?: (segment: "where" | "when" | "who") => void;
}) {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    // We use a simple threshold rather than IntersectionObserver. The
    // nav is always sticky, so measuring window.scrollY is cheap and we
    // avoid wiring up a sentinel element. requestAnimationFrame ensures
    // the state flip aligns with paint and doesn't thrash on scroll.
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCondensed(window.scrollY > 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white shadow-header transition-all duration-300 ease-airbnb",
      )}
    >
      <div className="container-tiel">
        {/* --- Row 1: Logo / Tabs / Right cluster ------------------ */}
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 ease-airbnb",
            condensed ? "h-16" : "h-20",
          )}
        >
          {/* Logo. We use an inline SVG so the mark scales crisply and
              stays brand-colored even during hydration. */}
          <Link
            href="/"
            aria-label="Tiel — home"
            className="flex items-center gap-2"
          >
            <TielLogo className="h-8 w-8 text-rausch" />
            <span className="hidden text-lg font-extrabold text-rausch md:inline">
              tiel
            </span>
          </Link>

          {/* Category tabs — hidden when condensed because the compact
              pill takes their visual slot. */}
          {!condensed && (
            <nav
              className="hidden gap-8 md:flex"
              aria-label="Listing categories"
            >
              <TabLink active>Stays</TabLink>
              <TabLink>Experiences</TabLink>
              <TabLink>
                Services <NewPill />
              </TabLink>
            </nav>
          )}

          {/* Condensed search pill — shown only on scroll. */}
          {condensed && (
            <button
              type="button"
              onClick={() => onOpenSearch?.("where")}
              className={cn(
                "mx-6 hidden h-12 min-w-[320px] items-center justify-between rounded-full border border-gray-line bg-white px-2 pl-6 shadow-card transition-shadow hover:shadow-card-hover md:flex",
              )}
            >
              <span className="text-sm font-semibold text-hof">Anywhere</span>
              <span className="h-6 w-px bg-gray-line" />
              <span className="text-sm font-semibold text-hof">Any week</span>
              <span className="h-6 w-px bg-gray-line" />
              <span className="pr-2 text-sm text-foggy">Add guests</span>
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-rausch text-white">
                <Search aria-hidden className="h-3.5 w-3.5" />
              </span>
            </button>
          )}

          {/* Right cluster: host CTA, language, avatar menu */}
          <div className="flex items-center gap-1">
            <Link
              href="/host"
              className="hidden rounded-full px-3 py-3 text-sm font-semibold text-hof hover:bg-gray-surface md:inline-block"
            >
              Become a host
            </Link>
            <button
              type="button"
              aria-label="Choose language and currency"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-hof hover:bg-gray-surface md:inline-flex"
            >
              <Globe className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Main menu"
              className={cn(
                "ml-1 flex items-center gap-3 rounded-full border border-gray-line bg-white px-3 py-1.5 transition-shadow hover:shadow-card",
              )}
            >
              <Menu className="h-4 w-4 text-hof" aria-hidden />
              {/* Avatar placeholder — replaced by a real <Image/> once
                  auth is wired up. 32×32 matches Airbnb's prod nav. */}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hof text-white">
                <User className="h-4 w-4" aria-hidden />
              </span>
            </button>
          </div>
        </div>

        {/* --- Row 2: Expanded search pill ------------------------- *
         * Only visible in the uncondensed state. Three clickable
         * segments — each opens the full search panel with focus in
         * the relevant field. Dividers fade on hover of an adjacent
         * segment (Airbnb's signature detail) via CSS `group` + peer
         * would be more elaborate; we keep it simple here and leave
         * that polish to the SearchPanel's own internal tabbing.     */}
        {!condensed && (
          <div className="flex justify-center pb-5 pt-1">
            <div
              role="search"
              className="flex h-16 items-stretch rounded-full border border-gray-line bg-white shadow-card transition-shadow hover:shadow-card-hover"
            >
              <SearchSegment
                label="Where"
                placeholder="Search destinations"
                onClick={() => onOpenSearch?.("where")}
              />
              <Divider />
              <SearchSegment
                label="Check in"
                placeholder="Add dates"
                onClick={() => onOpenSearch?.("when")}
              />
              <Divider />
              <SearchSegment
                label="Check out"
                placeholder="Add dates"
                onClick={() => onOpenSearch?.("when")}
              />
              <Divider />
              <SearchSegment
                label="Who"
                placeholder="Add guests"
                onClick={() => onOpenSearch?.("who")}
                trailing={
                  <span className="ml-4 flex h-12 items-center gap-2 rounded-full bg-rausch px-4 font-semibold text-white">
                    <Search className="h-4 w-4" aria-hidden />
                    <span className="hidden md:inline">Search</span>
                  </span>
                }
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/** A single clickable segment inside the expanded search pill. */
function SearchSegment({
  label,
  placeholder,
  onClick,
  trailing,
}: {
  label: string;
  placeholder: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center rounded-full px-6 text-left transition-colors hover:bg-gray-surface"
    >
      <span className="flex flex-col">
        <span className="text-[12px] font-semibold text-hof">{label}</span>
        <span className="text-[14px] text-foggy">{placeholder}</span>
      </span>
      {trailing}
    </button>
  );
}

/** Subtle 1px hairline divider between pill segments. */
function Divider() {
  return <span className="my-3 w-px bg-gray-line" aria-hidden />;
}

function TabLink({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center gap-1 py-2 text-[14px] font-medium transition-colors",
        active ? "text-hof" : "text-foggy hover:text-hof",
      )}
    >
      {children}
      {/* Active underline. The little 24px line underneath each tab is
          the signature indicator on Airbnb's category tabs. */}
      {active && (
        <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-hof" />
      )}
    </button>
  );
}

function NewPill() {
  return (
    <span className="rounded-full bg-[#222] px-2 py-0.5 text-[10px] font-semibold text-white">
      NEW
    </span>
  );
}

/** Simple Tiel mark — stylized heart-over-roof. Replace with finalized
 *  brand logo asset once design ships a proper SVG. */
function TielLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden
    >
      <path d="M16 3c3.3 0 6 2.6 6 5.8 0 2.3-1 4.1-2.9 6.6-1.6 2.1-3.1 3.6-3.1 3.6s-1.5-1.5-3.1-3.6C11 12.9 10 11.1 10 8.8 10 5.6 12.7 3 16 3zm0 24.2c-3.7 0-6.8 1-6.8 2.2 0 .9 3 1.6 6.8 1.6s6.8-.7 6.8-1.6c0-1.2-3.1-2.2-6.8-2.2z" />
    </svg>
  );
}
