import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
	border: 1px solid pink;
`;

function DetailContent({ textContent }) {
	return (
		<ContentContainer>
			{textContent.map((paragraph) => {
				return <p>{paragraph.text}</p>;
			})}
		</ContentContainer>
	);
}

export default DetailContent;
