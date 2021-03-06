import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { endpoint, prodEndpoint, wsEndpoint, wsProdEndpoint } from '../config';

let apolloClient = null;

const httpUri = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
const wsUri = process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint;
// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch;
}

const wsLink = process.browser
	? new WebSocketLink({
			// if you instantiate in the server, the error will be thrown
			uri: wsUri,
			options: {
				reconnect: true,
			},
	  })
	: null;

const httplink = new HttpLink({
	uri: httpUri,
	credentials: 'include',
});

const hasSubscriptionOperation = ({ query: { definitions } }) =>
	definitions.some(
		({ kind, operation }) =>
			kind === 'OperationDefinition' && operation === 'subscription'
	);

const link = process.browser
	? split(
			//only create the split in the browser
			// split based on operation type
			hasSubscriptionOperation,
			wsLink,
			httplink
	  )
	: httplink;

function getAuthLink(getToken) {
	return setContext((_, { headers }) => {
		const token = getToken();
		return token
			? {
					headers: {
						...headers,
						cookie: `token=${token}`,
					},
			  }
			: {
					headers,
			  };
	});
}

function create(initialState, { getToken }) {
	const authLink = getAuthLink(getToken);

	// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
	return new ApolloClient({
		link: authLink.concat(link),
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		resolvers: {},
		cache: new InMemoryCache({
			cacheRedirects: {
				Query: {
					item: (_, args, { getCacheKey }) => {
						const key = getCacheKey({ __typename: 'Item', id: args.where.id });
						return key;
					},
				},
			},
		}).restore(initialState || {}),
	});
}

export default function initApollo(initialState, options) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create(initialState, options);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState, options);
	}
	return apolloClient;
}

//https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/with-apollo-client.js
//https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/init-apollo.js
//https://gist.github.com/detrohutt/3bddfe943a2f3ef2a797a6f7870049e8 <--- zeit/next.js/examples/with-apollo/lib/initClient.js -- changed to support subscriptions
//https://github.com/apollographql/subscriptions-transport-ws/issues/333 <--use this
