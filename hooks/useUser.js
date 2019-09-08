import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ITEM_FRAGMENT } from '../graphql/fragments';
const CURRENT_USER_QUERY = gql`
	query CURRENT_USER_QUERY {
		me {
			id
			name
			email
			bookmarks {
				id
			}
		}
	}
`;

const CURRENT_USER_QUERY_LOCAL = gql`
	query CURRENT_USER_QUERY_LOCAL {
		me @client {
			id
			name
			email
			bookmarks {
				...ItemListInfo
			}
		}
	}
	${ITEM_FRAGMENT}
`;

function useUser() {
	return useQuery(CURRENT_USER_QUERY);
}

export default useUser;
export { CURRENT_USER_QUERY, CURRENT_USER_QUERY_LOCAL };
