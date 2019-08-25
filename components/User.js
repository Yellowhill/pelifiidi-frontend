import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
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

function User(props) {
	const payload = useQuery(CURRENT_USER_QUERY);
	return <>{props.children(payload)}</>;
}

User.propTypes = {
	children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY, CURRENT_USER_QUERY_LOCAL };
