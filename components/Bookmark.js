import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const TOGGLE_BOOKMARK_MUTATION = (add) => {
	return add
		? gql`
				mutation ADD_BOOKMARK_MUTATION($id: String!) {
					addBookmark(id: $id) {
						id
						name
						email
						bookmarks {
							id
						}
					}
				}
		  `
		: gql`
				mutation REMOVE_BOOKMARK_MUTATION($id: String!) {
					removeBookmark(id: $id) {
						id
						name
						email
						bookmarks {
							id
						}
					}
				}
		  `;
};

function Bookmark({ isBookmarked, itemId }) {
	const [toggleBookmark, { loading, error, client }] = useMutation(
		TOGGLE_BOOKMARK_MUTATION(isBookmarked ? false : true)
	);
	console.log('IS BOOKMARKED: ', isBookmarked);
	return (
		<>
			{isBookmarked ? (
				//<Mutation mutation={TOGGLE_BOOKMARK_MUTATION(false)} variables={{ id: itemId }}>

				<button
					onClick={(e) => {
						e.preventDefault();
						toggleBookmark({ variables: { id: itemId } });
					}}
				>
					remove bookmark
				</button>
			) : (
				<button
					onClick={(e) => {
						e.preventDefault();
						toggleBookmark({ variables: { id: itemId } });
					}}
				>
					add bookmark
				</button>
			)}
		</>
	);
}

Bookmark.displayName = 'Bookmark';
export default Bookmark;
