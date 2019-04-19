import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		requestReset(email: $email) {
			message
		}
	}
`;

function RequestReset() {
	const [email, setEmail] = useState('');
	async function handleSubmit(e, requestReset) {
		e.preventDefault();
		await requestReset();
		setEmail('');
	}

	return (
		<Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
			{(requestReset, { loading, error }) => {
				if (error) return <ErrorMessage error={error} />;
				return (
					<form method="post" onSubmit={(e) => handleSubmit(e, requestReset)}>
						<fieldset disabled={loading}>
							<legend>Salasanan resetointi</legend>
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
							<button type="submit">Resetoi!</button>
						</fieldset>
					</form>
				);
			}}
		</Mutation>
	);
}
RequestReset.displayName = 'RequestReset';
export default RequestReset;
