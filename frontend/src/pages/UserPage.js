import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import UserPageHeader from 'components/UserPageHeader';
import MarathonList from 'components/MarathonList';

const UserPageSection = styled.section`
	background-color: lavender;
	padding: 10px;
`;

const UserPage = () => {
	const hasAccessToken = useSelector((store) => store.user.accessToken);
	const username = useSelector((store) => store.user.username);

	return (
		<>
			<UserPageHeader />
			{!hasAccessToken ? (
				<h1>You have no access to this page</h1>
			) : (
				<UserPageSection>
					<h1>Hej {username}!</h1>
					<h2>Här är några marathonlopp att välja mellan</h2>
					<MarathonList />
				</UserPageSection>
			)}
		</>
	);
};

export default UserPage;
