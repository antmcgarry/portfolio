import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  basePath: "/portfolio",
  output: "export",
};
console.log("nextConfig", nextConfig);
export default nextConfig;
