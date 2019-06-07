import Document, { Head, Main, NextScript } from 'next/document';
import styled, { ThemeProvider,ServerStyleSheet } from 'styled-components';

const theme = {
	bg: 'white',
	baseFont: '16px ',
	basePadding: '7px'
};

const StyledHtml = styled.html`
	font-size: ${({ theme }) => theme.baseFont};
`;

const StyledBody = styled.body`
	margin: 0px;
	background-color: ${(props) => props.theme.bg};
`;

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
			<ThemeProvider theme={theme}>
				<StyledHtml>
					<Head>{this.props.styleTags}</Head>
					<StyledBody>
						<Main />
						<NextScript />
					</StyledBody>
				</StyledHtml>
			</ThemeProvider>
		);
	}
}
