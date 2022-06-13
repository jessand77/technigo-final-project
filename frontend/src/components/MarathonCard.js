import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import styled from 'styled-components';

import { API_URL } from 'utils/urls';

import user from 'reducers/user';

const StyledCard = styled.div`
	border: 1px solid black;
	padding: 10px;
	background-color: whitesmoke;
	h2 {
		font-size: smaller;
	}
	img {
		height: 50px;
		display: block;
	}
	p {
		font-size: xx-small;
	}
	label {
		font-size: xx-small;
		font-style: italic;
		position: relative;
		bottom: 2px;
	}
`;

const MarathonCard = (props) => {
	const { id, name, city, country, url, image } = props;

	const usersList = useSelector((store) => store.user.marathons);
	let isInUsersList = false;
	usersList
		? (isInUsersList = useSelector((store) => store.user.marathons).includes(
				id
		  ))
		: false;

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
				<h2>{name}</h2>
				{/* <label htmlFor="run">Add to my list</label>
				<input type="checkbox" id="run" /> */}
				{!isInUsersList ? (
					<button onClick={addMarathon}>Add race</button>
				) : (
					<button onClick={deleteMarathon}>Delete race</button>
				)}

				<p>
					{city}, {country}
				</p>
				<a href={url} target="_blank">
					<img src={image} />
				</a>
			</StyledCard>
		</>
	);
};

export default MarathonCard;
