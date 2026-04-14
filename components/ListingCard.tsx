"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Listing } from "@/lib/types";

/**
 * ListingCard — the marquee card component. Responsible for the image
 * carousel, save/heart interaction, and summary info stack.
 *
 * Composition notes:
 *   - The whole card is wrapped in a Link for SEO + middle-click support,
 *     but the carousel arrows and heart are rendered as nested <button>s
 *     with `stopPropagation` so they don't trigger navigation.
 *   - `<Image fill>` requires a parent with an aspect ratio; we use
 *     `aspect-square` for 1:1 on the homepage grid per the spec. Caller
 *     can pass `aspectClass="aspect-[3/2]"` if they want 3:2 instead.
 *   - Optimistic UI: heart flips state immediately and triggers the
 *     `heartPop` keyframe. The real server call (not wired yet) should
 *     roll back on failure with a toast.
 */
export interface ListingCardProps {
  listing: Listing;
  /** Tailwind aspect class. Defaults to square. */
  aspectClass?: string;
  /** Show distance line under title. Defaults true. */
  showDistance?: boolean;
  /** Whether the heart is prefilled (e.g. from a wishlist page). */
  initiallySaved?: boolean;
  /** Priority image loading — pass `true` for cards above the fold. */
  priority?: boolean;
  className?: string;
}

export function ListingCard({
  listing,
  aspectClass = "aspect-square",
  showDistance = true,
  initiallySaved = false,
  priority = false,
  className,
}: ListingCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [saved, setSaved] = useState(initiallySaved);
  // `poppingHeart` gates the keyframe so it re-runs on each click rather
  // than only on the first toggle. We reset it after the 280ms animation.
  const [poppingHeart, setPoppingHeart] = useState(false);

  const totalImages = listing.images.length;
  const hasMultiple = totalImages > 1;

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % totalImages);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + totalImages) % totalImages);
  };
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((s) => !s);
    setPoppingHeart(true);
    window.setTimeout(() => setPoppingHeart(false), 300);
  };

  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(listing.pricePerNight);

  return (
    <Link
      href={`/listings/${listing.id}`}
      className={cn("group block", className)}
      aria-label={`${listing.title} in ${listing.location}`}
    >
      {/* --- Media well --------------------------------------------- */}
      <div
        className={cn(
          "relative overflow-hidden rounded-card bg-gray-surface",
          aspectClass,
        )}
      >
        {/* We render all images stacked and fade between them. Keeping
            them mounted means Next.js can pre-cache neighbor frames so
            the carousel feels snappy. */}
        {listing.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority && i === 0}
            className={cn(
              "object-cover transition-opacity duration-300 ease-airbnb",
              i === imgIdx ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        {/* Badges — top-left. The spec uses a subtle white pill. */}
        {listing.badges && listing.badges.length > 0 && (
          <div className="absolute left-3 top-3 flex gap-1">
            {listing.badges.slice(0, 1).map((b) => (
              <span
                key={b.kind}
                className="rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-semibold text-hof shadow-popover backdrop-blur"
              >
                {b.label}
              </span>
            ))}
          </div>
        )}

        {/* Heart / save — top-right. Uses a shadow + scale pop on click. */}
        <button
          type="button"
          onClick={toggleSave}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full transition-transform hover:scale-110"
        >
          <Heart
            aria-hidden
            className={cn(
              "h-7 w-7 transition-colors",
              // Airbnb's heart uses a semi-transparent black fill for
              // unsaved and pure rausch for saved, with a white stroke
              // in both states so it reads on any photo.
              saved
                ? "fill-rausch text-white"
                : "fill-black/40 text-white",
              poppingHeart && "animate-heartPop",
            )}
            strokeWidth={2}
          />
        </button>

        {/* Carousel arrows — only on hover, only when multiple images. */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className={cn(
                "absolute left-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white text-hof opacity-0 shadow-popover transition-opacity",
                "group-hover:opacity-100 focus-visible:opacity-100",
              )}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className={cn(
                "absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white text-hof opacity-0 shadow-popover transition-opacity",
                "group-hover:opacity-100 focus-visible:opacity-100",
              )}
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>

            {/* Dot pagination — fixed to the bottom. Dots shrink at the
                edges to mimic Airbnb's infinite-carousel aesthetic. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1">
              {listing.images.map((_, i) => {
                const distance = Math.abs(i - imgIdx);
                const size =
                  distance === 0 ? "h-1.5 w-1.5" : distance === 1 ? "h-1 w-1" : "h-[3px] w-[3px]";
                return (
                  <span
                    key={i}
                    className={cn(
                      "rounded-full bg-white transition-all duration-200",
                      size,
                      i === imgIdx ? "opacity-100" : "opacity-70",
                    )}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* --- Content ----------------------------------------------- */}
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-[15px] font-semibold text-hof">
            {listing.location}
          </h3>

          {/* Rating pair — star + number. Tabular nums keep it stable
              across cards when the rating has one vs two decimals. */}
          {typeof listing.rating === "number" && (
            <span className="flex shrink-0 items-center gap-1 text-[14px] text-hof">
              <Star className="h-3.5 w-3.5 fill-hof text-hof" aria-hidden />
              <span className="num">{listing.rating.toFixed(2)}</span>
            </span>
          )}
        </div>

        {showDistance && listing.distance && (
          <p className="truncate text-[14px] text-foggy">{listing.distance}</p>
        )}
        {listing.datesLabel && (
          <p className="truncate text-[14px] text-foggy">{listing.datesLabel}</p>
        )}

        <p className="pt-1 text-[14px] text-hof">
          <span className="font-semibold">{priceFormatted}</span>
          <span className="text-foggy"> night</span>
        </p>
      </div>
    </Link>
  );
}

/**
 * ListingCardSkeleton — the pulsing gray counterpart rendered while
 * listings are loading. Matches the card's geometry exactly so there's
 * zero layout shift when real data arrives.
 */
export function ListingCardSkeleton({
  aspectClass = "aspect-square",
}: {
  aspectClass?: string;
}) {
  return (
    <div aria-hidden>
      <div className={cn("skeleton w-full", aspectClass)} />
      <div className="pt-3">
        <div className="skeleton mb-2 h-4 w-3/5" />
        <div className="skeleton mb-1 h-3 w-2/5" />
        <div className="skeleton mb-3 h-3 w-1/3" />
        <div className="skeleton h-4 w-1/4" />
      </div>
    </div>
  );
}
