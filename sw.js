const CACHE_NAME = 'indaiafibra-v1.13.0';
const STATIC_CACHE = 'indaiafibra-static-v1.13.0';

// Recursos essenciais para funcionamento offline
const ESSENTIAL_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
  'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://img.icons8.com/?size=2x&id=Sd1fJXRt5uTd&format=png',
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
];

// Recursos que podem ser carregados sob demanda
const OPTIONAL_RESOURCES = [
  'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/',
  'https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/',
  'https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/',
  'https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    Promise.all([
      // Cache de recursos essenciais
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Fazendo cache dos recursos essenciais');
        return cache.addAll(ESSENTIAL_RESOURCES.map(url => {
          return new Request(url, { mode: 'cors' });
        })).catch(error => {
          console.warn('Alguns recursos não puderam ser cacheados:', error);
          // Tenta cachear individualmente os que conseguir
          return Promise.allSettled(
            ESSENTIAL_RESOURCES.map(url => 
              cache.add(new Request(url, { mode: 'cors' }))
            )
          );
        });
      }),
      // Força ativação imediata
      self.skipWaiting()
    ])
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
              console.log('Service Worker: Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Assume controle imediato
      self.clients.claim()
    ])
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignora requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignora requisições para APIs externas específicas (geocoding)
  if (url.hostname === 'nominatim.openstreetmap.org') {
    event.respondWith(
      fetch(request).catch(() => {
        // Retorna resposta offline para geocoding
        return new Response(JSON.stringify({
          address: { road: 'Offline', house_number: 's/n' }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Estratégia Cache First para recursos estáticos
  if (isStaticResource(request.url)) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }
        return fetch(request).then(fetchResponse => {
          // Adiciona ao cache se a resposta for válida
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return fetchResponse;
        }).catch(() => {
          // Retorna página offline se disponível
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
    );
    return;
  }

  // Estratégia Network First para tiles de mapa
  if (isMapTile(request.url)) {
    event.respondWith(
      fetch(request).then(response => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request).then(response => {
          return response || new Response('', { status: 404 });
        });
      })
    );
    return;
  }

  // Para outras requisições, tenta rede primeiro, depois cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Verifica se é um recurso estático
function isStaticResource(url) {
  return ESSENTIAL_RESOURCES.some(resource => url.includes(resource)) ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.svg') ||
         url.includes('fonts.googleapis.com') ||
         url.includes('cdnjs.cloudflare.com') ||
         url.includes('unpkg.com') ||
         url.includes('cdn.jsdelivr.net');
}

// Verifica se é um tile de mapa
function isMapTile(url) {
  return url.includes('cartodb-basemaps') ||
         url.includes('openstreetmap.org') ||
         url.includes('/tiles/') ||
         (url.includes('/{z}/{x}/{y}') || /\/\d+\/\d+\/\d+\.png/.test(url));
}

// Mensagens do cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    caches.keys().then(cacheNames => {
      event.ports[0].postMessage({
        caches: cacheNames,
        isOfflineReady: cacheNames.includes(STATIC_CACHE)
      });
    });
  }
});

// Sincronização em background (quando voltar online)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aqui você pode implementar sincronização de dados pendentes
      console.log('Service Worker: Sincronização em background')
    );
  }
});

console.log('Service Worker: Carregado com sucesso');