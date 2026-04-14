import type { Listing } from "./types";

/**
 * Mock listing fixtures for development. All images use picsum.photos with
 * deterministic seeds so page loads are stable across refreshes (and
 * deterministic for screenshots / visual regression tests).
 *
 * Swap this module out for a real data-fetching layer (React Query + API
 * route) once the backend is ready — the Listing contract above is the
 * stable boundary.
 */

const img = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "l_001",
    kind: "stay",
    title: "Sunlit loft with bay views",
    location: "Sausalito, California",
    distance: "38 kilometers away",
    datesLabel: "May 4 – 9",
    pricePerNight: 312,
    currency: "USD",
    rating: 4.96,
    reviewCount: 214,
    images: [img("tiel-1-a"), img("tiel-1-b"), img("tiel-1-c"), img("tiel-1-d")],
    badges: [{ kind: "guest-favorite", label: "Guest favorite" }],
    host: {
      id: "h_01",
      name: "Amara",
      avatarUrl: img("host-01", 120, 120),
      isSuperhost: true,
      yearsHosting: 6,
    },
  },
  {
    id: "l_002",
    kind: "stay",
    title: "A-frame cabin in the redwoods",
    location: "Mendocino, California",
    distance: "240 kilometers away",
    datesLabel: "Jun 1 – 6",
    pricePerNight: 189,
    currency: "USD",
    rating: 4.88,
    reviewCount: 342,
    images: [img("tiel-2-a"), img("tiel-2-b"), img("tiel-2-c")],
    badges: [{ kind: "rare-find", label: "Rare find" }],
    host: {
      id: "h_02",
      name: "Dimitri",
      avatarUrl: img("host-02", 120, 120),
      isSuperhost: false,
    },
  },
  {
    id: "l_003",
    kind: "stay",
    title: "Whitewashed villa above the Aegean",
    location: "Oia, Greece",
    distance: "9,420 kilometers away",
    datesLabel: "Jul 14 – 19",
    pricePerNight: 524,
    currency: "USD",
    rating: 4.92,
    reviewCount: 87,
    images: [img("tiel-3-a"), img("tiel-3-b"), img("tiel-3-c"), img("tiel-3-d")],
    badges: [{ kind: "superhost", label: "Superhost" }],
    host: {
      id: "h_03",
      name: "Lena",
      avatarUrl: img("host-03", 120, 120),
      isSuperhost: true,
      yearsHosting: 9,
    },
  },
  {
    id: "l_004",
    kind: "stay",
    title: "Stone cottage with private garden",
    location: "Cotswolds, United Kingdom",
    distance: "8,200 kilometers away",
    datesLabel: "Aug 3 – 8",
    pricePerNight: 227,
    currency: "USD",
    rating: 4.81,
    reviewCount: 119,
    images: [img("tiel-4-a"), img("tiel-4-b"), img("tiel-4-c")],
    badges: [{ kind: "guest-favorite", label: "Guest favorite" }],
    host: {
      id: "h_04",
      name: "Idris",
      avatarUrl: img("host-04", 120, 120),
      isSuperhost: true,
    },
  },
  {
    id: "l_005",
    kind: "stay",
    title: "Minimalist beach house on stilts",
    location: "Tulum, Mexico",
    distance: "4,100 kilometers away",
    datesLabel: "Sep 18 – 23",
    pricePerNight: 418,
    currency: "USD",
    rating: 4.79,
    reviewCount: 58,
    images: [img("tiel-5-a"), img("tiel-5-b"), img("tiel-5-c"), img("tiel-5-d")],
    host: {
      id: "h_05",
      name: "Camille",
      avatarUrl: img("host-05", 120, 120),
    },
  },
  {
    id: "l_006",
    kind: "stay",
    title: "Converted grain silo with skylight",
    location: "Hudson Valley, New York",
    distance: "2,380 kilometers away",
    datesLabel: "Oct 5 – 10",
    pricePerNight: 266,
    currency: "USD",
    rating: 4.99,
    reviewCount: 41,
    images: [img("tiel-6-a"), img("tiel-6-b"), img("tiel-6-c")],
    badges: [{ kind: "new", label: "New" }],
    host: {
      id: "h_06",
      name: "Priya",
      avatarUrl: img("host-06", 120, 120),
      isSuperhost: false,
    },
  },
  {
    id: "l_007",
    kind: "stay",
    title: "Alpine chalet with hot tub",
    location: "Chamonix, France",
    distance: "9,050 kilometers away",
    datesLabel: "Dec 20 – 27",
    pricePerNight: 612,
    currency: "USD",
    rating: 4.94,
    reviewCount: 203,
    images: [img("tiel-7-a"), img("tiel-7-b"), img("tiel-7-c"), img("tiel-7-d")],
    badges: [{ kind: "superhost", label: "Superhost" }],
    host: {
      id: "h_07",
      name: "Matthieu",
      avatarUrl: img("host-07", 120, 120),
      isSuperhost: true,
      yearsHosting: 11,
    },
  },
  {
    id: "l_008",
    kind: "stay",
    title: "Desert dome under the stars",
    location: "Joshua Tree, California",
    distance: "620 kilometers away",
    datesLabel: "Nov 12 – 17",
    pricePerNight: 298,
    currency: "USD",
    rating: 4.86,
    reviewCount: 176,
    images: [img("tiel-8-a"), img("tiel-8-b"), img("tiel-8-c")],
    badges: [{ kind: "guest-favorite", label: "Guest favorite" }],
    host: {
      id: "h_08",
      name: "Noor",
      avatarUrl: img("host-08", 120, 120),
      isSuperhost: true,
    },
  },
];

/**
 * Category pills rendered by the FilterBar. Icons are Lucide names — the
 * FilterBar component resolves them to components lazily so we don't
 * bundle the full icon pack on the homepage.
 */
export const CATEGORIES = [
  { id: "trending", label: "Trending", icon: "Flame" },
  { id: "beach", label: "Beach", icon: "Umbrella" },
  { id: "cabins", label: "Cabins", icon: "Tent" },
  { id: "amazing-views", label: "Amazing views", icon: "Mountain" },
  { id: "tiny-homes", label: "Tiny homes", icon: "Home" },
  { id: "lakefront", label: "Lakefront", icon: "Waves" },
  { id: "castles", label: "Castles", icon: "Castle" },
  { id: "design", label: "Design", icon: "Palette" },
  { id: "countryside", label: "Countryside", icon: "TreePine" },
  { id: "tropical", label: "Tropical", icon: "Palmtree" },
  { id: "farms", label: "Farms", icon: "Wheat" },
  { id: "islands", label: "Islands", icon: "Anchor" },
  { id: "arctic", label: "Arctic", icon: "Snowflake" },
  { id: "treehouses", label: "Treehouses", icon: "Trees" },
] as const;
