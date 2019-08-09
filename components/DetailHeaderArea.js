import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { format } from 'date-fns';
import Link from 'next/link';
import ProgressiveStyledImage from './ProgressiveStyledImage';
import DetailContent from './DetailContent';

const ImageContainer = styled.div`
	height: 100%;
	border: 3px solid blue;
	max-height: 20rem;
`;

const DetailTitle = styled.h1`
	font-size: 2rem;
	width: 100%;
	text-align: center;
	border: 1px solid green;
	margin: 0;
`;

const DetailInfoContainer = styled.div`
	width: 100%;
	text-align: center;
	color: black;
`;

const StyledPublishDate = styled.p`
	margin: 0;
	margin-right: 7px;
	display: inline-block;
`;

const LinkToSource = styled.a`
	text-decoration: none;
	color: black;
	display: block;
	font-size: 14px;
	margin-top: 4px;
	:hover {
		text-decoration: underline;
	}
`;

function DetailHeaderArea({
	item: { title, author, publishDate, largeImg, smallImg, website, textContent, url },
}) {
	return (
		<>
			<ImageContainer>
				<ProgressiveStyledImage largeImg={largeImg} smallImg={smallImg} />
			</ImageContainer>

			<DetailTitle>{title}</DetailTitle>
			<DetailInfoContainer>
				<StyledPublishDate>{`${format(publishDate, 'DD.MM.YYYY')}`}</StyledPublishDate>
				<Link href="/websiteSpecificNews" as={`/${website.name}`}>
					<a>{website.name}</a>
				</Link>
				<span> - </span>
				{/* <Link>
					<a>{author.name}</a>
				</Link> */}

				<LinkToSource href={url} target="_blank">
					Lue lähteessä
				</LinkToSource>
			</DetailInfoContainer>
		</>
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
