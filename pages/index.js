import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { ITEM_FRAGMENT } from '../graphql/fragments';
import ItemsQuery from '../components/ItemsQuery';

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

const Index = (props) => {
	useEffect(() => {
		// if ('serviceWorker' in navigator) {
		// 	window.addEventListener('load', function() {
		// 		navigator.serviceWorker
		// 			.register('/sw.js')
		// 			.catch((err) => console.error('Service worker reqistration failed: ', err));
		// 	});
		// } else {
		// 	console.log('Service worker not supported');
		// }
	}, []);
	return <ItemsQuery query={ITEMS_QUERY} variables={{ first: 5, skip: 0 }} />;
};

export { ITEMS_QUERY };
export default Index;
