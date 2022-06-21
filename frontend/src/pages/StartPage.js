import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import Logo from 'components/Logo';

const TextBox = styled.div`
	background: white;
	color: black;
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
			<header>
				<Logo />
			</header>
			<main>
				<TextBox>
					<h1>Welcome to Bucket List Marathons!</h1>
					<p>Here you can read about marathons</p>
					<button onClick={handleClick}>OK</button>
				</TextBox>
			</main>
		</>
	);
};

export default StartPage;
