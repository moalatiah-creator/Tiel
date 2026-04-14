import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ListingCard,
  ListingCardSkeleton,
} from "@/components/ListingCard";
import { MOCK_LISTINGS } from "@/lib/mockData";

/**
 * Homepage — the first milestone per §6 of the spec.
 *
 * This page is intentionally minimal so far: it assembles Navbar /
 * ListingCard grid / Footer using mock data. Subsequent milestones
 * (category FilterBar, map toggle, infinite scroll) layer on top of
 * this scaffold without changing the current structure.
 *
 * The search-panel overlay is stubbed — `onOpenSearch` is a no-op until
 * the SearchPanel component lands. Wiring is kept at this layout level
 * so modal/overlay z-index and focus trapping live outside of Navbar.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="container-tiel py-8">
        {/* Placeholder for the category filter bar that ships in the
            next milestone. Reserving the space now prevents CLS when
            it lands. */}
        <div className="mb-6 h-14 rounded-full bg-transparent" aria-hidden />

        {/* Responsive grid per §2: 4 cols desktop, 2 tablet, 1 mobile.
            `gap-x-6 gap-y-10` matches the 24px horizontal / 40px
            vertical rhythm Airbnb uses between cards. */}
        <section
          aria-label="Popular places to stay"
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {MOCK_LISTINGS.map((listing, i) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              // Prioritize the first row above the fold for LCP.
              priority={i < 4}
            />
          ))}
        </section>

        {/* Skeleton showcase row — shown as a component-library example
            so the team can see loading states in isolation. In real
            navigation this section is replaced by the Suspense fallback
            wrapping the listings fetch. */}
        <section
          aria-label="Loading placeholder example"
          className="mt-16"
        >
          <h2 className="mb-4 text-section text-hof">Loading state</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
