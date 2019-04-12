import React from 'react';
import Meta from './Meta';
import Header from './Header';

function Page(props) {
	return (
		<>
			<Meta />
			<Header />
			{props.children}
		</>
	);
}

export default Page;
