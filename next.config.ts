import type { NextConfig } from 'next';
const withPWA = require('next-pwa');

// Configuration de Next.js
const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SC_API_URL: 'http://34.155.60.160/api',  // URL de l'API
    SC_API_BASE_KEY: 'c3bc7d56-e96c-4e00-ae5a-cfb74fb5a2a2', // Clé API secrète
    SC_RECAPTCHA_KEY: '6LfRnjcrAAAAAHco-4dymWfIxhf0zJ2XbQmNPcPt'
  },
  // Autres options de configuration Next.js...
};

// Utilisation de `withPWA` pour ajouter la fonctionnalité PWA
const pwaConfig = withPWA({
  dest: 'public',  // Où le service worker sera généré
  register: true,  // Enregistrer le Service Worker
  skipWaiting: true,  // Forcer l'activation immédiate du Service Worker
  disable: process.env.NODE_ENV === 'development',  // Désactiver en développement
  sw: 'sw.js',  // Nom du fichier Service Worker personnalisé
  workbox: false,  // Désactiver Workbox
  runtimeCaching: [],  // Désactiver le caching automatique de Workbox
  clientsClaim: true,  // Prendre immédiatement le contrôle des clients
});

// Fusionner la configuration Next.js avec la configuration PWA
module.exports = {
  ...nextConfig,
  ...pwaConfig,
};
