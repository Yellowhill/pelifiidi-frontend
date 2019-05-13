import { isAfter } from 'date-fns';
import gql from 'graphql-tag';
import { ITEM_FRAGMENT } from '../graphql/fragments';
let timeout = null;

function updateLocalStorage(apolloClient) {
	if (!process.browser) return;
	clearTimeout(timeout);
	timeout = setTimeout(() => getItemsFromCacheAndSetIntoStorage(apolloClient), 500);
}

function getItemsFromCacheAndSetIntoStorage(apolloClient) {
	const data = apolloClient.readQuery({
		query: gql`
			query ALL_ITEMS_LOCAL {
				itemsConnection(orderBy: publishDate_DESC, first: 0, skip: 0)
					@connection(key: "item") {
					edges {
						node {
							...ItemListInfo
						}
					}
				}
			}
			${ITEM_FRAGMENT}
		`,
	});

	const items = getItemsFromData(data);
	const newItems = filterNewItems(items);
	if (newItems.length > 0) {
		setItemsInStorage(newItems);
	}
}

function getItemsFromData(data) {
	const { edges = [] } = data.itemsConnection;
	return edges.map((edge) => {
		const { largeImg, smallImg, ...restProps } = edge.node;
		return restProps;
	});
}

function filterNewItems(items) {
	const localStorageItems = getItemsFromStorage();
	const newItems =
		localStorageItems.length > 0
			? items.filter((item) =>
					isAfter(item.publishDate, localStorageItems[0].publishDate)
			  )
			: items;
	return newItems;
}

function getItemsFromStorage() {
	const itemsString = localStorage.getItem('pelifiidi-offline-data') || '[]';
	const items = JSON.parse(itemsString);
	return items;
}

function setItemsInStorage(newItems) {
	const localStorageItems = getItemsFromStorage();
	const allItems = newItems.concat(localStorageItems);
	const first50Items = allItems.slice(0, 51);
	const stringifiedItems = JSON.stringify(first50Items);
	localStorage.setItem('pelifiidi-offline-data', stringifiedItems);
}

export default updateLocalStorage;
