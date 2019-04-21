import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';

//import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
	mutation RESET_MUTATION(
		$resetToken: String!
		$password: String!
		$confirmPassword: String!
	) {
		resetPassword(
			resetToken: $resetToken
			password: $password
			confirmPassword: $confirmPassword
		) {
			id
			email
			name
		}
	}
`;

function Reset({ resetToken }) {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	async function handleSubmit(e, resetPassword) {
		e.preventDefault();
		await resetPassword();
		setPassword('');
		setConfirmPassword('');
	}

	return (
		<Mutation
			mutation={RESET_MUTATION}
			variables={{
				resetToken: resetToken,
				password: password,
				confirmPassword: confirmPassword,
			}}
			// refetchQueries={[{ query: CURRENT_USER_QUERY }]}
		>
			{(resetPassword, { loading, error }) => {
				return (
					<form method="post" onSubmit={(e) => handleSubmit(e, resetPassword)}>
						<fieldset disabled={loading} aria-busy={loading}>
							<legend>Uusi salasana</legend>
							<Error error={error} />
							<label htmlFor="password">
								Salasana
								<input
									type="password"
									name="password"
									placeholder="Salasana"
									value={password}
									onChange={({ target }) => setPassword(target.value)}
								/>
							</label>

							<label htmlFor="confirmPassword">
								Salasana uudelleen
								<input
									type="password"
									name="confirmPassword"
									placeholder="Salasana uudelleen"
									value={confirmPassword}
									onChange={({ target }) => setConfirmPassword(target.value)}
								/>
							</label>

							<button type="submit">Tallenna uusi salasana</button>
						</fieldset>
					</form>
				);
			}}
		</Mutation>
	);
}
Reset.propTypes = {
	resetToken: PropTypes.string.isRequired,
};
Reset.displayName = 'Reset';
export default Reset;
