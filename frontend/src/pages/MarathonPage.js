import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import { API_KEY } from 'utils/urls';
import { device } from 'utils/breakpoints';
import Loader from 'components/Loader';
import Button from 'components/Button';
// import Map from "components/Map";

const MarathonBox = styled.article`
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 20px;
	width: 95%;
	a {
		color: var(--blue);
		font-weight: bold;
		margin: 5px 0;
	}
	a:hover {
		text-decoration: underline;
	}
	h2 {
		color: var(--orange);
		margin: 1rem 0;
	}
	p {
		margin: 0.5rem 0;
	}
	@media ${device.tablet} {
		width: 80%;
	}

	@media ${device.laptop} {
		width: 70%;
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
	const [weather, setWeather] = useState(null);

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
						console.log(data.weather[0].description);
						setTemperature(Math.round(data.main.temp - 273.15));
					}
					if (data.weather[0].description) {
						setWeather(data.weather[0].description);
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
							{marathon.city}, {marathon.country}
						</p>
						<p>
							{' '}
							{temperature && weather && (
								<span>
									Current weather: {temperature} &#8451; and {weather}
								</span>
							)}
						</p>
						<a href={marathon.website} target="blank">
							Race webpage
						</a>
						<Link to="/userpage">
							<Button margin="5px 0" text="Back"></Button>
						</Link>
					</MarathonBox>
				</main>
			)}
		</>
	);
};

export default MarathonPage;
