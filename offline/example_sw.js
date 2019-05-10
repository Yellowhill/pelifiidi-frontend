var CACHE = 'cache-update-and-refresh';

// On install, cache some resource.
self.addEventListener('install', function(evt) {
	console.log('The service worker is being installed.');
	// Open a cache and use `addAll()` with an array of assets to add all of them
	// to the cache. Ask the service worker to keep installing until the
	// returning promise resolves.
	evt.waitUntil(
		caches.open(CACHE).then(function(cache) {
			cache.addAll(['./controlled.html', './asset']);
		})
	);
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
	console.log('The service worker is serving the asset.');
	// You can use `respondWith()` to answer ASAP...
	evt.respondWith(fromCache(evt.request));
	// ...and `waitUntil()` to prevent the worker to be killed until
	// the cache is updated.
	evt.waitUntil(
		update(evt.request)
			// Finally, send a message to the client to inform it about the
			// resource is up to date.
			.then(refresh)
	);
});

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
	return caches.open(CACHE).then(function(cache) {
		return cache.match(request);
	});
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
	return caches.open(CACHE).then(function(cache) {
		return fetch(request).then(function(response) {
			return cache.put(request, response.clone()).then(function() {
				return response;
			});
		});
	});
}

// Sends a message to the clients.
function refresh(response) {
	return self.clients.matchAll().then(function(clients) {
		clients.forEach(function(client) {
			// Encode which resource has been updated. By including the
			// [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can
			// check if the content has changed.
			var message = {
				type: 'refresh',
				url: response.url,
				// Notice not all servers return the ETag header. If this is not
				// provided you should use other cache headers or rely on your own
				// means to check if the content has changed.
				eTag: response.headers.get('ETag'),
			};
			// Tell the client about the update.
			client.postMessage(JSON.stringify(message));
		});
	});
}

//CLIENT SIDE JS
var CACHE = 'cache-update-and-refresh';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.onmessage = function(evt) {
		var message = JSON.parse(evt.data);

		var isRefresh = message.type === 'refresh';
		var isAsset = message.url.includes('asset');
		var lastETag = localStorage.currentETag;

		// [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) header usually contains
		// the hash of the resource so it is a very effective way of check for fresh
		// content.
		var isNew = lastETag !== message.eTag;

		if (isRefresh && isAsset && isNew) {
			// Escape the first time (when there is no ETag yet)
			if (lastETag) {
				// Inform the user about the update
				notice.hidden = false;
			}
			// For teaching purposes, although this information is in the offline
			// cache and it could be retrieved from the service worker, keeping track
			// of the header in the `localStorage` keeps the implementation simple.
			localStorage.currentETag = message.eTag;
		}
	};

	var notice = document.querySelector('#update-notice');

	var update = document.querySelector('#update');
	update.onclick = function(evt) {
		var img = document.querySelector('img');
		// Avoid navigation.
		evt.preventDefault();
		// Open the proper cache.
		caches
			.open(CACHE)
			// Get the updated response.
			.then(function(cache) {
				return cache.match(img.src);
			})
			// Extract the body as a blob.
			.then(function(response) {
				return response.blob();
			})
			// Update the image content.
			.then(function(bodyBlob) {
				var url = URL.createObjectURL(bodyBlob);
				img.src = url;
				notice.hidden = true;
			});
	};
}
