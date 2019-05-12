import { ITEM_FRAGMENT } from '../graphql/fragments';
import gql from 'graphql-tag';
let timeout = null;

function updateLocalStorage(apolloClient) {
	clearTimeout(timeout);
	function _updateLocalStorage() {
		const data = apolloClient.readQuery({
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
		const items = getItemsFromData(data);
		//get items from
		setItemsInStorage(items);
		console.log('updateLocalStorage.js items: ', items);
	}
	//Get items from apollo cache
	timeout = setTimeout(_updateLocalStorage, 500);
}

function getItemsFromData(data) {
	const { edges = [] } = data.itemsConnection;
	return edges.map((edge) => edge.node);
}

function setItemsInStorage(items) {
	const stringifiedItems = JSON.stringify(items);
	console.log('stringifiedItems: ', stringifiedItems);
}

export default updateLocalStorage;
