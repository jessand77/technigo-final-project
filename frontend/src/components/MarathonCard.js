import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import Button from './Button';
import { API_URL } from 'utils/urls';

import user from 'reducers/user';
import ui from '../reducers/ui';

const StyledCard = styled.div`
	position: relative;
	text-align: center;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	// Funkar inte?
	/* transition: 0.3s;
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	} */
	h2 {
		font-size: larger;
	}
	img {
		width: 100%;
	}
	p {
		font-size: xx-small;
	}
	a {
		text-decoration: none;
		color: white;
	}
`;

const ImageBox = styled.div`
	position: relative;
`;

const TextBox = styled.div`
	position: absolute; /* Position the background text */
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	/*bottom: 0; At the bottom. Use top:0 to append it to the top */
	background: rgb(0, 0, 0); /* Fallback color */
	background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
	color: #f1f1f1; /* Grey text */
	width: 100%; /* Full width */
	padding: 20px; /* Some padding */
`;

const MarathonCard = ({ id, name, city, url, image, mode }) => {
	const usersList = useSelector((store) => store.user.marathons);
	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);
	const isLoading = useSelector((store) => store.ui.isLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isMarathonInUsersList = usersList.some(
		(marathon) => marathon._id === id
	);

	const updateMarathonArray = () => {
		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}/marathons`))
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setMarathons(data.response.marathons));
						dispatch(user.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(user.actions.setError(data.response));
					});
				}
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	const addMarathon = () => {
		const marathonToAdd = id;

		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			body: JSON.stringify({ marathonToAdd }),
		};

		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}/addMarathon`), options)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.response);
				updateMarathonArray();
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	const deleteMarathon = () => {
		const marathonToDelete = id;

		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			body: JSON.stringify({ marathonToDelete }),
		};

		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}/deleteMarathon`), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.response);
				updateMarathonArray();
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	const moreInfo = () => {
		alert('Inget händer här');
		console.log(mode);
	};

	return (
		<>
			{(isMarathonInUsersList || mode === 'all') && (
				<StyledCard>
					<ImageBox>
						<img src={image} alt={city} />
						<TextBox>
							<Link to={`/marathon/${id}`}>
								<h2>{name}</h2>
							</Link>
						</TextBox>
					</ImageBox>
					{!isMarathonInUsersList ? (
						<Button
							disable={isLoading}
							text="Add race"
							color="green"
							handleClick={addMarathon}
						></Button>
					) : (
						<Button
							disable={isLoading}
							text="Delete race"
							color="red"
							handleClick={deleteMarathon}
						></Button>
					)}
					<Button text="More info" handleClick={moreInfo}></Button>
				</StyledCard>
			)}
		</>
	);
};

export default MarathonCard;
