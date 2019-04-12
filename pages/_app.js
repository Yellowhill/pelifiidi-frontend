import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
//import withData from '../lib/withData';
import withApolloClient from '../lib/with-apollo-client';

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
		console.log('PageProps for every page: ', pageProps);
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
