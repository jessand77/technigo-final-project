import React from 'react';

import styled from 'styled-components';

const StyledHeader = styled.header`
	background-color: aliceblue;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Header = () => {
	return (
		<StyledHeader>
			<p>Header</p>
		</StyledHeader>
	);
};

export default Header;
