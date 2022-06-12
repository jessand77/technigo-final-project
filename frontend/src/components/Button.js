import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${(props) => props.color || 'lime'};
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid darkgreen;
	border-radius: 3px;
`;

const Button = ({ text, color, handleClick }) => {
	return (
		<StyledButton onClick={handleClick} color={color}>
			{text}
		</StyledButton>
	);
};

export default Button;
