import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
		signup(email: $email, name: $name, password: $password) {
			id
			email
			name
		}
	}
`;

function Signup() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e, signup) {
		e.preventDefault();
		await signup();
		setEmail('');
		setName('');
		setPassword('');
	}

	return (
		<Mutation mutation={SIGNUP_MUTATION} variables={{ email, name, password }}>
			{(signup, { loading, error }) => {
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
			}}
		</Mutation>
	);
}
Signup.displayName = 'Signup';
export default Signup;
