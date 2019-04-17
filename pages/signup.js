import React from 'react';
import Signup from '../components/Signup.js';

const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;

function SignupPage() {
	<Columns>
		<Signup />
		{/* <Signin />
    <RequestReset /> */}
	</Columns>;
}

export default SignupPage;
