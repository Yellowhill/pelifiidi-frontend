import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import NProgress from 'nprogress';
import { Query } from 'react-apollo';

import { ITEM_FRAGMENT } from '../graphql/fragments';
import { ITEMS_QUERY } from './ItemsQuery';
import { CURRENT_USER_QUERY_LOCAL } from './User';
import Item from './Item';
import updateLocalStorage from '../lib/updateLocalStorage';

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

const StyledUl = styled.ul`
	display: grid;
	max-width: 1920px;
	grid-template-columns: 1fr;
	/* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
	grid-auto-flow: row;
	grid-gap: 20px;
	border: 1px solid red;
	list-style-type: none;
	margin-left: auto;
	margin-right: auto;
	padding: 0;
`;

function Items({ items, subscribeToMore, fetchMore, hasMoreItems = true, apolloClient }) {
	function fetchMoreItems() {
		console.log('FETCH MORE ITEMS CALLED');
		NProgress.start();
		const skip = items.length;
		fetchMore({
			document: ITEMS_QUERY,
			variables: { skip, first: 2 },
			updateQuery: (prev, { fetchMoreResult }) => {
				fetchMoreResult.itemsConnection.edges = prev.itemsConnection.edges.concat(
					fetchMoreResult.itemsConnection.edges
				);
				NProgress.done();
				return fetchMoreResult;
			},
		});
	}

	useEffect(() => {
		const unSubscribe = subscribeToMore({
			document: ITEM_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data.item) return prev;
				const newFeedItem = {
					node: subscriptionData.data.item.node,
					__typename: subscriptionData.data.item['__typename'],
				};
				const newFeedItems = [newFeedItem, ...prev.itemsConnection.edges];
				prev.itemsConnection.edges = newFeedItems;
				updateLocalStorage(apolloClient);
				return prev;
			},
		});
		return unSubscribe;
	}, []);

	return (
		<Query query={CURRENT_USER_QUERY_LOCAL}>
			{({ data }) => (
				<InfiniteScroll
					initialLoad={false}
					loadMore={fetchMoreItems}
					hasMore={hasMoreItems}
				>
					<StyledUl>
						{items.map(({ node }) => (
							<Item key={node.id} item={node} user={data.me} />
						))}
					</StyledUl>
				</InfiniteScroll>
			)}
		</Query>
	);
}

export { ITEM_SUBSCRIPTION };
export default Items;
