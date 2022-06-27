import React from 'react';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
	padding: 3px 5px;
	margin: 5px;
	background-color: ${(props) => props.color || 'var(--orange)'};
	color: ${(props) => props.textcolor || 'var(--white)'};
	text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
	border-color: transparent;
	border-radius: 5px;
	align-self: center;
	font-size: 1rem;
	cursor: pointer;
	&:disabled {
		background-color: #808080cc;
		cursor: not-allowed;
	}
	&:hover {
		color: red;
	}
`;

const Button = ({ active, color, textcolor, onClick, text, disabled }) => {
	return (
		<StyledButton
			active={active}
			color={color}
			textcolor={textcolor}
			disabled={disabled}
			onClick={onClick}
		>
			{text}
		</StyledButton>
	);
};

export default Button;
