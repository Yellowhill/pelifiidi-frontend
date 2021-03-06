import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import NProgress from 'nprogress';
import { useQuery } from '@apollo/react-hooks';

import { ITEM_FRAGMENT } from '../graphql/fragments';
import { ITEMS_QUERY } from '../pages/index';
import useUser from '../hooks/useUser';
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
	const { data, loading, error } = useUser();
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
		<InfiniteScroll initialLoad={false} loadMore={fetchMoreItems} hasMore={hasMoreItems}>
			<StyledUl>
				{items.map(({ node }) => (
					<Item key={node.id} item={node} user={data.me} />
				))}
			</StyledUl>
		</InfiniteScroll>
	);
}

export { ITEM_SUBSCRIPTION };
export default Items;
