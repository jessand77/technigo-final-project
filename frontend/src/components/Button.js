import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils/breakpoints';

const StyledButton = styled.button`
	padding: ${(props) => props.padding || '3px 5px'};
	margin: ${(props) => props.margin || '5px'};
	background-color: ${(props) => props.color || 'var(--orange)'};
	color: ${(props) => props.textcolor || 'var(--white)'};
	font-weight: ${(props) => (props.active ? '800' : '400')};
	font-size: 1rem;
	font-family: inherit;
	border-color: transparent;
	border-radius: 5px;
	align-self: center;
	cursor: pointer;
	&:disabled {
		background-color: #808080cc;
		cursor: not-allowed;
	}
	&:hover {
		opacity: 0.8;
	}
`;

const Button = ({
	active,
	color,
	textcolor,
	disabled,
	onClick,
	margin,
	padding,
	text,
}) => {
	return (
		<StyledButton
			active={active}
			color={color}
			textcolor={textcolor}
			disabled={disabled}
			onClick={onClick}
			margin={margin}
			padding={padding}
		>
			{text}
		</StyledButton>
	);
};

export default Button;
