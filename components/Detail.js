import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ITEM_FRAGMENT } from '../graphql/fragments';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import DetailHeaderArea from './DetailHeaderArea';

const DetailContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	background-color: black;
	max-width: 75rem;
	max-height: 20rem;
	margin: 0 auto;
	border: 1px solid red;
`;

const DetailTitle = styled.h2``;

/**Fetch using network */
const ITEM_DETAIL_QUERY = gql`
	query ITEM_DETAIL_QUERY($slug: String) {
		item(where: { slug: $slug }) {
			...ItemListInfo
		}
	}
	${ITEM_FRAGMENT}
`;

/**Fetch from apollo-cache: items.
https://www.apollographql.com/docs/react/advanced/caching#cacheRedirect */
const ITEM_DETAIL_QUERY_LOCAL = gql`
	query ITEM_DETAIL_QUERY($id: ID) {
		item(where: { id: $id }) {
			...ItemListInfo
		}
	}
	${ITEM_FRAGMENT}
`;

function Detail(props) {
	const { otsikko, id } = props.router.query;
	const itemQuery = id ? ITEM_DETAIL_QUERY_LOCAL : ITEM_DETAIL_QUERY;
	console.log('Detail props: ', props);
	return (
		<>
			<Query query={itemQuery} variables={{ slug: otsikko, id }}>
				{({ data, loading, error }) => {
					if (loading) return <h1>LOADING</h1>;
					if (error) return <ErrorMessage error={error} />;
					console.log('DETAIL DATA: ', data);

					return (
						<DetailContainer>
							<DetailHeaderArea item={data.item} />
						</DetailContainer>
					);
				}}
			</Query>
		</>
	);
}

Detail.propTypes = {
	router: PropTypes.shape({
		query: PropTypes.shape({
			otsikko: PropTypes.string.isRequired,
			id: PropTypes.string,
		}),
	}),
};
export default withRouter(Detail);
