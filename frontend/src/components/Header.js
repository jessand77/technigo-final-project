import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const StyledHeader = styled.header`
	background-color: #adebad;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Header = () => {
	return (
		<StyledHeader>
			<p>
				<Link to="/">
					<Button text="Home" />
				</Link>
			</p>
		</StyledHeader>
	);
};

export default Header;
