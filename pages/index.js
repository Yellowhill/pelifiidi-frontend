import React, { useEffect } from 'react';
import ItemsQuery from '../components/ItemsQuery';
const Home = (props) => {
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/sw.js')
				.catch((err) => console.error('Service worker reqistration failed: ', err));
		} else {
			console.log('Service worker not supported');
		}
	}, []);
	return <ItemsQuery />;
};
export default Home;
