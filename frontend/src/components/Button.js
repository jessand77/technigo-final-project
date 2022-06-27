import React from 'react';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
	padding: ${(props) => props.padding || '3px 5px'};
	margin: ${(props) => props.margin || '5px'};
	background-color: ${(props) => props.color || 'var(--orange)'};
	color: ${(props) => props.textcolor || 'var(--white)'};
	/* text-decoration: ${(props) => (props.active ? 'underline' : 'none')}; */
	font-weight: ${(props) => (props.active ? '600' : '400')};
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
