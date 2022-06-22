import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Loader from 'components/Loader';
import Logo from 'components/Logo';
import Button from 'components/Button';

import user from '../reducers/user';
import ui from '../reducers/ui';

const Form = styled.form`
	background-color: var(boxbackground);
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 20px;
	min-width: 20%;
	display: flex;
	flex-direction: column;
	gap: 5px;
	button {
		margin-bottom: 20px;
		align-self: flex-start;
	}
`;

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('register');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector((store) => store.ui.isLoading);
	const accessToken = useSelector((store) => store.user.accessToken);
	const validationError = useSelector((store) => store.user.error);

	useEffect(() => {
		if (accessToken && mode === 'login') {
			navigate('/userpage');
		} else if (accessToken && mode === 'register') {
			swal('User account successfully created!', {
				buttons: false,
				timer: 1000,
			});
			const timer = setTimeout(() => {
				navigate('/userpage');
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [accessToken]);

	useEffect(() => {
		if (validationError) {
			swal(`${validationError}`, {
				buttons: false,
				timer: 1000,
			});
		}
	}, []);

	const onFormSubmit = (event) => {
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		};
		dispatch(ui.actions.setLoading(true));

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
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	const toggleMode = () => {
		setMode(mode === 'register' ? 'login' : 'register');
	};

	// if (isLoading) {
	// 	return <Loader />;
	// }

	return (
		<>
			<header>
				<Link to="/">
					<Logo />
				</Link>
			</header>
			<main>
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
						text={mode === 'register' ? 'Sign up' : 'Login'}
					></Button>

					{mode === 'register' ? (
						<p>Already have an account?</p>
					) : (
						<p>No account yet?</p>
					)}
					<button onClick={toggleMode}>
						{mode === 'register' ? 'Login' : 'Sign up'}
					</button>
				</Form>

				{/* Ta bort? */}
				<Loader />
			</main>
		</>
	);
};

export default Login;
