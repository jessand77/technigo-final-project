import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import Logo from 'components/Logo';
import Button from 'components/Button';

const TextBox = styled.div`
	background: --var(boxbackground);
	h1,
	p {
		color: --var(blackish);
		margin: 10px;
	}
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
			<main className="main">
				<TextBox>
					<h1>
						Welcome to <br />
						Bucket List Marathons!
					</h1>
					<p>Create your own bucket list from a selection of European races</p>
					<Button className="run" text="Run!" onClick={handleClick}></Button>
				</TextBox>
			</main>
		</>
	);
};

export default StartPage;
