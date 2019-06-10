import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { format } from 'date-fns';

import ProgressiveStyledImage from './ProgressiveStyledImage';
import DetailContent from './DetailContent';

const HeaderAreaContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	background-color: gray;
	padding: 0;
`;

const DetailTitle = styled.h2`
	font-size: 3rem;
	width: 100%;
	text-align: center;
	border: 1px solid green;
`;

const DetailInfo = styled.div`
	background-color: black;
	opacity: 0.5;
	width: 100%;
	text-align: center;
`;

function DetailHeaderArea({
	item: { title, author, publishDate, largeImg, smallImg, website, textContent },
}) {
	return (
		<HeaderAreaContainer>
			<ProgressiveStyledImage largeImg={largeImg} smallImg={smallImg} />
			<DetailTitle>{title}</DetailTitle>
			<DetailInfo>
				<h3 style={{ color: 'white' }}>
					{`${format(publishDate, 'DD.MM.YYYY')}  ${author.name} (${website.name})`}
				</h3>
			</DetailInfo>
			<DetailContent textContent={textContent} />
		</HeaderAreaContainer>
	);
}

const { string, shape } = PropTypes;
DetailHeaderArea.propTypes = {
	item: shape({
		title: string.isRequired,
		author: shape({
			name: string,
		}).isRequired,
		publishDate: string.isRequired,
		largeImg: string.isRequired,
		website: shape({
			name: string.isRequired,
			url: string.isRequired,
		}),
	}),
};
export default withTheme(DetailHeaderArea);
