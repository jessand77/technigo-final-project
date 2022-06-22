import React from 'react';
import styled from 'styled-components/macro';
import { RiRunLine } from 'react-icons/ri';

const LogoContainer = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@1,700&display=swap');
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	span {
		font-family: 'Merriweather Sans', cursive;
		font-size: 1.4rem;
	}
	svg {
		margin: 3px;
	}
`;

const Logo = () => {
	return (
		<LogoContainer>
			<RiRunLine />
			<span>Bucket List Marathons</span>
			<RiRunLine />
		</LogoContainer>
	);
};

export default Logo;
