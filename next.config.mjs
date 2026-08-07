import { ASSET_PREFIX } from "./lib/siteConfig.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: ASSET_PREFIX,
};

export default nextConfig;
