import React from 'react';
import styled, { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { ITEM_FRAGMENT } from '../graphql/fragments';
import ItemsQuery from '../components/ItemsQuery';

const ALL_AUTHOR_ITEMS_QUERY = gql`
	query ALL_AUTHOR_ITEMS_QUERY($authorName: String!, $first: Int!, $skip: Int!) {
		itemsConnection(
			where: { author: { name: $authorName } }
			orderBy: publishDate_DESC
			first: $first
			skip: $skip
		) {
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

function AuthorSpecificNews(props) {
	const router = useRouter();
	const authorName = router.asPath.split('/')[2];
	console.log('authorSpecificNews.js RENDERS! :', authorName, ALL_AUTHOR_ITEMS_QUERY);
	return (
		<ItemsQuery
			query={ALL_AUTHOR_ITEMS_QUERY}
			variables={{ authorName, first: 5, skip: 0 }}
		/>
	);
}

AuthorSpecificNews.displayName = 'AuthorSpecificNews';

export default withTheme(AuthorSpecificNews);

/**
 * 
 * query {itemsConnection(
			where: { author: { name: "iletz" } }
			orderBy: publishDate_DESC
			first: 10
			skip: 0
		) {
			edges {
				node {
					title
				}
			}
			pageInfo {
				hasNextPage
				# hasPreviousPage
				# startCursor
				# endCursor
			}
		}}
 */
