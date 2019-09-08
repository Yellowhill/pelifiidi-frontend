const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		// Be sure to pass `true` as the second argument to `url.parse`.
		// This tells it to parse the query portion of the URL.
		const parsedUrl = parse(req.url, true);
		const { pathname, query } = parsedUrl;
		//console.log('createServer pathname---------------: ', pathname);
		// console.log('splitted first+++++++++++++++++++++: ', pathname.split('/')[1]);
		// console.log('createServer query---------------: ', query);
		if (pathname === '/sw.js') {
			res.setHeader('content-type', 'text/javascript');
			createReadStream('./offline/serviceWorker.js').pipe(res);
		} else if (pathname.split('/')[1] === 'uutinen') {
			app.render(req, res, '/detail', query);
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(7777, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:7777');
	});
});
