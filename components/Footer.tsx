"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, Globe, DollarSign } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Footer — Airbnb-style 4-column link grid on desktop, accordion on
 * mobile, plus a sticky-feeling bottom bar for legal + locale controls.
 *
 * Why this is a client component: the mobile accordion needs state. We
 * could hoist that into a server/client split, but the whole footer is
 * below the fold and not critical to SEO, so keeping it simple is fine.
 */

const columns = [
  {
    id: "support",
    title: "Support",
    links: [
      "Help Center",
      "AirCover for guests",
      "Anti-discrimination",
      "Disability support",
      "Cancellation options",
      "Report concern",
    ],
  },
  {
    id: "hosting",
    title: "Hosting",
    links: [
      "Tiel your home",
      "AirCover for hosts",
      "Hosting resources",
      "Community forum",
      "Hosting responsibly",
      "Find a co-host",
    ],
  },
  {
    id: "tiel",
    title: "Tiel",
    links: [
      "Newsroom",
      "New features",
      "Careers",
      "Investors",
      "Gift cards",
      "Emergency stays",
    ],
  },
  {
    id: "discover",
    title: "Discover",
    links: [
      "Trust & safety",
      "Accessibility",
      "Guest referrals",
      "Host referrals",
      "Press",
      "Affiliate program",
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-line bg-gray-surface">
      <div className="container-tiel py-12">
        {/* Desktop grid — 4 columns. The spec calls out a 4-col layout. */}
        <div className="hidden gap-8 md:grid md:grid-cols-4">
          {columns.map((col) => (
            <FooterColumn key={col.id} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Mobile — collapsible accordion per the responsive spec. */}
        <div className="md:hidden">
          {columns.map((col) => (
            <FooterAccordion key={col.id} title={col.title} links={col.links} />
          ))}
        </div>
      </div>

      {/* --- Bottom legal + locale bar ----------------------------- */}
      <div className="border-t border-gray-line">
        <div className="container-tiel flex flex-col items-start gap-4 py-6 text-[13px] text-hof md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} Tiel, Inc.</span>
            <span className="hidden md:inline">·</span>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <span className="hidden md:inline">·</span>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <span className="hidden md:inline">·</span>
            <Link href="/sitemap" className="hover:underline">
              Sitemap
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 font-semibold hover:underline"
            >
              <Globe className="h-4 w-4" aria-hidden />
              English (US)
            </button>
            <button
              type="button"
              className="flex items-center gap-2 font-semibold hover:underline"
            >
              <DollarSign className="h-4 w-4" aria-hidden />
              USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly string[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[14px] font-semibold text-hof">{title}</h4>
      <ul className="space-y-3">
        {links.map((label) => (
          <li key={label}>
            {/* All footer links point to "#" for now — they'll be swapped
                with real routes as the information architecture firms up.
                We keep them as <a> for SEO crawlability. */}
            <a href="#" className="text-[14px] text-hof hover:underline">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-line last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-hof">{title}</span>
        <ChevronUp
          aria-hidden
          className={cn(
            "h-4 w-4 text-foggy transition-transform duration-200",
            open ? "rotate-0" : "rotate-180",
          )}
        />
      </button>
      {/* Height-transitioned panel. Using grid-rows is a neat trick to
          animate to `auto` height without measuring JS-side. */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-airbnb",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul className="overflow-hidden pb-4">
          {links.map((label) => (
            <li key={label} className="py-2">
              <a href="#" className="text-[14px] text-hof hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
