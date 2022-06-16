import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL } from '../utils/urls';
import MarathonCard from './MarathonCard';
import Button from './Button';
import Loader from './Loader';

import ui from '../reducers/ui';
import user from '../reducers/user';

const CardContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const BucketList = () => {
	const [bucketMarathons, setBucketMarathons] = useState([]);

	const userId = useSelector((store) => store.user.userId);
	// const accessToken = useSelector((store) => store.user.accessToken);

	const isLoading = useSelector((store) => store.ui.isLoading);
	const testing = useSelector((store) => store.user.marathons);

	const dispatch = useDispatch();

	const getBucketList = () => {
		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}/marathons`))
			.then((res) => res.json())
			.then((data) => {
				console.log(data.response.marathons);
				setBucketMarathons(data.response.marathons);
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	useEffect(() => {
		getBucketList();
	}, []);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<CardContainer>
					{bucketMarathons.map((marathon) => (
						<li key={marathon}>{marathon}</li>
					))}
				</CardContainer>
			)}
		</>
	);
};

export default BucketList;
