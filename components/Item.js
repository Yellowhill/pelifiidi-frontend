import React from 'react';
import styled from 'styled-components';
import ProgressiveImage from 'react-progressive-image';
import Link from 'next/link';

import Bookmark from './Bookmark';
import ImagePlaceholder from './ImagePlaceholder';

const StyledLi = styled.li`
	list-style: 'none';
	border: 1px solid red;
    position:relative;
	/* background-image: ${(props) => `url(${props.largeImg})`};
	background-repeat: no-repeat;
	background-size: cover;
	background-color: #333; */
	/* height: 300px; */
    overflow: hidden;

`;

const ImgContainer = styled.div`
	width: 100%;
	height: 19rem;
	position: relative;
	border: 1px solid blue;
`;
const StyledImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

function Item({ item: { title, largeImg, smallImg, id, website, slug }, user }) {
	const isBookmarked = user && user.bookmarks.find((bookmark) => bookmark.id === id);
	return (
		<Link
			href={{ pathname: 'detail', query: { otsikko: slug, id } }}
			as={`uutinen?otsikko=${slug}`}
		>
			<a style={{ textDecoration: 'none', color: '#333' }}>
				<StyledLi>
					<ImgContainer>
						<ProgressiveImage src={largeImg} placeholder="">
							{(src, loading) => {
								return loading ? (
									<ImagePlaceholder src={smallImg ? smallImg : ''} />
								) : (
									<StyledImg src={src ? src : ''} />
								);
							}}
						</ProgressiveImage>
					</ImgContainer>
					<h2>{title}</h2>
					<p>{title}</p>
					{user && <Bookmark itemId={id} isBookmarked={isBookmarked} />}
				</StyledLi>
			</a>
		</Link>
	);
}

export default Item;
