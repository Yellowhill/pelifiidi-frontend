import React from 'react';
import Meta from './Meta';
import Header from './Header';
function Page() {
	return (
		<>
			<Meta />
			<Header />
			{this.props.children}
		</>
	);
}
