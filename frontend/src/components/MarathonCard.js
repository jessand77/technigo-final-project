import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';

import { API_URL } from 'utils/urls';

import user from 'reducers/user';

const StyledCard = styled.div`
	position: relative;

	border: 1px solid black;
	h2 {
		font-size: smaller;
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

const ContentBox = styled.div`
	position: absolute; /* Position the background text */
	bottom: 0; /* At the bottom. Use top:0 to append it to the top */
	background: rgb(0, 0, 0); /* Fallback color */
	background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
	color: #f1f1f1; /* Grey text */
	width: 100%; /* Full width */
	padding: 20px; /* Some padding */
`;

const MarathonCard = (props) => {
	const { id, name, city, country, url, image } = props;

	const usersList = useSelector((store) => store.user.marathons);

	const isMarathonInUsersList = usersList.some(
		(marathon) => marathon._id === id
	);

	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();

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
					<ContentBox>
						<a href={url} target="_blank">
							<h2>{name}</h2>
						</a>
					</ContentBox>
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
			</StyledCard>
		</>
	);
};

export default MarathonCard;
