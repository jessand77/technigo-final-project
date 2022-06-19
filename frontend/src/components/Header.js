import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';
import Button from './Button';

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
			<p>
				<Link to="/">
					<Logo />
				</Link>
			</p>
		</StyledHeader>
	);
};

export default Header;
