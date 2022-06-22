import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Button from 'components/Button';

import user from 'reducers/user';
import ui from '../reducers/ui';

const StyledCard = styled.article`
	position: relative;
	text-align: center;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	img {
		width: 100%;
	}
`;

const ImageBox = styled.div`
	position: relative;
`;

const TextBox = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgb(0, 0, 0);
	background: rgba(0, 0, 0, 0.5);
	color: #f1f1f1;
	width: 100%;
	padding: 20px;
	a {
		text-decoration: none;
		color: white;
	}
`;

const MarathonCard = ({ id, name, image, city }) => {
	return (
		<StyledCard>
			<ImageBox>
				<img src={image} alt={city} />
				<TextBox>
					<Link to={`/marathon/${id}`}>
						<h2>{name}</h2>
					</Link>
				</TextBox>
			</ImageBox>
			<Button text="Add/delete"></Button>
			<Button text="Read more"></Button>
		</StyledCard>
	);
};

export default MarathonCard;
