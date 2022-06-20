import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import styled from 'styled-components/macro';

import Button from './Button';
import { API_URL } from 'utils/urls';

import user from 'reducers/user';

const StyledCard = styled.div`
	position: relative;
	text-align: center;
	/* border: 1px solid black; */
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	// Funkar inte?
	/* transition: 0.3s;
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	} */
	h2 {
		font-size: medium;
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

const MarathonCard = ({ id, name, city, country, url, image }) => {
	const usersList = useSelector((store) => store.user.marathons);
	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();

	const isMarathonInUsersList = usersList.some(
		(marathon) => marathon._id === id
	);

	const updateMarathonArray = () => {
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
			});
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

		fetch(API_URL(`users/${userId}/addMarathon`), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.response);
				updateMarathonArray();
			});
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

		fetch(API_URL(`users/${userId}/deleteMarathon`), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.response);
				updateMarathonArray();
			});
	};

	return (
		<>
			<StyledCard>
				<ImageBox>
					<img src={image} alt={city} />
					<TextBox>
						<a href={url} target="_blank">
							<h2>{name}</h2>
						</a>
					</TextBox>
				</ImageBox>

				{!isMarathonInUsersList ? (
					<Button text="Add race" color="green" onClick={addMarathon}></Button>
				) : (
					<Button
						text="Delete race"
						color="red"
						onClick={deleteMarathon}
					></Button>
				)}
				<Button text="More info"></Button>
			</StyledCard>
		</>
	);
};

export default MarathonCard;
