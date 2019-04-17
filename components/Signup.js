import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

function Signup() {
	return (
		<Mutation>
			{() => {
				return (
					<form method="post" onSubmit={(e) => handleSubmit(e, signup)}>
						<fieldset>
							<legend>Rekisteröinti</legend>
							<p>
								<input type="email" />
							</p>
						</fieldset>
					</form>
				);
			}}
		</Mutation>
	);
}
