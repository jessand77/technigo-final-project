import React, { useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from 'utils/urls';

import Logo from 'components/Logo';
import Loader from 'components/Loader';
import MarathonList from 'components/MarathonList';
import Profile from 'components/Profile';
import Button from 'components/Button';

import user from '../reducers/user';
import ui from '../reducers/ui';

const UserPage = () => {
	const [display, setDisplay] = useState('races');

	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);
	const isLoading = useSelector((store) => store.ui.isLoading);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		confirm('Logout?');
		dispatch(user.actions.setAccessToken(null));
		navigate('/');
	};

	const deleteAccount = () => {
		confirm('Do you want to delete your account?');

		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		};

		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					navigate('/');
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setMarathons([]));
						dispatch(user.actions.setError(null));
					});
				} else {
					console.log(data.response);
					alert(data.response);
				}
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	isLoading ? <Loader /> : null;

	return (
		<>
			<header>
				<Link to="/">
					<Logo />
				</Link>
				<nav>
					<Button
						active={display === 'races'}
						text="Race list"
						color="var(--blue)"
						textcolor="var(--white)"
						onClick={() => setDisplay('races')}
					></Button>
					<Button
						active={display === 'profile'}
						text="Profile"
						color="var(--blue)"
						textcolor="var(--white)"
						onClick={() => setDisplay('profile')}
					></Button>
					<Button text="Logout" onClick={handleLogout}></Button>
				</nav>
			</header>
			<main className="main">
				<>
					{display === 'races' && (
						<>
							<h1 className="all-races-header">
								20 European marathons to add to your bucket list
							</h1>
							<MarathonList displayMode="all" />
						</>
					)}
					{display === 'profile' && <Profile />}
				</>
			</main>
			<footer>
				<p>
					Click<button onClick={deleteAccount}>here</button>to delete your
					account
				</p>
			</footer>
		</>
	);
};

export default UserPage;
