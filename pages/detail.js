import React from 'react';
import styled, { withTheme } from 'styled-components';
import Detail from '../components/Detail';
function DetailPage(props) {
	console.log('deatailpage props: ', props)
	return <Detail />;
}

DetailPage.displayName = 'DetailPage';

export default withTheme(DetailPage);
