import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from 'components/Header';
import UserPageHeader from 'components/UserPageHeader';
import MarathonList from 'components/MarathonList';

const UserPageSection = styled.section`
	background-color: lavender;
	padding: 10px;
	span {
		color: grey;
	}
`;

const UserPage = () => {
	const hasAccessToken = useSelector((store) => store.user.accessToken);
	const username = useSelector((store) => store.user.username);

	if (!hasAccessToken) {
		return (
			<>
				<Header />
				<h1>You are not logged in</h1>
			</>
		);
	}

	return (
		<>
			<UserPageHeader />
			<UserPageSection>
				<h1>
					Hej <span>{username}</span>!
				</h1>
				<h2>Här är några marathonlopp att välja mellan</h2>
				<MarathonList />
			</UserPageSection>
		</>
	);
};

export default UserPage;
