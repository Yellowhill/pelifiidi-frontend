import React, { useState, useEffect } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';
import NProgress from 'nprogress';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			name
			email
			password
			bookmarks {
				id
			}
		}
	}
`;

function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e, signin) {
		NProgress.start();
		e.preventDefault();
		await signin();
		setEmail('');
		setPassword('');
		Router.push('/');
	}

	return (
		<ApolloConsumer>
			{(client) => (
				<Mutation
					mutation={SIGNIN_MUTATION}
					variables={{ email, password }}
					onCompleted={({ signin }) => {
						client.writeData({ data: { me: signin } });
					}}
				>
					{(signin, { loading, error }) => {
						if (error) {
							NProgress.done();
						}
						return (
							<form method="post" onSubmit={(e) => handleSubmit(e, signin)}>
								<fieldset disabled={loading}>
									<legend>Kirjaudu</legend>
									<ErrorMessage error={error} />
									<div>
										<label htmlFor="email" />
										<input
											type="email"
											name="email"
											placeholder="sähköpostiosoite"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div>
										<label htmlFor="password" />
										<input
											type="password"
											name="password"
											placeholder="Salasana"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<button type="submit">Kirjaudu!</button>
								</fieldset>
							</form>
						);
					}}
				</Mutation>
			)}
		</ApolloConsumer>
	);
}
Signin.displayName = 'Signin';
export default Signin;
