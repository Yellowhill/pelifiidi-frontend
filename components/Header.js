import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Router from 'next/router';
import Link from 'next/link';
import useUser from '../hooks/useUser';
const SIGN_OUT_MUTATION = gql`
	mutation SIGN_OUT_MUTATION {
		signout {
			message
		}
	}
`;

async function handleSignout(signout, client) {
	await signout();
	client.resetStore();
}

function Header() {
	const [signout, { loading, error }] = useMutation(SIGN_OUT_MUTATION);
	const client = useApolloClient();
	const { data } = useUser();
	const me = data ? data.me : {};
	console.log('HEADER useUser data: ', data);
	return (
		<div>
			<Link href="/">
				<a>Pelifiidi</a>
			</Link>
			{me && (
				<>
					<button onClick={() => handleSignout(signout, client)}>kirjaudu ulos</button>
				</>
			)}
			{!me && (
				<Link href="/signup">
					<a>Kirjaudu</a>
				</Link>
			)}
		</div>
	);
}

export default Header;
