import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PlaceholderContainer = styled.div`
	height: 100%;
	width: 100%;
	background-color: black;
`;

const PlaceHolderImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

function ImagePlaceholder({ src }) {
	return (
		<PlaceholderContainer>
			<PlaceHolderImg src={src} />
		</PlaceholderContainer>
	);
}

ImagePlaceholder.displayName = 'ImagePlaceholder';
ImagePlaceholder.propTypes = {
	src: PropTypes.string.isRequired,
};
export default ImagePlaceholder;
