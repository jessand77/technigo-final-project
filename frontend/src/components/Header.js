import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import Logo from './Logo';

const StyledHeader = styled.header`
	background-color: #adebad;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	a {
		text-decoration: none;
	}
`;

const Header = () => {
	return (
		<StyledHeader>
				<Link to="/">
					<Logo />
				</Link>
		</StyledHeader>
	);
};

export default Header;
