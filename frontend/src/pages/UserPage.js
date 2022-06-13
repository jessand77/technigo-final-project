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
		color: violet;
	}
`;

const UserPage = () => {
	const hasAccessToken = useSelector((store) => store.user.accessToken);
	const username = useSelector((store) => store.user.username);

	const userMarathons = useSelector((store) => store.user.marathons);

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
					Hello <span>{username}</span>!
				</h1>
				<p>Add some marathons to your bucket list</p>
				<MarathonList />
			</UserPageSection>
		</>
	);
};

export default UserPage;
