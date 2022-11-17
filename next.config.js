/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  staticPageGenerationTimeout: 60 * 5, // TODO: improve graph data calculation performance
};

module.exports = nextConfig;
