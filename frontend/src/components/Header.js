import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const StyledHeader = styled.header`
	background-color: aliceblue;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Header = () => {
	return (
		<StyledHeader>
			<p>Main header</p>
			<p>
				<Link to="/">
					<Button text="Home" color={'pink'} />
				</Link>
			</p>
		</StyledHeader>
	);
};

export default Header;
