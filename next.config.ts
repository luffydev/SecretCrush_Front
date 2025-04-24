import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'test',
  sw: 'service-worker.js',
})

module.exports = withPWA({
  // Autres configurations Next.js
})

export default nextConfig;
