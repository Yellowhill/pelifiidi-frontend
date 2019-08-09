import React from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import Items from './Items';
import updateLocalStorage from '../lib/updateLocalStorage';

function ItemsQuery({ query, variables }) {
	return (
		<ApolloConsumer>
			{(client) => (
				<Query query={query} variables={variables}>
					{({ data, loading, error, subscribeToMore, fetchMore }) => {
						if (error) {
							console.log('ITEMS_QUERY error: ', error);
							return <p>Error {error}</p>;
						}
						if (loading) return <p>loading...</p>;
						console.log('ITEMS_QUERY DATA:', data);
						const items = data.itemsConnection.edges;
						const hasMoreItems = data.itemsConnection.pageInfo.hasNextPage;

						return (
							<Items
								items={items}
								subscribeToMore={subscribeToMore}
								fetchMore={fetchMore}
								hasMoreItems={hasMoreItems}
								apolloClient={client}
							/>
						);
					}}
				</Query>
			)}
		</ApolloConsumer>
	);
}

ItemsQuery.displayName = 'ItemsQuery';
export default ItemsQuery;
