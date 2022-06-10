import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

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
			<p>Header</p>
			<p>
				<Link to="/">Hem</Link>
			</p>
		</StyledHeader>
	);
};

export default Header;
