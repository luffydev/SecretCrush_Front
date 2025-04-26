import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'test',
  sw: 'service-worker.js',
})

module.exports = withPWA({
  env: {
    SC_API_URL: "http://127.0.0.1:3001",  // URL de l'API
    SC_API_BASE_KEY: "c3bc7d56-e96c-4e00-ae5a-cfb74fb5a2a2", // Clé API secrète
    SC_RECAPTCHA_KEY: "6LffUyUrAAAAAIbry8aunGUoReDnxxbOUubP1orw"
  }
})

export default withPWA({nextConfig});
