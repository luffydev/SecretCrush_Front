// Nom du cache
const CACHE_NAME = "secretcrush-cache";

// Liste des fichiers à cacher
const FILES_TO_CACHE = [
  '/offline.html',
  '/favicon.ico',
  '/manifest.json',
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/offline.html'))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});

// Notifications Push
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push reçu.');

  let data = {};

  try {
    // Vérifie si event.data existe et tente de le parser en JSON
    if (event.data) {
      
      console.log("test");
      console.log(event.data.text());

      let test = null;

      try{
        test = event.data.json();
      }catch{
        test = event.data.text();
      }
      
      data = test;
    }
  } catch (error) {
    console.error('[Service Worker] Erreur de parsing JSON:', error);
    
    // Si ce n'est pas du JSON valide, utiliser un texte brut par défaut
    data = { title: 'Nouvelle Notification', body: 'Erreur dans le message Push.' };
  }

  // Si `data` n'est pas encore un objet JSON valide, il est probablement du texte brut
  if (typeof data === 'string') {
    data = { title: 'Nouvelle Notification', body: data };
  }

  const title = data.title || 'Nouvelle Notification';
  const options = {
    body: data.body || 'Vous avez un nouveau message.',
    icon: '/logo192.png', // Ton icône
    badge: '/favicon.ico',
  };

  // Afficher la notification
  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});