// Service Worker do Agenda Técnico Inteligente (IndaiaFibra)
// v2 — corrige dados da API ficando presos em cache

const CACHE_NAME = 'agenda-tecnico-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instala e já guarda o "esqueleto" do app
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ativa a nova versão imediatamente, sem esperar fechar todas as abas
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

// Ativa e apaga caches antigos (de versões anteriores do sw.js)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // assume o controle das abas já abertas
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Chamadas para a API (MockAPI) NUNCA passam pelo cache — sempre rede, sempre dado fresco
  if (url.hostname.includes('mockapi.io')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Para o restante do app (html/css/js/ícones): tenta a rede primeiro,
  // e só usa o cache como reserva se estiver offline
  event.respondWith(
    fetch(event.request)
      .then((resposta) => {
        const copia = resposta.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
        return resposta;
      })
      .catch(() => caches.match(event.request))
  );
});
