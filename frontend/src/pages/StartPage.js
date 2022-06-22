import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import Logo from 'components/Logo';
import Button from 'components/Button';

const TextBox = styled.div`
	background: --var(boxbackground);
	color: black;
	text-align: center;
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
					<h1>
						Welcome to <br />
						Bucket List Marathons!
					</h1>
					<p>Here you can read about marathons</p>
					<Button text="Run!" onClick={handleClick}></Button>
				</TextBox>
			</main>
		</>
	);
};

export default StartPage;
