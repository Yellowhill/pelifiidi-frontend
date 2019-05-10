const CACHE_NAME = 'pelifiidi-cache-v1';
const urlsToCache = ['/', 'detail', 'static/favicon.png', 'static/nprogress.css'];

self.addEventListener('install', (event) => {
	const preLoaded = caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache));
	event.waitUntil(preLoaded);
});

self.addEventListener('fetch', (event) => {
	const response = caches.match(event.request).then(
		(match) =>
			match ||
			fetch(event.request, {
				credentials: 'include',
			})
	);
	event.respondWith(response);
});
