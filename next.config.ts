import type { NextConfig } from "next";

// Statisk eksport: siden kan hostes hvor som helst (fx Azure Static Web Apps,
// Netlify, Vercel eller en almindelig webserver). Billeder er præ-optimeret med
// `npm run images`, så Next's runtime-billedoptimering er ikke nødvendig.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
