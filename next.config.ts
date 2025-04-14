import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  output: "export",
};
console.log("nextConfig", nextConfig);
export default nextConfig;
