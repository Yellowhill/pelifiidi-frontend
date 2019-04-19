import React from 'react';
import Signup from '../components/Signup.js';
import styled from 'styled-components';
const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;

function SignupPage() {
	return (
		<Columns>
			<Signup />
			{/* <Signin />
    <RequestReset /> */}
		</Columns>
	);
}

export default SignupPage;
