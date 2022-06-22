import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import Logo from 'components/Logo';
import MarathonList from 'components/MarathonList';
import Profile from 'components/Profile';
import Button from 'components/Button';

import user from '../reducers/user';

const UserPage = () => {
	const [display, setDisplay] = useState('races');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		confirm('Logout?');
		dispatch(user.actions.setAccessToken(null));
		alert('Tack för besöket!');
		navigate('/');
	};

	const deleteAccount = () => {
		confirm('Do you want to delete your account?');
	};

	return (
		<>
			<header>
				<Link to="/">
					<Logo />
				</Link>
				<nav>
					<button onClick={() => setDisplay('races')}>All races</button>
					<button onClick={() => setDisplay('profile')}>Profile</button>
					<Button text="Logout" onClick={handleLogout}></Button>
				</nav>
			</header>
			<main>
				<>
					{display === 'races' && <h2>Add or delete marathons</h2>}
					{display === 'races' && <MarathonList displayMode="all" />}
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
