import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { Query, Subscription } from 'react-apollo';

const ITEM_FRAGMENT = gql`
	fragment ItemListInfo on Item {
		id
		website {
			id
			name
			url
		}
		title
		url
		smallImg
		largeImg
		author {
			id
			name
		}
		publishDate
	}
`;

const ITEMS_QUERY = gql`
	query ITEMS_QUERY {
		items {
			...ItemListInfo
		}
	}
	${ITEM_FRAGMENT}
`;

const ITEM_SUBSCRIPTION = gql`
	subscription ITEM_SUBSCRIPTION {
		item(where: { mutation_in: [CREATED] }) {
			mutation
			node {
				...ItemListInfo
			}
		}
	}
	${ITEM_FRAGMENT}
`;

function ItemsQuery() {
	return (
		<Query query={ITEMS_QUERY}>
			{({ data: { items }, loading, error, subscribeToMore }) => {
				if (error) return <p>Error: {error}</p>;
				if (loading) return <p>Loading...</p>;
				console.log('iteems: ', items);
				return <Items items={items} subscribeToMore={subscribeToMore} />;
			}}
		</Query>
	);
}

function Items({ items, subscribeToMore }) {
	useEffect(() => {
		subscribeToMore({
			document: ITEM_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data.item) return prev;
				const newFeedItem = subscriptionData.data.item.node;
				return Object.assign({}, prev, {
					items: [newFeedItem, ...prev.items],
				});
			},
		});
	}, []);
	return (
		<ul>
			{items.map((item) => (
				<li key={item.id}>{item.title}</li>
			))}
		</ul>
	);
}

export { ITEMS_QUERY, ITEM_SUBSCRIPTION };
export default ItemsQuery;
