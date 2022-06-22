import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Loader from 'components/Loader';
import Button from 'components/Button';
// import Map from "components/Map";

const MarathonBox = styled.article`
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 20px;
	width: 50%;
	span {
		font-weight: 700;
	}
`;

const ImageBox = styled.div`
	img {
		width: 100%;
	}
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
			{loading ? (
				<Loader />
			) : (
				<main>
					<MarathonBox>
						<ImageBox>
							<img src={marathon.image} />
						</ImageBox>
						<h2>{marathon.name}</h2>
						<p>
							{marathon.city}, <span>{marathon.country}</span>
						</p>
						<a href={marathon.website} target="blank">
							Race webpage
						</a>
						<Link to="/userpage">
							<Button text="Back"></Button>
						</Link>
					</MarathonBox>
				</main>
			)}
		</>
	);
};

export default MarathonPage;
