import type { NextConfig } from "next";

const getConvexHostname = () => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) return "localhost";

  try {
    // Remove protocol (http://, https://, ws://, wss://, etc.)
    const hostname = convexUrl.replace(/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//, "");
    // Remove any path, query params, or port
    return hostname.split('/')[0].split('?')[0].split(':')[0];
  } catch {
    return "localhost";
  }
};

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getConvexHostname(),
      },
    ],
  },
};

export default nextConfig;
