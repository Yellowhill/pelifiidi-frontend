import React from 'react';
import initApollo from './init-apollo';
import cookie from 'cookie';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';

function parseCookies(req, options = {}) {
	// console.log('PARSECOOKIES - req, document', req);

	if (req) {
		return cookie.parse(req.headers.cookie || '', options);
	}
	if (process.browser) {
		return cookie.parse(document.cookie || '', options);
	}
	return '';
}

export default (App) => {
	return class Apollo extends React.Component {
		static displayName = 'withApollo(App)';
		static async getInitialProps(ctx) {
			console.log('+++++++++++++++++++++++++++ CTX:+++++++++++++++: ', ctx);
			const {
				Component,
				router,
				AppTree,
				ctx: { req, res },
			} = ctx;

			// Run all GraphQL queries in the component tree
			// and extract the resulting data
			const apollo = initApollo(
				{},
				{
					getToken: () => {
						console.log('parseCookies(req): ', parseCookies(req));
						return parseCookies(req).token;
					},
				}
			);

			ctx.ctx.apolloClient = apollo;

			let appProps = {};
			if (App.getInitialProps) {
				appProps = await App.getInitialProps(ctx);
			}

			if (res && res.finished) {
				// When redirecting, the response is finished.
				// No point in continuing to render
				return {};
			}

			if (!process.browser) {
				try {
					// Run all GraphQL queries
					await getDataFromTree(
						<App
							{...appProps}
							Component={Component}
							router={router}
							apolloClient={apollo}
						/>
					);
				} catch (error) {
					// Prevent Apollo Client GraphQL errors from crashing SSR.
					// Handle them in components via the data.error prop:
					// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
					console.error('Error while running `getDataFromTree`', error);
				}

				// getDataFromTree does not call componentWillUnmount
				// head side effect therefore need to be cleared manually
				Head.rewind();
			}

			// Extract query data from the Apollo store
			const apolloState = apollo.cache.extract();

			return {
				...appProps,
				apolloState,
			};
		}

		constructor(props) {
			super(props);
			this.apolloClient = initApollo(props.apolloState, {
				getToken: () => {
					return parseCookies().token;
				},
			});
		}

		render() {
			return <App {...this.props} apolloClient={this.apolloClient} />;
		}
	};
};
