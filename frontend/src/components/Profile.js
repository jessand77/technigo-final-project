import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import moment from 'moment';
import MarathonList from './MarathonList';

const Userinfo = styled.section`
	text-align: center;
	margin-bottom: 30px;
`;

const Profile = () => {
	const username = useSelector((store) => store.user.username);
	const userSince = useSelector((store) => store.user.userSince);

	return (
		<>
			<Userinfo>
				<h1>
					Hello <span>{username}</span>!
				</h1>
				<p>
					Your account was created on {moment(userSince).format('MMMM Do YYYY')}
					.
				</p>
			</Userinfo>
			<MarathonList displayMode="bucket" />
		</>
	);
};

export default Profile;
