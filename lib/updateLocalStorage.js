import { isAfter, isBefore } from 'date-fns';
import gql from 'graphql-tag';
import { ITEM_FRAGMENT } from '../graphql/fragments';
let timeout = null;

function updateLocalStorage(apolloClient) {
	console.log('updateLocalStorage-called');
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

	const apolloCacheItems = getItemsFromData(data);
	const localStorageItems = getItemsFromStorage();

	if (localStorageItems.length === 0) {
		setItemsInStorage(apolloCacheItems);
		return;
	}

	const isAddingNewItems = isAfter(
		apolloCacheItems[0].publishDate,
		localStorageItems[0].publishDate
	);
	console.log('ISADDIGNEWITEMS: ', isAddingNewItems);
	if (isAddingNewItems) {
		setNewItemsInStorage(apolloCacheItems, localStorageItems);
	} else {
		setNewOldItemsInStorage(apolloCacheItems, localStorageItems);
	}
}

function setNewItemsInStorage(apolloCacheItems, localStorageItems) {
	const newApolloCacheItemsNotInLocalStorage = filterNewItems(
		apolloCacheItems,
		localStorageItems
	);
	const newLocalStorageItems = newApolloCacheItemsNotInLocalStorage.concat(
		localStorageItems
	);
	setItemsInStorage(newLocalStorageItems);
}

function setNewOldItemsInStorage(apolloCacheItems, localStorageItems) {
	const oldApolloCacheItemsNotInLocalStorage = filterNewOldItems(
		apolloCacheItems,
		localStorageItems
	);
	if (oldApolloCacheItemsNotInLocalStorage.length > 0) {
		const newLocalStorageItems = localStorageItems.concat(
			oldApolloCacheItemsNotInLocalStorage
		);
		setItemsInStorage(newLocalStorageItems);
	}
}

function getItemsFromData(data) {
	const { edges = [] } = data.itemsConnection;
	return edges.map((edge) => {
		const { largeImg, smallImg, ...restProps } = edge.node;
		return restProps;
	});
}

function filterNewItems(apolloCacheItems, localStorageItems) {
	return apolloCacheItems.filter((item) => {
		console.log(isAfter(item.publishDate, localStorageItems[0].publishDate));
		return isAfter(item.publishDate, localStorageItems[0].publishDate);
	});
}

function filterNewOldItems(apolloCacheItems, localStorageItems) {
	const idxOfLastLocalStorageItem = localStorageItems.length - 1;
	return apolloCacheItems.filter((item) => {
		console.log(
			'Old New: ',
			isBefore(item.publishDate, localStorageItems[idxOfLastLocalStorageItem].publishDate)
		);
		return isBefore(
			item.publishDate,
			localStorageItems[idxOfLastLocalStorageItem].publishDate
		);
	});
}

function getItemsFromStorage() {
	const itemsString = localStorage.getItem('pelifiidi-offline-data') || '[]';
	const items = JSON.parse(itemsString);
	return items;
}

function setItemsInStorage(newLocalStorageItems) {
	const first50Items = newLocalStorageItems.slice(0, 51);
	const stringifiedItems = JSON.stringify(first50Items);
	console.log('SETITEMS IN STORAGE first50Items: ', first50Items);
	localStorage.setItem('pelifiidi-offline-data', stringifiedItems);
}

export default updateLocalStorage;
