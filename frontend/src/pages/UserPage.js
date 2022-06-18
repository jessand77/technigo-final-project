import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from 'components/Header';
import UserPageHeader from 'components/UserPageHeader';
import MarathonList from 'components/MarathonList';
import BucketList from 'components/BucketList';
import Button from 'components/Button';
import Map from 'components/Map';

const UserPageSection = styled.section`
	background-color: lavender;
	padding: 10px;
	span {
		color: green;
	}
`;

const UserPage = () => {
	const [list, setList] = useState('all');
	const hasAccessToken = useSelector((store) => store.user.accessToken);
	const username = useSelector((store) => store.user.username);

	const userMarathons = useSelector((store) => store.user.marathons);

	const toggleList = () => {
		setList(list === 'all' ? 'bucket' : 'all');
	};

	if (!hasAccessToken) {
		return (
			<>
				<Header />
				<h1>You are not logged in</h1>
			</>
		);
	}

	let buttonText;
	list === 'all' ? (buttonText = 'Bucket list') : (buttonText = 'All races');

	return (
		<>
			<UserPageHeader />
			<Map />
			<UserPageSection>
				<h1>
					Hello <span>{username}</span>!
				</h1>
				<Button handleClick={toggleList} text={buttonText}></Button>
				{list === 'all' ? <MarathonList /> : <BucketList />}
			</UserPageSection>
		</>
	);
};

export default UserPage;
