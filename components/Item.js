import React from 'react';
import styled from 'styled-components';
import ProgressiveImage from 'react-progressive-image';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ImagePlaceholder from './ImagePlaceholder';

const ADD_BOOKMARK_MUTATION = gql`
	mutation ADD_BOOKMARK_MUTATION($id: String!) {
		addBookmark(id: $id) {
			id
			name
			email
			bookmarks {
				id
			}
		}
	}
`;

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

async function handleAddBookmark(e, addBookmark, id, client) {
	e.preventDefault();
	const result = await addBookmark();
	console.log('handleAddBookmark: ', result);
	//client.writeData()
	return result;
}

function Item({ item: { title, largeImg, smallImg, id }, user }) {
	const isBookmarked = user && user.bookmarks.find((bookmark) => bookmark.id === id);

	return (
		<Link href={{ pathname: 'detail' }}>
			<a style={{ textDecoration: 'none', color: '#333' }}>
				<StyledLi>
					<ImgContainer>
						<ProgressiveImage src={largeImg} placeholder="">
							{(src, loading) => {
								return loading ? (
									<ImagePlaceholder src={smallImg} />
								) : (
									<StyledImg src={src} />
								);
							}}
						</ProgressiveImage>
					</ImgContainer>
					<h2>{title}</h2>
					<p>{title}</p>
					{user && (
						<>
							{isBookmarked ? (
								<p>Bookmarked</p>
							) : (
								<Mutation mutation={ADD_BOOKMARK_MUTATION} variables={{ id }}>
									{(addBookmark, { loading, error, client }) => {
										return (
											<button
												onClick={(e) => handleAddBookmark(e, addBookmark, id, client)}
											>
												bookmark
											</button>
										);
									}}
								</Mutation>
							)}
						</>
					)}
				</StyledLi>
			</a>
		</Link>
	);
}

export default Item;
