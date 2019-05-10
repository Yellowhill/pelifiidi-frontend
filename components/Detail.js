import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ITEM_FRAGMENT } from '../graphql/fragments';
import ErrorMessage from './ErrorMessage';

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
	return (
		<>
			<Query query={itemQuery} variables={{ slug: otsikko, id }}>
				{({ data, loading, error }) => {
					if (loading) return <h1>LOADING</h1>;
					if (error) return <ErrorMessage error={error} />;
					return <h1> {data.item.title}</h1>;
				}}
			</Query>
		</>
	);
}

export default withRouter(Detail);
