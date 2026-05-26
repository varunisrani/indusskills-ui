import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Make sure skill-side file reads of skills/*.json and schemas/*.json
  // get bundled into the skillless function on Vercel.
  outputFileTracingIncludes: {
    "/api/v0/skills": ["./skills/**/*"],
    "/api/v0/skills/**": ["./skills/**/*"],
    "/skills": ["./skills/**/*"],
    "/skills/**": ["./skills/**/*"],
  },
};

export default nextConfig;
