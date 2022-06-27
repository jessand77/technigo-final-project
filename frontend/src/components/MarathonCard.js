import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Button from 'components/Button';

import user from 'reducers/user';
import ui from '../reducers/ui';

const StyledCard = styled.article`
	position: relative;
	text-align: center;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	img {
		width: 100%;
	}
	button {
		font-size: 0.7em;
	}
`;

const ImageBox = styled.div`
	position: relative;
`;

const TextBox = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgb(0, 0, 0);
	background: rgba(0, 0, 0, 0.5);
	color: #f1f1f1;
	font-size: 0.65em;
	width: 100%;
	padding: 1.5em;
	a {
		text-decoration: none;
		color: white;
	}
`;

const MarathonCard = ({ id, name, image, city }) => {
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
		const marathonId = id;

		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			body: JSON.stringify({ marathonId }),
		};

		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}/addMarathon`), options)
			.then((res) => res.json())
			.then((data) => {
				updateMarathonArray();
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	const deleteMarathon = () => {
		const marathonId = id;

		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			body: JSON.stringify({ marathonId }),
		};

		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}/deleteMarathon`), options)
			.then((res) => res.json())
			.then((data) => {
				updateMarathonArray();
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	return (
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
				<Button disabled={isLoading} onClick={addMarathon} text="Add"></Button>
			) : (
				<Button
					disabled={isLoading}
					onClick={deleteMarathon}
					text="Delete"
				></Button>
			)}

			<Link to={`/marathon/${id}`}>
				<Button text="Read more" color="var(--blue)"></Button>
			</Link>
		</StyledCard>
	);
};

export default MarathonCard;
