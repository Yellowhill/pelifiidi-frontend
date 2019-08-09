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

const StyledTitle = styled.h2`
	padding-left: ${({ theme }) => theme.basePadding};
`;

const StyledDescription = styled.p`
	padding-left: ${({ theme }) => theme.basePadding};
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

function Item({
	item: { title, largeImg, smallImg, id, website, description, slug },
	user,
}) {
	const isBookmarked = user && user.bookmarks.find((bookmark) => bookmark.id === id);
	return (
		<Link
			href={{ pathname: '/detail', query: { id } }}
			as={`uutinen/${website.name}/${slug}`}
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
					<StyledTitle>{title}</StyledTitle>
					<StyledDescription>{description}</StyledDescription>
					{user && <Bookmark itemId={id} isBookmarked={isBookmarked} />}
				</StyledLi>
			</a>
		</Link>
	);
}

export default Item;

/**playground
 * 
 *
 * 
mutation {
  createItem (
    data:{
  		title: "testi title",
  		url: "testiurl1.com",
  		publishDate: "2019-04-04T18:18:00.000Z",
  		author: {
        connect: {
    			id: "5ca89c89a7b11b00076b4ec1"
  		}}
  		website: {
    		connect: {
      		id: "5ca89c89a7b11b00076b4ec0"
    		}
		  }
		slug: "testi-slug"
  		textContent: {
    		create: [{
    			text: "diu diu",
    			inlineLinks: {
      		create: []
    			}
  			}]
  	}
    }) {id title}
}
}
 * 
 */
