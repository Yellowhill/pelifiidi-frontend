import React from 'react';
import gql from 'graphql-tag';
import { Query, ApolloConsumer } from 'react-apollo';
import Items from './Items';
import { ITEM_FRAGMENT } from '../graphql/fragments';
import updateLocalStorage from '../lib/updateLocalStorage';
const ITEMS_QUERY = gql`
	query ITEMS_QUERY($first: Int!, $skip: Int!) {
		itemsConnection(orderBy: publishDate_DESC, first: $first, skip: $skip)
			@connection(key: "item") {
			edges {
				node {
					...ItemListInfo
				}
			}
			pageInfo {
				hasNextPage
				# hasPreviousPage
				# startCursor
				# endCursor
			}
		}
	}
	${ITEM_FRAGMENT}
`;

function ItemsQuery() {
	return (
		<ApolloConsumer>
			{(client) => (
				<Query query={ITEMS_QUERY} variables={{ first: 5, skip: 0 }}>
					{({ data, loading, error, subscribeToMore, fetchMore }) => {
						if (error) return <p>Error: {error}</p>;
						if (loading) return <p>loading...</p>;
						// console.log('itemsQuery.js - data: ', data);
						// console.log('itemsQuery. PROCESS: ', process);

						updateLocalStorage(client);
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

export { ITEMS_QUERY };
ItemsQuery.displayName = 'ItemsQuery';
export default ItemsQuery;
