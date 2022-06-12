import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BASE_URL } from '../utils/urls';
import MarathonCard from './MarathonCard';
import Button from './Button';

import ui from '../reducers/ui';

const CardContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const MarathonList = () => {
	const [marathons, setMarathons] = useState([]);

	const completedMarathons = useSelector((store) => store.user.marathons);
	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);

	const isLoading = useSelector((store) => store.ui.isLoading);
	const dispatch = useDispatch();

	const getMarathons = () => {
		dispatch(ui.actions.setLoading(true));

		fetch(BASE_URL + 'marathons')
			.then((res) => res.json())
			.then((data) => setMarathons(data))
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	useEffect(() => {
		getMarathons();
	}, []);

	const saveMarathons = () => {
		// console.log(completedMarathons);

		const marathonToAdd = '62a5abbf15cb1748d3bc2b15';

		const url = `${BASE_URL}users/${userId}/addMarathon`;

		console.log(url);
		console.log(accessToken);

		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			body: JSON.stringify({ marathonToAdd }),
		};

		console.log(options);

		fetch(`${BASE_URL}users/${userId}/addMarathon`, options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<>
			<Button text="Save your marathons" handleClick={saveMarathons}></Button>
			{isLoading ? (
				<h3>Loading</h3>
			) : (
				<>
					<CardContainer>
						{marathons.map((marathon) => (
							<MarathonCard
								key={marathon._id}
								id={marathon._id}
								name={marathon.name}
								city={marathon.city}
								country={marathon.country}
								url={marathon.website}
								image={marathon.image}
							/>
						))}
					</CardContainer>
				</>
			)}
		</>
	);
};

export default MarathonList;
