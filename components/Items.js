import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { Query, Subscription } from 'react-apollo';
import styled from 'styled-components';
import { ITEM_FRAGMENT } from '../graphql/fragments';
import Item from './Item';

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

const StyledUl = styled.ul`
	display: grid;
	max-width: 1920px;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-auto-flow: row;
	grid-gap: 20px;
	border: 1px solid red;
	list-style-type: none;
	margin-left: auto;
	margin-right: auto;
	padding: 0;
`;

function ItemsQuery() {
	return (
		<Query query={ITEMS_QUERY}>
			{({ data: { items }, loading, error, subscribeToMore }) => {
				if (error) return <p>Error: {error}</p>;
				if (loading) return <p>Loading...</p>;
				return (
					<Items items={items.concat(dummyData)} subscribeToMore={subscribeToMore} />
				);
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
	console.log('atems: ', items);
	return (
		<StyledUl>
			{items.map((item) => (
				<Item key={item.id} item={item} />
			))}
		</StyledUl>
	);
}

export { ITEMS_QUERY, ITEM_SUBSCRIPTION };
export default ItemsQuery;

const dummyData = [
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},

	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},

	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Cooli jengi koossa taas – arvostelussa Devil May Cry 5',
		url:
			'https://www.livegamers.fi/uutiset/cooli-jengi-koossa-taas-arvostelussa-devil-may-cry-5/',
		smallImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/dmc5kuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-13T09:23:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Useat Mortal Kombat 11:n taistelijat saaneet omat esittelynsä',
		url:
			'https://www.livegamers.fi/uutiset/useat-mortal-kombat-11n-taistelijat-saaneet-omat-esittelynsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/MK11jade-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/MK11jade-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-07T08:19:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Miljardi erilaista asetta tarjoava Borderlands 3 saapuu syyskuussa',
		url:
			'https://www.livegamers.fi/uutiset/miljardi-erilaista-asetta-tarjoava-borderlands-3-saapuu-syyskuussa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/borderlands3banneri-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-04-04T18:18:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Yhdistymisen jälkeen on aika Nousta – arvostelussa Trials Rising',
		url:
			'https://www.livegamers.fi/uutiset/yhdistymisen-jalkeen-on-aika-nousta-arvostelussa-trials-rising/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-trials-rising-1140-500px.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-31T18:25:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Huhtikuun PlayStation Plus-peleissä Robo-Soulsia ja Conania',
		url:
			'https://www.livegamers.fi/uutiset/huhtikuussa-robo-soulsia-ja-selviytymista-conanin-maailmassa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/psplushuhti-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Seuraavan Borderlandsin julkistus lähenee – Gearbox julkaisi videon aiheesta',
		url:
			'https://www.livegamers.fi/uutiset/seuraavan-borderlandsin-julkistus-lahenee-gearbox-julkaisi-videon-aiheesta/',
		smallImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/maskofmayhem-900x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-27T15:21:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title:
			'Valot pois ja veri virtaamaan – Vampire: The Masquerade – Bloodlines saa jatkoa',
		url:
			'https://www.livegamers.fi/uutiset/valot-pois-ja-veri-virtaamaan-vampire-the-masquerade-bloodlines-saa-jatkoa/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-220x125.jpg',
		largeImg:
			'https://www.livegamers.fi/app/uploads/VampireTheMasqueradeBloodlines2-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-23T07:39:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Perjantaina saapuvasta Sekirosta julkaistiin kattava videoesittely',
		url:
			'https://www.livegamers.fi/uutiset/perjantaina-saapuvasta-sekirosta-julkaistiin-kattava-videoesittely/',
		smallImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/sekirokuva-1140x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-20T06:13:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Tulikehä saapuu pian – Battlefield V saa battle royale-pelimuotonsa',
		url:
			'https://www.livegamers.fi/uutiset/tulikeha-saapuu-pian-battlefield-v-saa-battle-royale-pelimuotonsa/',
		smallImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/BFFirestorm-1080x500.jpg',
		author: { id: '5cb2f4ba857aba00075793a7', name: 'MavorsXX', __typename: 'Author' },
		publishDate: '2019-03-17T07:35:00.000Z',
		__typename: 'Item',
	},
	{
		id: Math.random()
			.toString(36)
			.substring(7),
		website: {
			id: '5cb2f4ba857aba00075793a6',
			name: 'Livegamers',
			url: 'https://www.livegamers.fi',
			__typename: 'Website',
		},
		title: 'Peliarvostelussa Crackdown 3',
		url: 'https://www.livegamers.fi/uutiset/peliarvostelussa-crackdown-3/',
		smallImg:
			'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px-220x125.jpg',
		largeImg: 'https://www.livegamers.fi/app/uploads/vko-11-crackdown-3-1140-500px.jpg',
		author: {
			id: '5cb2f4ba857aba00075793a8',
			name: 'TheRealPHombr',
			__typename: 'Author',
		},
		publishDate: '2019-03-15T16:02:00.000Z',
		__typename: 'Item',
	},
];
