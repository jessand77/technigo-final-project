import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Loader from 'components/Loader';
import Map from 'components/Map';

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

const MarathonPage = () => {
	const { id } = useParams();
	const [marathon, setMarathon] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(API_URL(`marathons/${id}`))
			.then((res) => res.json())
			.then((data) => {
				console.log(data.response);
				setMarathon(data.response);
				setLoading(false);
			});
	}, [id]);

	return (
		<>
			<StyledCard>
				{loading ? (
					<Loader />
				) : (
					<ImageBox>
						<img src={marathon.image} alt={id} />
						<TextBox>
							<h2>{marathon.name}</h2>
							<Link to="/userpage">back to userpage</Link>
						</TextBox>
					</ImageBox>
				)}
			</StyledCard>
			<Map />
		</>
	);
};

export default MarathonPage;
