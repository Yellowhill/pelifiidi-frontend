import React from 'react';
import { Mutation } from 'react-apollo';
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

async function handleToggleBookmark(e, toggleBookmark) {
	e.preventDefault();
	const result = await toggleBookmark();
	console.log('handleAddBookmark: ', result);
	//client.writeData()
	return result;
}

function Bookmark({ isBookmarked, itemId }) {
	return (
		<>
			{isBookmarked ? (
				<Mutation mutation={TOGGLE_BOOKMARK_MUTATION(false)} variables={{ id: itemId }}>
					{(toggleBookmark, { loading, error, client }) => {
						return (
							<button onClick={(e) => handleToggleBookmark(e, toggleBookmark)}>
								remove bookmark
							</button>
						);
					}}
				</Mutation>
			) : (
				<Mutation mutation={TOGGLE_BOOKMARK_MUTATION(true)} variables={{ id: itemId }}>
					{(toggleBookmark, { loading, error, client }) => {
						return (
							<button onClick={(e) => handleToggleBookmark(e, toggleBookmark)}>
								add bookmark
							</button>
						);
					}}
				</Mutation>
			)}
		</>
	);
}

Bookmark.displayName = 'Bookmark';
export default Bookmark;
