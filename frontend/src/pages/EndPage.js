import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const EndPage = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	return (
		<>
			<StartPageSection>
				<TextBox>
					<h1>End page</h1>
					<button onClick={handleClick}>Take me to start again</button>
				</TextBox>
			</StartPageSection>
		</>
	);
};

export default EndPage;
