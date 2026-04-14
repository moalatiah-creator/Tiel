/**
 * Shared domain types used across the Tiel marketplace.
 *
 * These mirror Airbnb's core data model (Listing, Host, Review) but with
 * category taxonomy generalized for a broader marketplace — see `kind`
 * on Listing. Narrowing to real business categories (Rental/Experience/
 * Service) will happen at the API boundary once we wire real data.
 */

export type ListingKind = "stay" | "experience" | "service";

export interface HostSummary {
  id: string;
  name: string;
  avatarUrl: string;
  isSuperhost?: boolean;
  yearsHosting?: number;
}

export interface ListingBadge {
  /**
   * Badge taxonomy — kept as a string-union so autocomplete suggests the
   * canonical set, but the string type lets us add bespoke labels like
   * "Rare find" without a code change.
   */
  kind: "guest-favorite" | "superhost" | "rare-find" | "new" | (string & {});
  label: string;
}

export interface Listing {
  id: string;
  kind: ListingKind;
  title: string;           // "Stylish cabin with mountain views"
  location: string;        // "Asheville, North Carolina"
  distance?: string;       // "2,350 kilometers away"
  datesLabel?: string;     // "Apr 12 – 17"
  pricePerNight: number;   // in the display currency
  currency: string;        // ISO 4217 — "USD"
  rating?: number;         // 4.92
  reviewCount?: number;    // 127
  images: string[];        // at least one — the card treats [0] as hero
  badges?: ListingBadge[];
  host: HostSummary;
}
