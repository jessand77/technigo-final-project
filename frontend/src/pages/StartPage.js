import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';

import sthlmMarathon from '../assets/sthlm-marathon.jpeg';

const StartPageSection = styled.section`
	background-image: url(${sthlmMarathon});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const TextBox = styled.div`
	background: white;
	color: black;
	font-size: 30px;
	h1 {
		margin: 15px;
	}
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const StartPage = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/login');
	};

	return (
		<>
			<Header />
			<StartPageSection>
				<TextBox>
					<h1>Start page</h1>
					<button onClick={handleClick}>Login or register</button>
				</TextBox>
			</StartPageSection>
		</>
	);
};

export default StartPage;
