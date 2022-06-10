import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BASE_URL } from '../utils/urls';
import MarathonCard from './MarathonCard';

import ui from '../reducers/ui';

const CardContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const MarathonList = () => {
	const [marathons, setMarathons] = useState([]);

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

	return (
		<>
			{/* Remove inline styling later */}
			<h2 style={{ textAlign: 'center', color: 'blue' }}>MarathonList</h2>
			{isLoading ? (
				<h3>Loading</h3>
			) : (
				<CardContainer>
					{marathons.map((marathon) => (
						<MarathonCard
							key={marathon._id}
							name={marathon.name}
							city={marathon.city}
						/>
					))}
				</CardContainer>
			)}
		</>
	);
};

export default MarathonList;
