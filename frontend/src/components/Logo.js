import React from 'react';
import styled from 'styled-components/macro';
import { RiRunLine } from 'react-icons/ri';
import { device } from 'utils/breakpoints';

const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		font-family: Poppins, serif;
		font-weight: bolder;
		font-style: italic;
		text-transform: uppercase;
		margin: 0 5px;
	}
	span,
	svg {
		font-size: 1.4rem;
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
