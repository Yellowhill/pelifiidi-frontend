import gql from 'graphql-tag';

const ITEM_FRAGMENT = gql`
	fragment ItemListInfo on Item {
		id
		website {
			id
			name
			url
		}
		title
		url
		slug
		smallImg
		largeImg
		author {
			id
			name
		}
		publishDate
	}
`;

export { ITEM_FRAGMENT };
