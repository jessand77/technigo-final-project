import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils/breakpoints';
import { API_URL } from '../utils/urls';
import Loader from './Loader';
import MarathonCard from './MarathonCard';
import runners from '../assets/runners.jpg';

import ui from '../reducers/ui';

const BucketTextBox = styled.div`
	color: var(--orange);
	text-align: center;
	margin-bottom: 1rem;
`;

const CardContainer = styled.section`
	width: 95%;
	margin: 20px 0;
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
	/* padding: 30px; */
	/* background-color: var(--white); */

	@media ${device.tablet} {
		grid-template-columns: 1fr 1fr;
	}

	@media ${device.laptop} {
		grid-template-columns: auto auto auto;
		justify-content: center;
	}
`;

const ImageBox = styled.div`
	width: 50%;
	img {
		width: 100%;
	}
`;

// displayMode is either "all" or "bucket"
const MarathonList = ({ displayMode }) => {
	const [marathonList, setMarathonList] = useState([]);

	const userId = useSelector((store) => store.user.userId);
	const isLoading = useSelector((store) => store.ui.isLoading);
	const numberOfMarathons = useSelector((store) => store.user.marathons.length);

	const dispatch = useDispatch();

	const getAllMarathons = () => {
		dispatch(ui.actions.setLoading(true));

		fetch(API_URL('marathons'))
			.then((res) => res.json())
			.then((data) => setMarathonList(data))
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	const getBucketMarathons = () => {
		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}/marathons`))
			.then((res) => res.json())
			.then((data) => setMarathonList(data.response.marathons))
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	if (displayMode === 'all') {
		useEffect(() => {
			getAllMarathons();
		}, []);
	} else if (displayMode === 'bucket') {
		useEffect(() => {
			getBucketMarathons();
		}, []);
	}

	let racetext = '';
	numberOfMarathons === 1 ? (racetext = 'race') : (racetext = 'races');

	// const updateList = () => {
	// 	getBucketMarathons();
	// };

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{displayMode === 'bucket' && numberOfMarathons === 0 && (
						<>
							<BucketTextBox>
								<h3>You don't have any {racetext} in your list yet</h3>
								<p>Go to the race list and add some</p>
							</BucketTextBox>
							<ImageBox>
								<img src={runners}></img>
							</ImageBox>
						</>
					)}
					{displayMode === 'bucket' && numberOfMarathons > 0 && (
						<>
							<BucketTextBox>
								<h3>
									You have {numberOfMarathons} {racetext} in your bucket list
								</h3>
							</BucketTextBox>
							<CardContainer>
								{marathonList.map((marathon) => (
									<MarathonCard
										key={marathon._id}
										id={marathon._id}
										name={marathon.name}
										city={marathon.city}
										image={marathon.image}
										updateList={getBucketMarathons}
									/>
								))}
							</CardContainer>
						</>
					)}
					{displayMode === 'all' && (
						<>
							<CardContainer>
								{marathonList.map((marathon) => (
									<MarathonCard
										key={marathon._id}
										id={marathon._id}
										name={marathon.name}
										city={marathon.city}
										image={marathon.image}
									/>
								))}
							</CardContainer>
						</>
					)}
				</>
			)}
		</>
	);
};

export default MarathonList;
