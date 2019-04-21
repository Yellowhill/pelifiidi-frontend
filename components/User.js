import { Query } from 'react-apollo';
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

function User(props) {
	return (
		<Query {...props} query={CURRENT_USER_QUERY}>
			{(payload) => props.children(payload)}
		</Query>
	);
}

User.propTypes = {
	children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
