import Document, { Head, Main, NextScript } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const page = ctx.renderPage((App) => (props) =>
			sheet.collectStyles(<App {...props} />)
		);
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	render() {
		return (
			<html style={{ fontSize: 16, fontFamily: 'Roboto, sans-serif' }}>
				<Head>{this.props.styleTags}</Head>
				<body style={{ margin: 0 }}>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
