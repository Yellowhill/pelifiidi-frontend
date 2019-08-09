import React from 'react';
import gql from 'graphql-tag';
import { Mutation, ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import Link from 'next/link';
import User from './User';

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
	return (
		<ApolloConsumer>
			{(client) => (
				<User>
					{({ data }) => {
						const me = data ? data.me : {};
						console.log('header-user data - me: ', data);
						return (
							<Mutation mutation={SIGN_OUT_MUTATION}>
								{(signout, { loading, error }) => {
									return (
										<div>
											<Link href="/">
												<a>Pelifiidi</a>
											</Link>
											{me && (
												<>
													<button onClick={() => handleSignout(signout, client)}>
														kirjaudu ulos
													</button>
												</>
											)}
											{!me && (
												<Link href="/signup">
													<a>Kirjaudu</a>
												</Link>
											)}
										</div>
									);
								}}
							</Mutation>
						);
					}}
				</User>
			)}
		</ApolloConsumer>
	);
}

export default Header;
