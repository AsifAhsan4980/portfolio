import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s3.ap-southeast-1.amazonaws.com" },
      { protocol: "https", hostname: "www.zodolive.com" },
      { protocol: "https", hostname: "www.righttracksit.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.wozaif.com" },
      { protocol: "https", hostname: "s3.ap-southeast-1.amazonaws.com" },
      { protocol: "https", hostname: "www.thedoodleinc.com" },
    ],
  },
};

export default nextConfig;
