# Tiel

An Airbnb-inspired marketplace platform. Built with Next.js (App Router),
TypeScript, and Tailwind CSS.

## Status

Milestone 1 — **project scaffold + first three components**:

- Design tokens wired into Tailwind and CSS variables (`tailwind.config.ts`, `app/globals.css`)
- Font loaded via `next/font` (Nunito Sans — Airbnb Cereal stand-in)
- `Navbar` — sticky, morphing search pill with scroll-condense
- `ListingCard` + `ListingCardSkeleton` — image carousel, optimistic
  save/heart, dot pagination, loading shimmer
- `Footer` — 4-column desktop grid, mobile accordion, locale/currency bar
- Homepage composing all three with mock listing data

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project structure

```
app/
  globals.css       Design tokens as CSS variables + component classes
  layout.tsx        Root layout, font loading
  page.tsx          Homepage (Nav + card grid + Footer)
components/
  Navbar.tsx
  ListingCard.tsx
  Footer.tsx
lib/
  cn.ts             clsx + tailwind-merge helper
  types.ts          Shared domain types (Listing, Host, etc.)
  mockData.ts       Deterministic placeholder listings
```

## Design tokens

Token names follow Airbnb's DLS vocabulary (`rausch`, `hof`, `foggy`,
`babu`) so anyone familiar with their design system can navigate ours.
See the top of `tailwind.config.ts` for the full mapping and the
rationale comments.

## What's next

Per the implementation order in the spec:

1. Category FilterBar (scrollable pills + Filters modal)
2. Expanded SearchPanel overlay (wired into `Navbar#onOpenSearch`)
3. Listing Detail page (image gallery + sticky booking widget)
4. Booking / checkout flow
5. Auth modals
6. User + Host dashboards
7. Messaging inbox
8. Map integration
9. Mobile responsive pass + polish
