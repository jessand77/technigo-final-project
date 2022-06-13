import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

import user from '../reducers/user';

const StyledHeader = styled.header`
	background-color: aliceblue;
	padding: 10px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	a {
		text-decoration: none;
	}
`;

const UserPageHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(user.actions.setAccessToken(null));
		navigate('/loggedout');
	};

	return (
		<StyledHeader>
			<Link to="/">
				<Button text="Home"></Button>
			</Link>
			<Button text="Bucket list" color="grey"></Button>
			<Button text="Logout" handleClick={handleLogout}></Button>
		</StyledHeader>
	);
};

export default UserPageHeader;
