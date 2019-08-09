import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
	border: 1px solid pink;
`;

function DetailContent({ textContent }) {
	return (
		<ContentContainer>
			{textContent.map((paragraph, i) => {
				return <p key={i}>{paragraph.text}</p>;
			})}
		</ContentContainer>
	);
}

export default DetailContent;
