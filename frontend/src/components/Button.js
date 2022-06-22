import React from 'react';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
	min-width: 60px;
	margin-top: 3px;
	padding: 3px 5px;
	margin: 5px;
	background-color: var(--orange);
	color: var(--white);
	border-color: transparent;
	border-radius: 5px;
	align-self: center;
	font-size: 1rem;
	cursor: pointer;
	&:disabled {
		background-color: #808080cc;
		cursor: not-allowed;
	}
`;

const Button = ({ text, onClick }) => {
	return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
