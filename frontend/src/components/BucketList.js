import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL } from '../utils/urls';
import MarathonCard from './MarathonCard';
import Button from './Button';
import Loader from './Loader';

import ui from '../reducers/ui';

const CardContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const BucketList = () => {
	const [marathons, setMarathons] = useState([]);

	const completedMarathons = useSelector((store) => store.user.marathons);
	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);

	const isLoading = useSelector((store) => store.ui.isLoading);
	const dispatch = useDispatch();

	const getMarathons = () => {
		dispatch(ui.actions.setLoading(true));

		fetch(API_URL('marathons'))
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
			{isLoading ? (
				<Loader />
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
