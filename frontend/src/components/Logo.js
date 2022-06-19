import React from 'react';
import styled from 'styled-components';
import { RiRunLine } from 'react-icons/ri';

const LogoContainer = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	span {
		font-family: 'Courgette', cursive;
        font-size: 1.1rem;
	}
    svg {
        margin: 3px;
    }
`;

const Logo = () => {
	return (
		<LogoContainer>
			<RiRunLine />
			<span>European Marathons</span>
			<RiRunLine />
		</LogoContainer>
	);
};

export default Logo;
