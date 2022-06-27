import React from 'react';
import styled from 'styled-components/macro';
import { RiRunLine } from 'react-icons/ri';
import { device } from 'utils/breakpoints';

const LogoContainer = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@1,700&display=swap');
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		font-family: 'Merriweather Sans', cursive;
		margin: 0 5px;
	}
	span,
	svg {
		font-size: 0.9rem;
	}

	@media ${device.tablet} {
		span,
		svg {
			font-size: 1.4rem;
		}
	}

	@media ${device.laptop} {
		span,
		svg {
			font-size: 1.8rem;
		}
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
