import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import user from '../reducers/user';

const StyledHeader = styled.header`
	background-color: aliceblue;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const UserPageHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(user.actions.setAccessToken(null));
		navigate('/');
	};

	return (
		<StyledHeader>
			<p>Userpage header</p>
			<Link to="/">Hem</Link>
			<button onClick={handleLogout}>Logout</button>
		</StyledHeader>
	);
};

export default UserPageHeader;
