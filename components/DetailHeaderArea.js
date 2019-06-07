import React from 'react'
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import {format} from 'date-fns';

import ProgressiveStyledImage from './ProgressiveStyledImage';
const HeaderAreaContainer = styled.div`
	display: flex;
	flex-direction: row;
    flex-wrap: wrap;
	justify-content: center;
    background-color: gray;
    padding: 0;
`;




const DetailTitle = styled.h2`
    width: 100%;
    text-align: center;
`;

const DetailInfo = styled.div`
    background-color: black;
    opacity: 0.5;
    width: 100%;
    text-align: center;

`;

function DetailHeaderArea({item: {title, author, publishDate, largeImage, smallImage, website}}) {

    return (
        <HeaderAreaContainer>
            <ProgressiveStyledImage largeImage={largeImage} smallImage={smallImage} /> 
            <DetailTitle>{title}</DetailTitle>
            <DetailInfo>
                <h3 style={{color: 'white'}}> {`${format(publishDate, 'DD.MM.YYYY')}  ${author.name} (${website.name})`}</h3>
           </DetailInfo>
        </HeaderAreaContainer>
    )
}

const {string, shape} = PropTypes;
DetailHeaderArea.propTypes = {
    item: shape({
    title: string.isRequired,
    author: shape({
        name: string
    }).isRequired,
    publishDate: string.isRequired,
    largeImg: string.isRequired,
    website: shape({
        name: string.isRequired,
        url: string.isRequired
    })
    })
    
}
export default withTheme(DetailHeaderArea);