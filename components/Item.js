import React from 'react';
import styled from 'styled-components';

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
	height: 9rem;
	position: relative;
	border: 1px solid blue;
`;
const StyledImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
function Item({ item: { title, largeImg, smallImg } }) {
	console.log('title: ');
	// return <StyledLi largeImg={largeImg}>{title}</StyledLi>;
	return (
		<StyledLi>
			<ImgContainer>
				<StyledImg src={largeImg} />
			</ImgContainer>
			<h2>{title}</h2>
			<p>{title}</p>
		</StyledLi>
	);
}

export default Item;
