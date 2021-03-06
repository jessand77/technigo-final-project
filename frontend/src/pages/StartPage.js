import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils/breakpoints';
import Logo from 'components/Logo';
import Button from 'components/Button';

const TextBox = styled.div`
	background: --var(boxbackground);
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem;
`;

const StartHeading = styled.h1`
	font-size: 1.4rem;
	color: var(--orange);

	@media ${device.tablet} {
		font-size: 1.5rem;
	}

	@media ${device.laptop} {
		font-size: 2rem;
	}
`;

const StartText = styled.p`
	font-size: 1rem;
	color: var(--darktext);
	padding: 1rem 0;

	@media ${device.tablet} {
		font-size: 1rem;
	}

	@media ${device.laptop} {
		font-size: 1.2rem;
	}
`;

const StartPage = () => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const navigate = useNavigate();

	const handleClick = () => {
		if (accessToken) {
			navigate('/userpage');
		} else {
			navigate('/login');
		}
	};

	return (
		<>
			<header className="header">
				<div className="header-content center">
					<Logo />
				</div>
			</header>

			<main className="main">
				<TextBox>
					<StartHeading>
						Welcome to <br />
						Bucket List Marathons!
					</StartHeading>
					<StartText>
						Create your own bucket list from a selection of European races
					</StartText>
					<Button className="run" text="OK!" onClick={handleClick}></Button>
				</TextBox>
			</main>
		</>
	);
};

export default StartPage;
