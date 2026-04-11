import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoBasePath = "/sirena-driving-school";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? repoBasePath : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
