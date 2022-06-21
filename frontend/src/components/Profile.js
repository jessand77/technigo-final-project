import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import MarathonList from './MarathonList';



const Profile = () => {
	const hasAccessToken = useSelector((store) => store.user.accessToken);
	const username = useSelector((store) => store.user.username);
	const userSince = useSelector((store) => store.user.userSince);

	const deleteAccount = () => {
		confirm('Do you want to delete your account?');
	};

	return (
		<>
			<h1>
				Hello <span>{username}</span>!
			</h1>
			<p>User account created on {moment(userSince).format('MMMM Do YYYY')}</p>
            <MarathonList displayMode="bucket" />
			<button onClick={deleteAccount}>Delete account</button>
		</>
	);
};

export default Profile;
