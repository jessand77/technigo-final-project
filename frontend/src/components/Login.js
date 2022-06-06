import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from 'utils/urls';

import user from '../reducers/user';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);

	const onFormSubmit = (e) => {
		e.preventDefault();
		console.log(username);
		dispatch(user.actions.setUsername(username));
		setUsername('');
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={onFormSubmit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Login;
