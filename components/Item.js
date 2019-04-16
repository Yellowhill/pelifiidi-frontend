import React from 'react';
import styled from 'styled-components';
import ProgressiveImage from 'react-progressive-image';
import Router from 'next/router';
import ImagePlaceholder from './ImagePlaceholder';
import Link from 'next/link';
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

function Item({ item: { title, largeImg, smallImg } }) {
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
				</StyledLi>
			</a>
		</Link>
	);
}

export default Item;
