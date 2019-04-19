import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		Signin(email: $email, password: $password) {
			id
			email
		}
	}
`;

function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e, Signin) {
		e.preventDefault();
		await Signin();
		setEmail('');
		setPassword('');
	}

	return (
		<Mutation mutation={SIGNIN_MUTATION} variables={{ email, password }}>
			{(Signin, { loading, error }) => {
				if (error) return <ErrorMessage error={error} />;
				return (
					<form method="post" onSubmit={(e) => handleSubmit(e, Signin)}>
						<fieldset disabled={loading}>
							<legend>Kirjaudu</legend>
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
	);
}
Signin.displayName = 'Signin';
export default Signin;
