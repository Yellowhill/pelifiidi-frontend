import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';

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
	const [resetPassword, { loading, error }] = useMutation(RESET_MUTATION, {
		variables: {
			resetToken: resetToken,
			password: password,
			confirmPassword: confirmPassword,
		},
	});

	async function handleSubmit(e, resetPassword) {
		e.preventDefault();
		await resetPassword();
		setPassword('');
		setConfirmPassword('');
	}

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
}
Reset.propTypes = {
	resetToken: PropTypes.string.isRequired,
};
Reset.displayName = 'Reset';
export default Reset;
