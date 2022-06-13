import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from 'components/Header';
import Button from 'components/Button';

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
	const hasAccessToken = useSelector((store) => store.user.accessToken);
	const navigate = useNavigate();

	const handleClick = () => {
		hasAccessToken ? navigate('/userpage') : navigate('/login');
	};

	let buttonText;
	hasAccessToken
		? (buttonText = 'To user page')
		: (buttonText = 'Login or register');

	return (
		<>
			<Header />
			<StartPageSection>
				<TextBox>
					<h1>Start page</h1>
					<Button handleClick={handleClick} text={buttonText}></Button>
				</TextBox>
			</StartPageSection>
		</>
	);
};

export default StartPage;
