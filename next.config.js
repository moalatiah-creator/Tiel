/** @type {import('next').NextConfig} */
// Only allow placeholder image hosts during development. When you wire up
// real CDN-hosted media you'll want to extend `remotePatterns` with the
// specific hostnames — this keeps next/image from silently loading
// arbitrary third-party content.
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
