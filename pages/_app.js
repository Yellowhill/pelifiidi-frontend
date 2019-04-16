import App, { Container } from 'next/app';
import Router from 'next/router';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import NProgress from 'nprogress';
import withApolloClient from '../lib/with-apollo-client';

Router.events.on('routeChangeStart', (url) => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		// this exposes the query to the user
		pageProps.query = ctx.query;
		return { pageProps };
	}

	render() {
		const { Component, apolloClient, pageProps } = this.props;
		return (
			<Container>
				<ApolloProvider client={apolloClient}>
					<Page>
						<Component {...pageProps} />
					</Page>
				</ApolloProvider>
			</Container>
		);
	}
}
export default withApolloClient(MyApp);
//export default withData(MyApp);
