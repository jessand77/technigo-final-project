import React from 'react';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
	all: revert;
	font-family: inherit;
	font-size: 100%;
	font-weight: 600;
	background: none;
	color: var(--blue);
	margin: 0;
	padding: 0;
	border: 0;
	cursor: pointer;
	overflow: visible;
	text-transform: none;
	-webkit-appearance: button;
`;

const LinkStyleButton = ({ text, onClick }) => {
	return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default LinkStyleButton;
