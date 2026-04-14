import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

/*
 * We load Nunito Sans as the open-source stand-in for Airbnb Cereal. It
 * has the same geometric-humanist quality and ships all four weights we
 * need (400/500/700/800). `next/font` self-hosts + preloads the files so
 * we don't pay a layout-shift or FOUT penalty on first paint.
 *
 * The CSS variable is consumed by tailwind.config.ts under `fontFamily.sans`.
 */
const fontSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiel — Discover, book, and host unique stays",
  description:
    "Tiel is a marketplace for unique stays and experiences. Find homes, cabins, and one-of-a-kind places to stay.",
  // Matches the browser-chrome theme color to the Rausch brand so the
  // mobile address bar tints on iOS/Android when the app is installed.
  themeColor: "#FF5A5F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body>{children}</body>
    </html>
  );
}
