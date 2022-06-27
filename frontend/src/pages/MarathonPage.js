import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import { API_KEY } from 'utils/urls';
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
	a {
		color: var(--blue);
		font-weight: bold;
		margin: 5px 0;
	}
	a:hover {
		text-decoration: underline;
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
	const [temperature, setTemperature] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(API_URL(`marathons/${id}`))
			.then((res) => res.json())
			.then((data) => {
				setMarathon(data.response);
				setLoading(false);
			});
	}, [id]);

	useEffect(() => {
		if (marathon.lat) {
			setLoading(true);
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${marathon.lat}&lon=${marathon.lon}&appid=${API_KEY}`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data) {
						console.log(data.main.temp);
						setTemperature(Math.round(data.main.temp - 273.15));
					}
				})
				.catch((error) => console.error(error))
				.finally(setLoading(false));
		}
	}, [marathon]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<main className="main">
					<MarathonBox>
						<ImageBox>
							<img src={marathon.image} />
						</ImageBox>
						<h2>{marathon.name}</h2>
						<p>
							{marathon.city}, <span>{marathon.country}</span>
						</p>
						{temperature && <p>Temperature: {temperature} &#8451;</p>}
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
