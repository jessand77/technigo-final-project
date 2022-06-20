import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
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
					<p>Take me back to the start page</p>
					<Button text="OK" handleClick={handleClick}></Button>
				</TextBox>
			</StartPageSection>
		</>
	);
};

export default EndPage;
