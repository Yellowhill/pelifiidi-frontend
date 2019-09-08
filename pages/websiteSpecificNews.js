import React from 'react';
import styled, { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { ITEM_FRAGMENT } from '../graphql/fragments';
import ItemsQuery from '../components/ItemsQuery';

const ALL_WEBSITE_ITEMS_QUERY = gql`
	query ALL_WEBSITE_ITEMS_QUERY($websiteName: String!, $first: Int!, $skip: Int!) {
		itemsConnection(
			where: { website: { name: $websiteName } }
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

function WebsiteSpecificNewsPage(props) {
	const router = useRouter();
	const websiteName = router.asPath.split('/')[1];
	return (
		<ItemsQuery
			query={ALL_WEBSITE_ITEMS_QUERY}
			variables={{ websiteName, first: 5, skip: 0 }}
		/>
	);
}

WebsiteSpecificNewsPage.displayName = 'WebsiteSpecificNewsPage';

export default withTheme(WebsiteSpecificNewsPage);
