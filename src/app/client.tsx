// app/client.tsx
'use client';

import { useEffect } from 'react';

export default function ClientSideSetup() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker enregistré :', registration.scope);
        })
        .catch((error) => {
          console.error('Erreur Service Worker :', error);
        });
    }
  }, []);

  return null; // Aucun rendu visuel nécessaire ici, juste un hook
}
