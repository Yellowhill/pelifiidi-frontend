import { ITEM_FRAGMENT } from '../graphql/fragments';
import gql from 'graphql-tag';

function updateLocalStorage(apolloClient) {
	//Get items from apollo cache
	const items = apolloClient.readQuery({
		query: gql`
			query ALL_ITEMS_LOCAL {
				itemsConnection(orderBy: publishDate_DESC, first: 0, skip: 0)
					@connection(key: "item") {
					edges {
						node {
							title
						}
					}
				}
			}
		`,
	});

	console.log('updateLocalStorage.js items: ', items);
	//console.log('updateLocalStorage.js items: ', apolloClient);
	return Promise.resolve(true);
}

export default updateLocalStorage;
