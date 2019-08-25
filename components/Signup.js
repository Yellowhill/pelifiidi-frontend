import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Router from 'next/router';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
		signup(email: $email, name: $name, password: $password) {
			id
			email
			name
			bookmarks {
				id
			}
		}
	}
`;

function Signup() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const client = useApolloClient();
	const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
		variables: { email, name, password },
		onCompleted: ({ signup }) => {
			client.writeData({ data: { me: signup } });
		},
	});

	async function handleSubmit(e, signup) {
		e.preventDefault();
		await signup();
		// setEmail('');
		// setName('');
		// setPassword('');
		Router.push('/');
	}
	if (error) return <ErrorMessage error={error} />;

	return (
		<form method="post" onSubmit={(e) => handleSubmit(e, signup)}>
			<fieldset disabled={loading}>
				<legend>Rekisteröinti</legend>
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
					<label htmlFor="name" />
					<input
						type="text"
						name="name"
						placeholder="Nimi"
						value={name}
						onChange={(e) => setName(e.target.value)}
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
				<button type="submit">Rekisteröidy!</button>
			</fieldset>
		</form>
	);
}
Signup.displayName = 'Signup';
export default Signup;
