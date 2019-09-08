import React from 'react';
import { useQuery, ApolloConsumer } from '@apollo/react-hooks';
import Items from './Items';

function ItemsQuery({ query, variables }) {
	console.log('QUERY , VARIABLES: ', query, variables);
	const { data, error, loading, subscribeToMore, fetchMore } = useQuery(query, {
		variables,
		fetchPolicy: 'network-only',
	});
	if (error) {
		console.log('ITEMS_QUERY error: ', error);
		return <p>Error {error}</p>;
	}
	if (loading) return <p>loading...</p>;
	const items = data.itemsConnection.edges;
	const hasMoreItems = data.itemsConnection.pageInfo.hasNextPage;
	console.log('ITEMSQUERY ITEMS: 	', items);
	return (
		<ApolloConsumer>
			{(client) => (
				<Items
					items={items}
					subscribeToMore={subscribeToMore}
					fetchMore={fetchMore}
					hasMoreItems={hasMoreItems}
					apolloClient={client}
				/>
			)}
		</ApolloConsumer>
	);
}

ItemsQuery.displayName = 'ItemsQuery';
export default ItemsQuery;
