const CACHE_NAME = 'pelifiidi-cache-v1';
const urlsToCache = ['/', 'detail', 'static/favicon.png', 'static/nprogress.css'];

self.addEventListener('install', (event) => {
	// console.log('serviceWorker.js install EVENT');
	const preLoaded = caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache));
	event.waitUntil(preLoaded);
});

self.addEventListener('fetch', (event) => {
	// console.log('service worker feeeeetch: ', event.request);
	// if Offline, return placeholder image
	if (event.request.url.includes('livegamers')) {
		const responsePromise = fetch('static/favicon.png');
		return event.respondWith(responsePromise);
	}
	const response = caches
		.match(event.request)
		.then(
			(response) =>
				response ||
				fetch(event.request, {
					credentials: 'include',
				})
		)
		.catch((err) => {
			console.log('ServiceWorker fetch-error: ', err);
		});
	event.respondWith(response);
});
