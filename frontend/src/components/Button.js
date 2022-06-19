import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${(props) => props.color || 'teal'};
	border: none;
	color: white;
	padding: 10px 20px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	margin: 4px 2px;
	cursor: pointer;
	border-radius: 16px;
`;

const Button = ({ text, color, handleClick }) => {
	return (
		<StyledButton onClick={handleClick} color={color}>
			{text}
		</StyledButton>
	);
};

export default Button;
