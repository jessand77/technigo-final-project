import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Loader from 'components/Loader';
import Logo from 'components/Logo';
import Button from 'components/Button';
import LinkStyleButton from 'components/LinkStyleButton';

import user from '../reducers/user';
import ui from '../reducers/ui';

const Form = styled.form`
	min-width: 300px;
	padding: 20px;
	margin: 40px 0;
	display: flex;
	flex-direction: column;
	gap: 5px;
	background-color: var(boxbackground);
	border-radius: 5px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

	button {
		margin-bottom: 20px;
		align-self: flex-start;
	}
	input {
		padding: 5px;
		margin-bottom: 0.8rem;
		border-color: var(--whitesmoke);
	}
	.error {
		color: var(--orange);
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
		if (accessToken) {
			navigate('/userpage');
		}
	}, [accessToken]);

	const disableSubmitButton =
		username.length < 3 || username.length > 20 || password.length < 3;

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

	return (
		<>
			<header className="header">
				<div className="header-content center">
					<Link to="/">
						<Logo />
					</Link>
				</div>
			</header>

			{isLoading ? (
				<Loader />
			) : (
				<main className="main">
					<Form onSubmit={onFormSubmit}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							placeholder="3 to 20 characters"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							placeholder="Min. 3 characters"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Button
							type="submit"
							disabled={disableSubmitButton}
							margin="5px 0"
							text={mode === 'register' ? 'Sign up' : 'Login'}
						></Button>
						{validationError && <p className="error">{validationError}</p>}
						<p>
							{mode === 'register'
								? 'Already have an account'
								: 'No account yet'}
							? <br />
							Click&nbsp;
							<LinkStyleButton
								onClick={toggleMode}
								text="here."
							></LinkStyleButton>
						</p>
					</Form>
				</main>
			)}
		</>
	);
};

export default Login;
