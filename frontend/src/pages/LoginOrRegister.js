import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Loader from '../components/Loader';
import Header from 'components/Header';
import Button from 'components/Button';

import user from '../reducers/user';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 5px;
	button {
		margin-bottom: 20px;
		align-self: flex-start;
	}
`;

const LoginOrRegister = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('register');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector((store) => store.ui.isLoading);
	const accessToken = useSelector((store) => store.user.accessToken);
	const validationError = useSelector((store) => store.user.error);

	useEffect(() => {
		if (accessToken) {
			navigate('/userpage');
		}
	}, [accessToken]);

	const onFormSubmit = (event) => {
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		};

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setUserId(data.userId));
						dispatch(user.actions.setUsername(data.username));
						dispatch(user.actions.setAccessToken(data.accessToken));
						dispatch(user.actions.setUserSince(data.userSince));
						dispatch(user.actions.setMarathons(data.marathons));
						dispatch(user.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setUserSince(null));
						dispatch(user.actions.setMarathons([]));
						dispatch(user.actions.setError(data.message));
					});
				}
			});
	};

	const toggleMode = () => {
		setMode(mode === 'register' ? 'login' : 'register');
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Header />
			<h1>{mode === 'register' ? 'Sign up' : 'Login'}</h1>
			<Form onSubmit={onFormSubmit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Button
					type="submit"
					text={mode === 'register' ? 'Sign up' : 'Log in'}
				></Button>
			</Form>
			<Loader />
			{validationError && <p>{validationError}</p>}
			{mode === 'register' ? (
				<p>Already have an account?</p>
			) : (
				<p>No account yet?</p>
			)}
			<Button
				text={mode === 'register' ? 'Log in' : 'Sign up'}
				handleClick={toggleMode}
			></Button>
		</>
	);
};

export default LoginOrRegister;
