import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/urls';
import MarathonCard from './MarathonCard';

const MarathonList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [marathons, setMarathons] = useState([]);

	const getMarathons = () => {
		setIsLoading(true);
		fetch(BASE_URL + 'marathons')
			.then((res) => res.json())
			.then((data) => {
				setMarathons(data);
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		getMarathons();
	}, []);

	return (
		<>
			{/* Fix the conditional rendering here? */}
			<h2>MarathonList</h2>
			{isLoading && <h3>Loading...</h3>}
			{marathons.map((marathon) => (
				<MarathonCard key={marathon._id} name={marathon.name} />
			))}
		</>
	);
};

export default MarathonList;
