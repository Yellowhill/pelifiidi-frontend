import React from 'react';
import styled from 'styled-components';
import ProgressiveImage from 'react-progressive-image';
import ImagePlaceholder from './ImagePlaceholder';
import PropTypes from 'prop-types';
const StyledImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;


function ProgressiveStyledImage({largeImg, smallImg}) {
    return(
        						<ProgressiveImage src={largeImg} placeholder="">
							{(src, loading) => {
								return loading ? (
									<ImagePlaceholder src={smallImg ? smallImg : ''} />
								) : (
									<StyledImg src={src ? src : ''} />
								);
							}}
						</ProgressiveImage>
    )
}

ProgressiveStyledImage.propTypes = {
    largeImg: PropTypes.string,
    smallImg: PropTypes.string
}
export default ProgressiveStyledImage